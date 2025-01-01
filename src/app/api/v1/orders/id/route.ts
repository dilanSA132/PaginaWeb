import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    // Obtener el cuerpo de la solicitud (debería contener 'userId')
    const { userId } = await req.json();

    // Validar que el userId esté presente
    if (!userId) {
      return NextResponse.json({ message: 'El ID de usuario es requerido' }, { status: 400 });
    }

    // Buscar las órdenes del usuario por el ID
    const orders = await prisma.order.findMany({
 
      include: {
        details: {
          include: {
            product: true,
          },
        },
      },
      where: {
        userId: Number(userId), // Convertir el userId a un número
      },
    });

    // Si no se encuentran órdenes
    if (orders.length === 0) {
      return NextResponse.json({ message: 'No se encontraron órdenes para este usuario' }, { status: 404 });
    }

    // Devolver las órdenes encontradas
    return NextResponse.json({
      message: 'Órdenes obtenidas exitosamente',
      orders,
    }, { status: 200 });

  } catch (error) {
    console.error('Error obteniendo órdenes:', error);
    return NextResponse.json({ message: 'Error obteniendo órdenes' }, { status: 500 });
  }
}