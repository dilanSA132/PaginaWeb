import React, { useEffect, useState, useMemo } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { getSales } from '@/services/saleService';
import { getProducts } from '@/services/productService';

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement
);

interface Product {
  id: number;
  name: string;
  description: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  categoryId: number;
  image: string;
}

interface SaleDetail {
  id: number;
  saleId: number;
  productId: number;
  quantity: number;
  amount: number;
  product: Product;
}

interface Sale {
  id: number;
  date: string;
  totalAmount: number;
  paymentStatus: string;
  paymentMethod: string;
  creditId: number | null;
  details: SaleDetail[];
}

const Sales: React.FC = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await getSales();
        setSales(response || []);
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  const totalRevenue = useMemo(
    () => sales.reduce((sum, sale) => sum + sale.totalAmount, 0),
    [sales]
  );

  const totalProductsSold = useMemo(
    () =>
      sales.reduce(
        (sum, sale) =>
          sum + sale.details.reduce((subSum, detail) => subSum + detail.quantity, 0),
        0
      ),
    [sales]
  );

  const productSales = useMemo(() => sales.flatMap((sale) => sale.details), [sales]);

  const topProducts = useMemo(
    () =>
      productSales.reduce((acc: Record<string, number>, detail) => {
        acc[detail.product.name] = (acc[detail.product.name] || 0) + detail.quantity;
        return acc;
      }, {}),
    [productSales]
  );

  const salesByPaymentMethod = useMemo(() => {
    return sales.reduce((acc, sale) => {
      acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + sale.totalAmount;
      return acc;
    }, {} as Record<string, number>);
  }, [sales]);

  const salesByCategory = useMemo(() => {
    return sales.reduce((acc, sale) => {
      sale.details.forEach((detail) => {
        const categoryName = detail.product.categoryId.toString(); 
        acc[categoryName] = (acc[categoryName] || 0) + detail.amount;
      });
      return acc;
    }, {} as Record<string, number>);
  }, [sales]);

  const salesOverTime = useMemo(() => {
    const dailySales: Record<string, number> = {};
    sales.forEach((sale) => {
      const date = new Date(sale.date).toLocaleDateString();
      dailySales[date] = (dailySales[date] || 0) + sale.totalAmount;
    });
    return {
      labels: Object.keys(dailySales),
      data: Object.values(dailySales),
    };
  }, [sales]);

  const barChartData = useMemo(
    () => ({
      labels: Object.keys(topProducts),
      datasets: [
        {
          label: 'Unidades Vendidas',
          data: Object.values(topProducts),
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    }),
    [topProducts]
  );

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response || []);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  const inventoryValue = useMemo(
    () => products.reduce((sum, product) => sum + product.purchasePrice, 0),
    [products]
  );

  const pieChartData = useMemo(
    () => ({
      labels: ['Ventas', 'Valor del Inventario'],
      datasets: [
        {
          data: [totalRevenue, inventoryValue],
          backgroundColor: ['#4caf50', '#ff9800'],
          hoverBackgroundColor: ['#388e3c', '#f57c00'],
        },
      ],
    }),
    [totalRevenue, inventoryValue]
  );

  const lineChartData = useMemo(
    () => ({
      labels: salesOverTime.labels,
      datasets: [
        {
          label: 'Ventas a lo largo del Tiempo',
          data: salesOverTime.data,
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          fill: true,
        },
      ],
    }),
    [salesOverTime]
  );

  if (loading) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Informe de Ventas', 14, 20);

    doc.setFontSize(12);
    doc.text(`Ingresos Totales: $${totalRevenue.toFixed(2)}`, 14, 30);
    doc.text(`Total Productos Vendidos: ${totalProductsSold}`, 14, 40);

    const topProductsTable = Object.entries(topProducts).map(([productName, quantity]) => [
      productName,
      quantity,
    ]);

    autoTable(doc, {
      head: [['Producto', 'Unidades Vendidas']],
      body: topProductsTable,
      startY: 50,
      theme: 'grid',
      headStyles: { fillColor: [54, 162, 235] },
    });

    // Tabla de Ventas por Método de Pago
    const paymentMethodTable = Object.entries(salesByPaymentMethod).map(([method, total]) => [
      method,
      `$${total.toFixed(2)}`,
    ]);

    autoTable(doc, {
      head: [['Método de Pago', 'Total Ventas']],
      body: paymentMethodTable,
      theme: 'grid',
      headStyles: { fillColor: [255, 99, 132] },
    });

    doc.save('informe_ventas.pdf');
  };



  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5 text-center">Panel de Ventas</h1>
      <button
        onClick={generatePDF}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-5"
      >
        Generar Informe de Ventas
      </button>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">

        <div className="bg-white p-5 shadow rounded" style={{ maxHeight: '550px', overflow: 'auto' }}>
          <h2 className="text-xl font-semibold mb-3">Productos Más Vendidos</h2>
          <div className="h-full">
            <Bar
              data={barChartData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                animation: {
                  duration: 1000,
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-5 shadow rounded" style={{ height: '550px', overflow: 'auto' }}>
          <h2 className="text-xl font-semibold mb-3">Ventas vs Valor del Inventario</h2>
          <div className="h-full">
            <Pie
              data={pieChartData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
              }}
            />
          </div>
        </div>

        <div className="bg-white p-5 shadow rounded" style={{ maxHeight: '550px', overflow: 'auto' }}>
          <h2 className="text-xl font-semibold mb-3">Ventas a lo largo del Tiempo</h2>
          <div className="h-full">
            <Line
              data={lineChartData}
              options={{
                maintainAspectRatio: false,
                responsive: true,
                animation: {
                  duration: 1000,
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h2 className="text-xl font-semibold mb-3">Análisis Adicional</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white p-5 shadow rounded" style={{ maxHeight: '550px', overflow: 'auto' }}>
            <h3 className="text-lg font-semibold mb-3">Ventas por Método de Pago</h3>
            <div className="h-full">
              <Pie
                data={{
                  labels: Object.keys(salesByPaymentMethod),
                  datasets: [
                    {
                      data: Object.values(salesByPaymentMethod),
                      backgroundColor: ['#ff8a80', '#ff9800', '#ffeb3b'],
                      hoverBackgroundColor: ['#ff5252', '#f57c00', '#fbc02d'],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            </div>
          </div>

          <div className="bg-white p-5 shadow rounded" style={{ maxHeight: '550px', overflow: 'auto' }}>
            <h3 className="text-lg font-semibold mb-3">Ventas por Categoría</h3>
            <div className="h-full">
              <Bar
                data={{
                  labels: Object.keys(salesByCategory),
                  datasets: [
                    {
                      label: 'Ingresos por Categoría',
                      data: Object.values(salesByCategory),
                      backgroundColor: 'rgba(255, 99, 132, 0.6)',
                      borderColor: 'rgba(255, 99, 132, 1)',
                      borderWidth: 1,
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                  animation: {
                    duration: 1000,
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
