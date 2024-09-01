import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const deletedRole = await prisma.role.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedRole, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting role' }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  _res: NextResponse
) {
  try {
    const id = req.url.split('/').pop();
    const body = await req.json();
    const updatedRole = await prisma.role.update({
      where: { id: Number(id) },
      data: { ...body },
    });
    return NextResponse.json(updatedRole, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating role' }, { status: 500 });
  }
}
