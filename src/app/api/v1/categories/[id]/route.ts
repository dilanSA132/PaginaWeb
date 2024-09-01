import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const deletedCategory = await prisma.category.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting category' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const body = await req.json();
    const updatedCategory = await prisma.category.update({
      where: { id: Number(id) },
      data: { ...body },
    });
    return NextResponse.json(updatedCategory, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating category' }, { status: 500 });
  }
}
