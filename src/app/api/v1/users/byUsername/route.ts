import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
const cors = require('cors')(); 

export async function POST(req: NextRequest) {
  try {
    // Obtener el cuerpo de la solicitud (debería contener 'email' y 'password')
    const { email, password } = await req.json();

    // Validación básica
    if (!email || !password) {
      return NextResponse.json({ message: 'Email y contraseña son requeridos' }, { status: 400 });
    }

    // Buscar el usuario por email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Si el usuario no existe
    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    // Comparar la contraseña proporcionada con la almacenada (sin encriptación)
    if (user.password !== password) {
      return NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
    }

    // Si la autenticación es exitosa, devolver la información del usuario (sin la contraseña)
    return NextResponse.json({
      message: 'Autenticación exitosa',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId
      }
    }, { status: 200 });

  } catch (error) {
    console.error('Error autenticando usuario:', error);
    return NextResponse.json({ message: 'Error autenticando usuario' }, { status: 500 });
  }
}
