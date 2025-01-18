import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const deleteCredit = await prisma.credit.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deleteCredit, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting credit' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const body = await req.json();
    const updateCredit = await prisma.credit.update({
      where: { id: Number(id) },
      data: { ...body },
    });
    return NextResponse.json(updateCredit, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating credit' }, { status: 500 });
  }
}
