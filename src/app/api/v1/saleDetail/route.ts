import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/api';

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const saleDetails = await prisma.saleDetail.findMany({
      include: { product: true, sale: true },
    });
    return NextResponse.json(saleDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching sale details' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const body = await req.json();
    const newSaleDetail = await prisma.saleDetail.create({
      data: body,
    });
    return NextResponse.json(newSaleDetail, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating sale detail' }, { status: 500 });
  }
}
