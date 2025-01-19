import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
export async function DELETE(req: NextRequest, _res: NextResponse) {
    try {
      const id = req.url.split('/').pop();
      const deletedEmail = await prisma.email.delete({
        where: { id: Number(id) },
      });
      return NextResponse.json(deletedEmail, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error al eliminar el correo' }, { status: 500 });
    }
  }
  
  // PUT: Actualizar un correo
  export async function PUT(req: NextRequest, _res: NextResponse) {
    try {
      const id = req.url.split('/').pop();
      const body = await req.json();
      const updatedEmail = await prisma.email.update({
        where: { id: Number(id) },
        data: { ...body },
      });
      return NextResponse.json(updatedEmail, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error al actualizar el correo' }, { status: 500 });
    }
  }