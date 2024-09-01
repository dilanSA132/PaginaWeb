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

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const body = await req.json();
    const newSale = await prisma.sale.create({
      data: { ...body },
    });
    return NextResponse.json(newSale, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating sale' }, { status: 500 });
  }
}
