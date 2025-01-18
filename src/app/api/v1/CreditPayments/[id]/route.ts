import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const deletCreditDetails = await prisma.creditPayment.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletCreditDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting credit details' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const body = await req.json();
    const updateCreditDetail = await prisma.creditPayment.update({
      where: { id: Number(id) },
      data: { ...body },
    });
    return NextResponse.json(updateCreditDetail, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating credit details' }, { status: 500 });
  }
}
