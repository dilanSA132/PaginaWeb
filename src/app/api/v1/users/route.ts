import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function GET(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  // Manejo de CORS
  const response = NextResponse.next();
  const allowedOrigin = 'https://pagina-bya9vquvf-dilans-projects-76ddfd04.vercel.app'; // Cambia esto por tu dominio de Vercel

  response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder a las solicitudes OPTIONS (pre-flight)
  if (req.method === 'OPTIONS') {
    return response;
  }

  try {
    const users = await prisma.user.findMany({
      include: { role: true },
    });
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  // Manejo de CORS
  const response = NextResponse.next();
  const allowedOrigin = 'https://pagina-bya9vquvf-dilans-projects-76ddfd04.vercel.app'; // Cambia esto por tu dominio de Vercel

  response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder a las solicitudes OPTIONS (pre-flight)
  if (req.method === 'OPTIONS') {
    return response;
  }

  try {
    const body = await req.json();

    // Validación de contraseña
    if (!body.password) {
      return NextResponse.json({ message: 'Password is required' }, { status: 400 });
    }

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // Crear el nuevo usuario con la contraseña encriptada
    const newUser = await prisma.user.create({
      data: {
        ...body,
        password: hashedPassword, // Reemplazar la contraseña con la encriptada
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}
