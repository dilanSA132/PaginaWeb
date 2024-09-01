import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const paymentPlans = await prisma.paymentPlan.findMany();
    return NextResponse.json(paymentPlans, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching payment plans' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const body = await req.json();
    const newPaymentPlan = await prisma.paymentPlan.create({
      data: { ...body },
    });
    return NextResponse.json(newPaymentPlan, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating payment plan' }, { status: 500 });
  }
}
