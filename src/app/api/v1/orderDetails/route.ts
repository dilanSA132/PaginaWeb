import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const orderDetails = await prisma.orderDetail.findMany({
      include: { product: true, order: true },
    });
    return NextResponse.json(orderDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching order details' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const body = await req.json();

    if (Array.isArray(body)) {
      // Si es un array, guarda cada detalle
      const newOrderDetails = await prisma.orderDetail.createMany({
        data: body,
      });
      return NextResponse.json(newOrderDetails, { status: 201 });
    } else {
      // Si no es un array, manejar como un solo detalle
      const newOrderDetail = await prisma.orderDetail.create({
        data: body,
      });
      return NextResponse.json(newOrderDetail, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating order details' }, { status: 500 });
  }
}
