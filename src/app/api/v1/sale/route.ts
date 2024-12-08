import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/api';

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const sales = await prisma.sale.findMany({
      include: { customer: true, user: true, saleDetails: true, analysis: true },
    });
    return NextResponse.json(sales, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching sales' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const body = await req.json();
    const newSale = await prisma.sale.create({
      data: body,
    });
    return NextResponse.json(newSale, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating sale' }, { status: 500 });
  }
}
