import React, { useEffect, useState, useMemo } from 'react';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';
import { getSales } from '@/services/saleService';
import { getProducts } from '@/services/productService';
import { getCategories } from '@/services/CategoriesService';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  rgbToHex,
} from '@mui/material';
import { blue, green, grey } from '@mui/material/colors';

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
  const [products, setProducts] = useState<Product[]>([]);
  const paymentMethodTranslations = {
    CASH: 'Efectivo',
    CREDIT: 'Crédito',
    TRANSFER: 'Transferencia',
  };
  

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

    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response || []);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchSales();
    fetchProducts();
  }, []);

  const totalRevenue = useMemo(
    () => sales.reduce((sum, sale) => sum + sale.totalAmount, 0),
    [sales]
  );

  const topProducts = useMemo(() => {
    const productSales = sales.flatMap((sale) => sale.details);
    return productSales.reduce((acc: Record<string, number>, detail) => {
      acc[detail.product.name] = (acc[detail.product.name] || 0) + detail.quantity;
      return acc;
    }, {});
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

  const inventoryValue = useMemo(
    () => products.reduce((sum, product) => sum + product.purchasePrice, 0),
    [products]
  );

  const paymentMethods = useMemo(() => {
    return sales.reduce((acc: Record<string, number>, sale) => {
      acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + 1;
      return acc;
    }, {});
  }, [sales]);

  const [categories, setCategories] = useState<Record<number, string>>({});

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const categoryMap = response.reduce((acc: Record<number, string>, category: any) => {
          acc[category.id] = category.name;
          return acc;
        }, {});
        setCategories(categoryMap);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  const salesByCategory = useMemo(() => {
    const categorySales: Record<string, number> = {};
    sales.forEach((sale) => {
      sale.details.forEach((detail) => {
        const categoryId = detail.product.categoryId;
        const categoryName = categories[categoryId] || 'Desconocido';
        categorySales[categoryName] = (categorySales[categoryName] || 0) + detail.quantity;
      });
    });
    return categorySales;
  }, [sales, categories]);

  const totalProductsSold = useMemo(() =>
    sales.reduce(
      (sum, sale) =>
        sum + sale.details.reduce((subSum, detail) => subSum + detail.quantity, 0),
      0
    ),
    [sales]
  );

  const salesByPaymentMethod = useMemo(() => {
    return sales.reduce((acc, sale) => {
      acc[sale.paymentMethod] = (acc[sale.paymentMethod] || 0) + sale.totalAmount;
      return acc;
    }, {} as Record<string, number>);
  }, [sales]);

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Informe de Ventas', 14, 20);

    doc.setFontSize(12);
    doc.text(`Ingresos Totales: ${totalRevenue.toFixed(2)} Colones`, 14, 30);
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


    const paymentMethodTable = Object.entries(salesByPaymentMethod).map(([method, total]) => [
      paymentMethodTranslations[method as keyof typeof paymentMethodTranslations] || method, 
      `${total.toFixed(2)} Col`, 
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
    <div>

      <Grid container spacing={3} padding={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Panel de Ventas
          </Typography>

        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Productos Más Vendidos</Typography>
              <BarChart
                width={400}
                height={300}
                series={[{
                  id: 'products',
                  data: Object.values(topProducts),
                }]}
                xAxis={[{
                  id: 'x',
                  data: Object.keys(topProducts),
                  scaleType: 'band',
                  tickPlacement: 'middle',
                  tickLabelPlacement: 'middle',
                }]}
                yAxis={[{
                  id: 'quantity',
                  label: 'Cantidad',
                  scaleType: 'linear',

                }]}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <PieChart
                width={400}
                height={300}
                series={[{
                  id: 'sales-inventory',
                  data: [
                    { id: 'Ventas', value: totalRevenue, label: 'Ventas' },
                    { id: 'Inventario', value: inventoryValue, label: 'Inventario' },
                  ],
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -45,
                  endAngle: 225,
                  cx: 150,
                  cy: 150,

                }]}
              />
              <Typography variant="h6" align="center">Ventas vs Valor del Inventario</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Ventas a lo largo del Tiempo</Typography>
              <LineChart
                width={350}
                height={300}
                series={[{
                  id: 'sales-over-time',
                  data: salesOverTime.data,
                }]}
                xAxis={[{ id: 'time', data: salesOverTime.labels }]}

              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
  <Card>
    <CardContent>
      <PieChart
        width={500}
        height={260}
        series={[
          {
            id: 'payment-methods',
            data: Object.entries(paymentMethods).map(([method, count]) => ({
              id: method,
              value: count,
              label: paymentMethodTranslations[method as keyof typeof paymentMethodTranslations], // Traducción al español
            })),
            innerRadius: 30,
            outerRadius: 100,
            paddingAngle: 5,
            cornerRadius: 5,
            startAngle: -45,
            endAngle: 225,
            cx: 150,
            cy: 150,
            highlightScope: { fade: 'global', highlight: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
      />
      <Typography variant="h6" align="center">Tipos de Pago</Typography>
    </CardContent>
  </Card>
</Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Ventas por Categoría</Typography>
              <BarChart
          width={400}
          height={260}
          series={[{
            id: 'category-sales',
            data: Object.values(salesByCategory),
          }]}
          xAxis={[{
            id: 'categories',
            data: Object.keys(salesByCategory),
            scaleType: 'band',
            tickPlacement: 'middle',
            tickLabelPlacement: 'middle',
          }]}
          yAxis={[{
            id: 'quantity',
            label: 'Cantidad',
            scaleType: 'linear',

          }]}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <Card style={{ height: '100%' }}>
            <CardContent style={{ backgroundColor: grey[300], display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
              <Grid container justifyContent="center">
              <button
                onClick={generatePDF}
                className="bg-blue-500 text-white py-2 px-4 rounded-md mb-5"
              >
                Generar Informe de Ventas
              </button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  );
};

export default Sales;
