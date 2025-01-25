import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  // Manejo de CORS
  const response = NextResponse.next();
  const allowedOrigin = 'https://pagina-bya9vquvf-dilans-projects-76ddfd04.vercel.app'; // Cambia esto por tu dominio

  response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder a las solicitudes OPTIONS (pre-flight)
  if (req.method === 'OPTIONS') {
    return response;
  }

  try {
    const creditDetails = await prisma.creditPayment.findMany();
    return NextResponse.json(creditDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching credits details' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  // Manejo de CORS
  const response = NextResponse.next();
  const allowedOrigin = 'https://pagina-bya9vquvf-dilans-projects-76ddfd04.vercel.app'; // Cambia esto por tu dominio

  response.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder a las solicitudes OPTIONS (pre-flight)
  if (req.method === 'OPTIONS') {
    return response;
  }

  try {
    const body = await req.json();
    const newCreditDetails = await prisma.creditPayment.create({
      data: { ...body },
    });
    return NextResponse.json(newCreditDetails, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating credits details ' }, { status: 500 });
  }
}
