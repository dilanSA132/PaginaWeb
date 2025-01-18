import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const sales = await prisma.sale.findMany({
      include: { details: { include: { product: true } } },
    });
    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching sales' }, { status: 500 });
  }
}


export async function POST(req: NextRequest) {
  try {
    // Parsear y validar los datos del cuerpo
    const body = await req.json();

    const {
      date,
      totalAmount,
      paymentMethod,
      paymentStatus,
      credit,
      details,
      creditPayments,
    } = body;

    if (!totalAmount || !paymentMethod || !paymentStatus || !details?.length) {
      return NextResponse.json(
        { message: 'Datos incompletos para crear la venta.' },
        { status: 400 }
      );
    }
    
    const newSale = await prisma.sale.create({
      data: {
        date: date || new Date(),
        totalAmount,
        paymentMethod,
        paymentStatus,
        ...(credit && {
          credit: {
            create: {
              customerId: credit.customerId,
              totalAmount: credit.totalAmount,
              amountRemaining: credit.amountRemaining,
              dueDate: credit.dueDate,
              status: credit.status,
              payments: creditPayments
                ? {
                    create: creditPayments.map((payment: any) => ({
                      amountPaid: payment.amountPaid,
                      paymentDate: payment.paymentDate,
                    })),
                  }
                : undefined,
            },
          },
        }),
        details: {
          create: details.map((detail: any) => ({
            productId: detail.productId,
            quantity: detail.quantity,
            amount: detail.amount,
          })),
        },
      },
    });

    return NextResponse.json(newSale, { status: 201 });
  } catch (error) {
    console.error('Error al crear la venta:', error);
    return NextResponse.json(
      { message: 'Error al crear la venta. Verifica los datos.' },
      { status: 500 }
    );
  }
}