import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, _res: NextResponse) {
  try {
    const id = req.url.split('/').pop();
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, _res: NextResponse) {
  try {
    const id = req.url.split('/').pop();
    console.log('ID recibido:', id); // Verifica que el ID sea el correcto

    const body = await req.json();
    console.log('Datos recibidos para actualizar:', body); // Verifica que los datos sean correctos

    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { ...body },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar:', error); // Agrega un log de error más detallado
    return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
  }
}

