import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const saleDetails = await prisma.saleDetail.findMany({
      include: { product: true, sale: true },
    });
    return NextResponse.json(saleDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching sale details' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const body = await req.json();
    const newSaleDetail = await prisma.saleDetail.create({
      data: { ...body },
    });
    return NextResponse.json(newSaleDetail, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating sale detail' }, { status: 500 });
  }
}
