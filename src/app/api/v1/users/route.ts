import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const users = await prisma.user.findMany({
      include: { role: true },
    });
    const response = NextResponse.json(users, { status: 200 });
    
    // Agregar las cabeceras CORS
    response.headers.set('Access-Control-Allow-Origin', '*'); // Cambiar '*' por el dominio específico en producción
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const body = await req.json();

    // Encriptar la contraseña antes de guardar
    if (!body.password) {
      return NextResponse.json({ message: 'Password is required' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Crear el nuevo usuario con la contraseña encriptada
    const newUser = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword, // Reemplazar la contraseña con la encriptada
      },
    });

    const response = NextResponse.json(newUser, { status: 201 });
    
    // Agregar las cabeceras CORS
    response.headers.set('Access-Control-Allow-Origin', '*'); // Cambiar '*' por el dominio específico en producción
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}
