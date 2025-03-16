import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const deletedOrder = await prisma.order.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting order' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const body = await req.json();
    const updatedOrder = await prisma.order.update({
      where: { id: Number(id) },
      data: { ...body },
    });
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating order' }, { status: 500 });
  }
}