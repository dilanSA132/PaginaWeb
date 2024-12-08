import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/api';

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const creditDetails = await prisma.creditDetail.findMany({
      include: { credit: true },
    });
    return NextResponse.json(creditDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching credit details' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const body = await req.json();
    const newCreditDetail = await prisma.creditDetail.create({
      data: body,
    });
    return NextResponse.json(newCreditDetail, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating credit detail' }, { status: 500 });
  }
}
