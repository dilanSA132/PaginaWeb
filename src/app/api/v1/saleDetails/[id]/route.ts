import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const deletedSaleDetail = await prisma.saleDetail.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedSaleDetail, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting sale detail' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const body = await req.json();
    const updatedSaleDetail = await prisma.saleDetail.update({
      where: { id: Number(id) },
      data: { ...body },
    });
    return NextResponse.json(updatedSaleDetail, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating sale detail' }, { status: 500 });
  }
}
