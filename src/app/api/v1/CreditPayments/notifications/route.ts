import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

// Función para obtener el inicio y fin del día actual
function getTodayDateRange() {
  const now = new Date();
  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  const endOfDay = new Date(now.setHours(23, 59, 59, 999));
  return { startOfDay, endOfDay };
}

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const { startOfDay, endOfDay } = getTodayDateRange();

    // Obtiene ventas con pagos pendientes
    const pendingPayments = await prisma.sale.findMany({
      where: {
        paymentStatus: 'PENDING',
        credit: {
          payments: {
            some: {
              paymentDate: {
                gte: startOfDay,
                lte: endOfDay,
              },
            },
          },
        },
      },
      include: {
        details: true,
        credit: {
          include: {
            payments: true,
          },
        },
      },
    });

   console.log('Pending Payments:', pendingPayments);   
   
   const filteredSales = pendingPayments.filter((sale) => {
    return sale.credit?.payments?.some((payment) => {
      const amountToPay = payment.amountToPay ?? 0;
      const amountPaid = payment.amountPaid ?? 0;
      const paymentDate = new Date(payment.paymentDate);
  
      console.log('Payment Date:', paymentDate);
      console.log('Start of Day:', startOfDay, 'End of Day:', endOfDay);
      console.log('Amount Paid:', amountPaid, 'Amount To Pay:', amountToPay);
      
      const isToday = paymentDate >= startOfDay && paymentDate <= endOfDay;
      console.log('Is payment today?', isToday);
  
      // Retorna true si se hizo un pago hoy, pero es incompleto
      return isToday && amountPaid < amountToPay;
    });
  });
  
    console.log('Filtered Sales:', filteredSales);

    return NextResponse.json(filteredSales, { status: 200 });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { message: `Error fetching sales with pending payments: ${errorMessage}` },
      { status: 500 }
    );
  }
}
