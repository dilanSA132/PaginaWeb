import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const deletedPaymentPlan = await prisma.paymentPlan.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedPaymentPlan, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting payment plan' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const body = await req.json();
    const updatedPaymentPlan = await prisma.paymentPlan.update({
      where: { id: Number(id) },
      data: { ...body },
    });
    return NextResponse.json(updatedPaymentPlan, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating payment plan' }, { status: 500 });
  }
}
