import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const deletedOrderDetail = await prisma.orderDetail.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedOrderDetail, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting order detail' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const body = await req.json();
    const updatedOrderDetail = await prisma.orderDetail.update({
      where: { id: Number(id) },
      data: { ...body },
    });
    return NextResponse.json(updatedOrderDetail, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating order detail' }, { status: 500 });
  }
}
