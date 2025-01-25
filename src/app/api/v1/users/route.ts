import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',  
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',  
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',  
  'Access-Control-Allow-Credentials': 'true',  
};

// Función GET para obtener usuarios
export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const users = await prisma.user.findMany({
      include: { role: true },
    });

    const response = NextResponse.json(users, { status: 200 });

    // Agregar encabezados CORS a la respuesta
    response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    response.headers.set('Access-Control-Allow-Credentials', corsHeaders['Access-Control-Allow-Credentials']);

    return response;
  } catch (error) {
    const response = NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    response.headers.set('Access-Control-Allow-Credentials', corsHeaders['Access-Control-Allow-Credentials']);
    return response;
  }
}

// Función POST para crear un nuevo usuario
export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const body = await req.json();

    // Encriptar la contraseña antes de guardar
    if (!body.password) {
      const response = NextResponse.json({ message: 'Password is required' }, { status: 400 });
      response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
      response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
      response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
      response.headers.set('Access-Control-Allow-Credentials', corsHeaders['Access-Control-Allow-Credentials']);
      return response;
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

    // Agregar encabezados CORS a la respuesta
    response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    response.headers.set('Access-Control-Allow-Credentials', corsHeaders['Access-Control-Allow-Credentials']);

    return response;
  } catch (error) {
    const response = NextResponse.json({ message: 'Error creating user' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    response.headers.set('Access-Control-Allow-Credentials', corsHeaders['Access-Control-Allow-Credentials']);
    return response;
  }
}
