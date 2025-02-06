import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, _res: NextResponse) {
  try {
    const id = req.url.split('/').pop();
    const deletedUser = await prisma.user.delete({
      where: { id: Number(id) },
    });

    const response = NextResponse.json(deletedUser, { status: 200 });
    
    // Aplicar cabeceras CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('Error deleting user:', error);
    const response = NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
    
    // Aplicar cabeceras CORS en caso de error
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
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

    const response = NextResponse.json(updatedUser, { status: 200 });

    // Aplicar cabeceras CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    console.error('Error al actualizar:', error); // Agrega un log de error más detallado
    const response = NextResponse.json({ message: 'Error updating user' }, { status: 500 });
    
    // Aplicar cabeceras CORS en caso de error
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  }
}
