import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const deletedSale = await prisma.sale.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedSale, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting sale' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const body = await req.json();
    const updatedSale = await prisma.sale.update({
      where: { id: Number(id) },
      data: { ...body },
    });
    return NextResponse.json(updatedSale, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating sale' }, { status: 500 });
  }
}
