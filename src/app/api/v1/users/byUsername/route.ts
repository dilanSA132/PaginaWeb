import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
const cors = require('cors')();

export async function POST(req: NextRequest) {
  try {
    // Obtener el cuerpo de la solicitud (debería contener 'email' y 'password')
    const { email, password } = await req.json();

    // Validación básica
    if (!email || !password) {
      const response = NextResponse.json({ message: 'Email y contraseña son requeridos' }, { status: 400 });
      
      // Aplicar cabeceras CORS
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      return response;
    }

    // Buscar el usuario por email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    // Si el usuario no existe
    if (!user) {
      const response = NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
      
      // Aplicar cabeceras CORS
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      return response;
    }

    // Comparar la contraseña proporcionada con la almacenada (sin encriptación)
    if (user.password !== password) {
      const response = NextResponse.json({ message: 'Contraseña incorrecta' }, { status: 401 });
      
      // Aplicar cabeceras CORS
      response.headers.set('Access-Control-Allow-Origin', '*');
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      
      return response;
    }

    // Si la autenticación es exitosa, devolver la información del usuario (sin la contraseña)
    const response = NextResponse.json({
      message: 'Autenticación exitosa',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        roleId: user.roleId
      }
    }, { status: 200 });
    
    // Aplicar cabeceras CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;

  } catch (error) {
    console.error('Error autenticando usuario:', error);
    const response = NextResponse.json({ message: 'Error autenticando usuario' }, { status: 500 });
    
    // Aplicar cabeceras CORS
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  }
}
