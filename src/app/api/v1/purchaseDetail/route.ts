import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/api';

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const purchaseDetails = await prisma.purchaseDetail.findMany({
      include: { product: true, purchase: true },
    });
    return NextResponse.json(purchaseDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching purchase details' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const body = await req.json();
    const newPurchaseDetail = await prisma.purchaseDetail.create({
      data: body,
    });
    return NextResponse.json(newPurchaseDetail, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating purchase detail' }, { status: 500 });
  }
}
