import React, { useState, useEffect } from 'react';
import { getSales, createSale, updateSale, deleteSale, updateSaleStatus } from '../../services/saleService';
import UniversalTable from '../Table/UniversalTable';
import { format } from 'date-fns';
import { deleteSaleDetail } from '@/services/saleDetailService';
import { ToastContainer, toast } from 'react-toastify';
import CustomModal from '../modal/CustomModal';
import { deleteCredit, updateCreditRemaining  } from '@/services/creditService';
import { getCreditsDetails, updateCreditDetail, deleteCreditDetail } from '@/services/CreditPayments';
import 'react-toastify/dist/ReactToastify.css';
import {  Sale,CreditPayment, PaymentStatus } from './Interfaces';
import { access } from 'fs';

const SaleMaintenance: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentSale, setCurrentSale] = useState<Sale | null>(null);
    const [editingAmountPaid, setEditingAmountPaid] = useState<{ [key: number]: number }>({});

    const [newSale, setNewSale] = useState<Sale>({
        id: 0,
        date: new Date(),
        totalAmount: 0,
        paymentStatus: 'PENDING',
        paymentMethod: 'CASH',
        details: [],
        credit: {
            customerId: 0,
            totalAmount: 0,
            amountRemaining: 0,
            status: 'ACTIVE',
            payments: [],
        },
        creditPayments: [],
    });

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const data = await getSales();
                setSales(data);


            } catch (error) {
                console.error('Error al obtener las ventas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSales();
    }, []);

    const handleUpdateSale = async (sale: Sale) => {
        try {
            console.log("Nueva", sale);

            const allPaymentsPaid = sale.credit?.payments.every(
                (payment) => payment.amountPaid === payment.amountToPay
            );

            const updatedSaleData = {
                ...sale,
                paymentStatus: allPaymentsPaid ? 'PAID' : 'PENDING',
            };

            const updatedSale = await updateSaleStatus(updatedSaleData.id, updatedSaleData.paymentStatus);

            setSales((prevSales) =>
                prevSales.map((s) => (s.id === updatedSale.id ? updatedSale : s))
            );

            if (sale.paymentMethod === 'CREDIT' && sale.credit) {
                const updatedPayments = await Promise.all(
                    sale.credit.payments.map((payment) =>
                        updateCreditDetail(payment.id!, { ...payment, paymentDate: new Date(payment.paymentDate).toISOString() })
                    )
                );

                let remainingAmount = sale.credit.totalAmount! - sale.credit.payments.reduce((sum, payment) => sum + payment.amountPaid!, 0);
                if (Math.abs(remainingAmount) < 0.01) {
                    remainingAmount = 0;
                }
                await updateCreditRemaining(sale.credit.id!, remainingAmount);

                setSales((prevSales) =>
                    prevSales.map((s) =>
                        s.id === sale.id
                            ? { ...s, creditPayments: updatedPayments, credit: { ...s.credit, amountRemaining: remainingAmount } }
                            : s
                    )
                );
            }

            setModalIsOpen(false);
            toast.success('Venta actualizada exitosamente');

            cleanStates();
        } catch (error) {
            console.error('Error al actualizar la venta:', error);
            toast.error('Error al actualizar la venta');
        }
    };


    const cleanStates = () => {
        setNewSale({
            id: 0,
            date: new Date(),
            totalAmount: 0,
            paymentStatus: 'PENDING',
            paymentMethod: 'CASH',
            details: [],
            credit: {
                customerId: 0,
                totalAmount: 0,
                amountRemaining: 0,
                status: 'ACTIVE',
                payments: [],
            },
            creditPayments: [],
        });
        setEditingAmountPaid({});
    }

    const handleDeleteSale = async (sale: Sale) => {
        try {
            console.log('Eliminando venta:', sale);

            if (sale.details) {
                for (const detail of sale.details) {
                    console.log('Eliminando detalle de venta:', detail);
                    await deleteSaleDetail(detail.id);
                }
            }

            console.log(sale.creditPayments);
            console.log(sale.credit);

            if (sale.credit) {

                const creditsDetails = await getCreditsDetails();
                console.log('Pagos del crédito obtenidos:', creditsDetails);

                const creditDetails = creditsDetails.filter(
                    (cd: CreditPayment) => cd.creditId === sale.credit?.id
                );

                for (const creditDetail of creditDetails) {
                    await deleteCreditDetail(creditDetail.id!);
                }

                // 2.3 Eliminar el crédito principal
                if (sale.credit.id) {
                    await deleteCredit(sale.credit.id);
                }
            }

            await deleteSale(sale.id);

            setSales((prevSales) => prevSales.filter((s) => s.id !== sale.id));
            toast.success('Venta eliminada exitosamente');
        } catch (error) {
            toast.error('Hubo un problema al eliminar la venta');
            console.error('Error al eliminar la venta:', error);
        }
    };


    const translatePaymentMethod = (method: string) => {
        switch (method) {
            case 'CASH':
                return 'Efectivo';
            case 'CREDIT':
                return 'Crédito';
            case 'TRANSFER':
                return 'Transferencia';
            default:
                return method;
        }
    };

    const translatePaymentStatus = (status: string) => {
        switch (status) {
            case 'PAID':
                return 'Pagado';
            case 'PENDING':
                return 'Pendiente';
            default:
                return status;
        }
    };

    const columns = [
        { label: 'ID', accessor: 'id' },
        { label: 'Total', accessor: 'totalAmount' },
        {
            label: 'Método de Pago',
            accessor: 'paymentMethod',
            render: (sale: any) => <span>{translatePaymentMethod(sale.paymentMethod) || null}</span>,
        },
        {
            label: 'Estado',
            accessor: 'paymentStatus',
            render: (sale: any) => <span>{translatePaymentStatus(sale.paymentStatus) || null}</span>,
        },
        {
            label: 'Saldo Restante',
            accessor: 'credit',
            render: (sale: any) => <span>{sale.credit ? sale.credit.amountRemaining : 0}</span>,
        },
        {
            label: 'Fechas de Crédito',
            accessor: 'credit',
            render: (sale: any) => {
                if (sale.credit) {
                    const startDate = sale.credit?.payments?.length > 0 ? format(new Date(sale.credit.payments[0].paymentDate), 'dd/MM/yyyy') : '';
                    const endDate = sale.credit.dueDate ? format(new Date(sale.credit.dueDate), 'dd/MM/yyyy') : '';
                    return <span>{startDate && endDate ? `${startDate} - ${endDate}` : startDate || endDate || null}</span>;
                } else {
                    return <span>{format(new Date(sale.date), 'dd/MM/yyyy')}</span>;
                }
            },
        },
    ];
    

    const handleSaveSale = () => {
        if (isEditing) {
            handleUpdateSale(newSale);
        } else {
            //  handleCreateSale(newSale);
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="p-8 bg-gradient-to-b from-teal-100 to-green-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-teal-600">Ventas</h1>

            <UniversalTable
                columns={columns}
                data={sales}
                onEdit={(rowData) => {
                    setModalIsOpen(true);
                    setIsEditing(true);
                    setCurrentSale(rowData);
                    setNewSale(rowData);
                }}
                onDelete={(rowData) => handleDeleteSale(rowData)}
            />

            <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} width="1300px">
                <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Venta' : 'Crear Nueva Venta'}</h2>

                <div className="flex gap-10">
                    <div className="flex-grow w-1/2">
                        {newSale.paymentMethod === 'CREDIT' && newSale.credit ? (
                            <>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="startDate">Fecha de Inicio</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        value={newSale.credit?.payments?.length ? format(new Date(newSale.credit.payments[0].paymentDate), 'yyyy-MM-dd') : format(new Date(newSale.date), 'yyyy-MM-dd')}
                                        disabled
                                        onChange={(e) => {
                                            const updatedPayments = newSale.credit.payments.map((payment, index) =>
                                                index === 0 ? { ...payment, paymentDate: new Date(e.target.value).toISOString() } : payment
                                            );
                                            setNewSale({ 
                                                ...newSale, 
                                                credit: { 
                                                    ...newSale.credit, 
                                                    payments: updatedPayments.map(payment => ({
                                                        ...payment,
                                                        paymentDate: new Date(payment.paymentDate)
                                                    })) 
                                                } 
                                            });
                                        }}
                                        className="w-full p-4 border border-gray-300 rounded-lg text-black"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2" htmlFor="endDate">Fecha de Fin</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        value={format(new Date(newSale.credit.dueDate || newSale.date), 'yyyy-MM-dd')}
                                        disabled
                                        onChange={(e) => setNewSale({ ...newSale, credit: { ...newSale.credit, dueDate: new Date(e.target.value) } })}
                                        className="w-full p-4 border border-gray-300 rounded-lg text-black"
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2" htmlFor="date">Fecha</label>
                                <input
                                    type="date"
                                    id="date"
                                    value={format(new Date(newSale.date), 'yyyy-MM-dd')}
                                    disabled
                                    onChange={(e) => setNewSale({ ...newSale, date: new Date(e.target.value) })}
                                    className="w-full p-4 border border-gray-300 rounded-lg text-black"
                                />
                            </div>
                        )}

                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="totalAmount">Monto Total</label>
                            <input
                                type="number"
                                id="totalAmount"
                                value={newSale.totalAmount}
                                disabled
                                onChange={(e) => setNewSale({ ...newSale, totalAmount: parseFloat(e.target.value) })}
                                className="w-full p-4 border border-gray-300 rounded-lg text-black"
                            />
                        </div>



                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="paymentStatus">Estado del Pago</label>
                            <select
                                id="paymentStatus"
                                value={newSale.paymentStatus}
                                onChange={(e) => setNewSale({ ...newSale, paymentStatus: e.target.value as PaymentStatus })}
                                className="w-full p-4 border border-gray-300 rounded-lg text-black"
                            >
                                <option value="PAID">Pagado</option>
                                <option value="PENDING">Pendiente</option>
                                <option value="PARTIAL">Parcial</option>
                            </select>
                        </div>
                    </div>

                    {newSale.credit && newSale.credit.payments && (
                        <div className="flex-grow w-1/2 max-h-96 overflow-y-auto">
                            <h3 className="text-xl font-bold mb-4">Pagos del Crédito</h3>
                            <table className="w-full border-collapse border border-gray-300">
                                <thead>
                                    <tr>
                                        <th className="border border-gray-300 px-4 py-2">Fecha de Pago</th>
                                        <th className="border border-gray-300 px-4 py-2">Monto a Pagar</th>
                                        <th className="border border-gray-300 px-4 py-2">Monto Pagado</th>
                                        <th className="border border-gray-300 px-4 py-2">Seleccionar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newSale.credit.payments
                                        ?.sort((a, b) => new Date(a.paymentDate).getTime() - new Date(b.paymentDate).getTime())
                                        .map((payment, index) => (
                                            <tr key={payment.id || index}>
                                                <td className="border border-gray-300 px-4 py-2">{format(new Date(payment.paymentDate), 'dd/MM/yyyy')}</td>
                                                <td className="border border-gray-300 px-4 py-2">{payment.amountToPay}</td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {editingAmountPaid[payment.id || index] !== undefined ? (
                                                        <input
                                                            type="number"
                                                            value={editingAmountPaid[payment.id || index]}
                                                            onChange={(e) => {
                                                                const updatedAmount = parseFloat(e.target.value);
                                                                setEditingAmountPaid((prev) => ({
                                                                    ...prev,
                                                                    [payment.id || index]: updatedAmount,
                                                                }));
                                                            }}
                                                            onBlur={() => {
                                                                const updatedPayments = newSale.credit.payments?.map((p) =>
                                                                    p.id === payment.id
                                                                        ? { ...p, amountPaid: editingAmountPaid[payment.id || index] }
                                                                        : p
                                                                );
                                                                setNewSale({
                                                                    ...newSale,
                                                                    credit: { ...newSale.credit, payments: updatedPayments },
                                                                });
                                                                setEditingAmountPaid((prev) => {
                                                                    const newState = { ...prev };
                                                                    delete newState[payment.id || index];
                                                                    return newState;
                                                                });
                                                            }}
                                                            className="w-full p-2 border border-gray-300 rounded-lg text-black"
                                                        />
                                                    ) : (
                                                        <span
                                                            className="cursor-pointer"
                                                            onClick={() =>
                                                                setEditingAmountPaid((prev) => ({
                                                                    ...prev,
                                                                    [payment.id || index]: payment.amountPaid || 0,
                                                                }))
                                                            }
                                                        >
                                                            {payment.amountPaid}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={payment.amountPaid === payment.amountToPay}
                                                        onChange={(e) => {
                                                            const newAmountPaid = e.target.checked ? payment.amountToPay : 0;
                                                            setEditingAmountPaid((prev) => ({
                                                                ...prev,
                                                                [payment.id || index]: newAmountPaid,
                                                            }));
                                                            const updatedPayments = newSale.credit.payments?.map((p) =>
                                                                p.id === payment.id
                                                                    ? { ...p, amountPaid: newAmountPaid }
                                                                    : p
                                                            );
                                                            setNewSale({
                                                                ...newSale,
                                                                credit: { ...newSale.credit, payments: updatedPayments },
                                                            });
                                                        }}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>

                <div className="flex justify-end mt-4">
                    <button
                        onClick={handleSaveSale}
                        className="bg-teal-500 text-white py-2 px-4 rounded-lg"
                    >
                        Guardar
                    </button>
                </div>
            </CustomModal>

            <ToastContainer />
        </div>
    );

};

export default SaleMaintenance;
