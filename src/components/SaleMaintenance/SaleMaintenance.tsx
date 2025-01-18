import React, { useState, useEffect } from 'react';
import { getSales, createSale, updateSale, deleteSale } from '../../services/saleService';
import UniversalTable from '../Table/UniversalTable';
import { format } from 'date-fns';
import { deleteSaleDetail } from '@/services/saleDetailService';
import { ToastContainer, toast } from 'react-toastify';
import CustomModal from '../modal/CustomModal';
import { createCredit, updateCredit, deleteCredit, getCredits } from '@/services/creditService';
import { getCreditsDetails, createCreditDetail, updateCreditDetail, deleteCreditDetail } from '@/services/CreditPayments';


export interface Sale {
    id: number;
    date: Date;
    totalAmount: number; // Monto total de la venta
    paymentStatus: PaymentStatus; // Estado del pago
    paymentMethod: PaymentMethod; // Método de pago
    credit: Credit; // Información del crédito (opcional)
    details: SaleDetail[]; // Detalles de los productos vendidos
    creditPayments: CreditPayment[]; // Pagos del crédito (si aplica)
}

export interface SaleDetail {
    id: number; // ID opcional, generado automáticamente
    saleId: number; // ID de la venta asociada
    productId: number; // ID del producto vendido
    quantity: number; // Cantidad del producto
    amount: number; // Monto total por este detalle
}

export type CreditStatus = 'ACTIVE' | 'PAID' | 'CANCELLED';

export type PaymentStatus = 'PAID' | 'PENDING' | 'PARTIAL';

export type PaymentMethod = 'CASH' | 'TRANSFER' | 'CREDIT';

export interface CreditPayment {
    id?: number; // ID opcional, ya que se genera automáticamente
    creditId: number; // ID del crédito asociado
    amountPaid: number; // Monto pagado en este pago
    paymentDate: Date; // Fecha del pago
}

export interface Credit {
    id?: number;
    customerId: number;
    totalAmount: number;
    amountRemaining: number;
    createdAt?: Date;
    dueDate?: Date;
    status: CreditStatus;
    payments?: CreditPayment[];
    sales?: Sale[];
}

const SaleMaintenance: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [currentSale, setCurrentSale] = useState<Sale | null>(null);
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

    const handleCreateSale = async (sale: Sale) => {
        try {
            const createdSale = await createSale(sale);
            setSales((prevSales) => [...prevSales, createdSale]);
            setModalIsOpen(false);
            toast.success('Venta creada exitosamente');
        } catch (error) {
            console.error('Error al crear la venta:', error);
            toast.error('Error al crear la venta');
        }
    };

    const handleUpdateSale = async (sale: Sale) => {
        try {
            /* const updatedSale = await updateSale(sale);
             setSales((prevSales) =>
                 prevSales.map((s) => (s.id === updatedSale.id ? updatedSale : s))
             );
             setModalIsOpen(false);
             toast.success('Venta actualizada exitosamente');*/
        } catch (error) {
            console.error('Error al actualizar la venta:', error);
            toast.error('Error al actualizar la venta');
        }
    };

    const handleDeleteSale = async (sale: Sale) => {
        try {
            console.log('Eliminando venta:', sale);

            // 1. Eliminar detalles de la venta (si existen)
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
        {
            label: 'Fecha',
            accessor: 'date',
            render: (sale: any) => <span>{format(new Date(sale.date), 'dd/MM/yyyy')}</span>,
        },
        { label: 'Total', accessor: 'totalAmount' },
        {
            label: 'Método de Pago',
            accessor: 'paymentMethod',
            render: (sale: any) => <span>{translatePaymentMethod(sale.paymentMethod)}</span>,
        },
        {
            label: 'Estado',
            accessor: 'paymentStatus',
            render: (sale: any) => <span>{translatePaymentStatus(sale.paymentStatus)}</span>,
        },

    ];

    const handleSaveSale = () => {
        if (isEditing) {
            handleUpdateSale(newSale);
        } else {
            handleCreateSale(newSale);
        }
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="p-8 bg-gradient-to-b from-teal-100 to-green-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-teal-600">Ventas</h1>
            <button
              // onClick={openModalForNewSale}
                className="bg-teal-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-teal-600"
            >
                Nueva Venta
            </button>
            <UniversalTable
                columns={columns}
                data={sales}
                onEdit={(rowData) => { setModalIsOpen(true); setIsEditing(true); setCurrentSale(rowData); setNewSale(rowData); }}
                onDelete={(rowData) => handleDeleteSale(rowData)}
            />

            <button
                onClick={() => { setModalIsOpen(true); setIsEditing(false); setNewSale({ id: 0, date: new Date(), totalAmount: 0, paymentStatus: 'PENDING', paymentMethod: 'CASH', details: [], credit: { customerId: 0, totalAmount: 0, amountRemaining: 0, status: 'ACTIVE' }, creditPayments: [] }); }}
            >
                Crear Venta
            </button>

            <CustomModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Editar Venta' : 'Crear Nueva Venta'}</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="date">Fecha</label>
                    <input
                        type="date"
                        id="date"
                        value={format(new Date(newSale.date), 'yyyy-MM-dd')}
                        onChange={(e) => setNewSale({ ...newSale, date: new Date(e.target.value) })}
                        className="w-full p-4 border border-gray-300 rounded-lg text-black"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="totalAmount">Monto Total</label>
                    <input
                        type="number"
                        id="totalAmount"
                        value={newSale.totalAmount}
                        onChange={(e) => setNewSale({ ...newSale, totalAmount: parseFloat(e.target.value) })}
                        className="w-full p-4 border border-gray-300 rounded-lg text-black"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="paymentMethod">Método de Pago</label>
                    <select
                        id="paymentMethod"
                        value={newSale.paymentMethod}
                        onChange={(e) => setNewSale({ ...newSale, paymentMethod: e.target.value as PaymentMethod })}
                        className="w-full p-4 border border-gray-300 rounded-lg text-black"
                    >
                        <option value="CASH">Efectivo</option>
                        <option value="TRANSFER">Transferencia</option>
                        <option value="CREDIT">Crédito</option>
                    </select>
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

                <button
                    onClick={handleSaveSale}
                    className="w-full p-4 bg-green-500 text-white rounded-lg"
                >
                    {isEditing ? 'Actualizar Venta' : 'Crear Venta'}
                </button>
            </CustomModal>

            <ToastContainer />
        </div>
    );
};

export default SaleMaintenance;
