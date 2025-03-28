import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const creditDetails = await prisma.creditPayment.findMany();
    return NextResponse.json(creditDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching credits details' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const body = await req.json();
    const newCreditDetails = await prisma.creditPayment.create({
      data: { ...body },
    });
    return NextResponse.json(newCreditDetails, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating credits details ' }, { status: 500 });
  }
}
