import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const deletedProduct = await prisma.product.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting product' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const body = await req.json();
    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: { ...body },
    });
    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating product' }, { status: 500 });
  }
}
