import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/api';

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const purchases = await prisma.purchase.findMany({
      include: { details: true },
    });
    return NextResponse.json(purchases, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching purchases' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const body = await req.json();
    const newPurchase = await prisma.purchase.create({
      data: body,
    });
    return NextResponse.json(newPurchase, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating purchase' }, { status: 500 });
  }
}
