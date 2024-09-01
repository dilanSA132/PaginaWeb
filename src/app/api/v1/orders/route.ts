import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const orders = await prisma.order.findMany({
      include: { details: { include: { product: true } } },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const body = await req.json();
    const newOrder = await prisma.order.create({
      data: { ...body },
    });
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating order' }, { status: 500 });
  }
}
