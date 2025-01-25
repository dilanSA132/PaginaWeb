import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',  
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',  
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',  
  'Access-Control-Allow-Credentials': 'true',  
};

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const roles = await prisma.role.findMany();
    const response = NextResponse.json(roles, { status: 200 });

    // Agregar encabezados CORS a la respuesta
    response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    response.headers.set('Access-Control-Allow-Credentials', corsHeaders['Access-Control-Allow-Credentials']);

    return response;
  } catch (error) {
    const response = NextResponse.json({ message: 'Error fetching roles' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    response.headers.set('Access-Control-Allow-Credentials', corsHeaders['Access-Control-Allow-Credentials']);
    
    return response;
  }
}

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const body = await req.json();
    const newRole = await prisma.role.create({
      data: { ...body },
    });

    const response = NextResponse.json(newRole, { status: 201 });

    // Agregar encabezados CORS a la respuesta
    response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    response.headers.set('Access-Control-Allow-Credentials', corsHeaders['Access-Control-Allow-Credentials']);

    return response;
  } catch (error) {
    const response = NextResponse.json({ message: 'Error creating role' }, { status: 500 });
    response.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
    response.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
    response.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
    response.headers.set('Access-Control-Allow-Credentials', corsHeaders['Access-Control-Allow-Credentials']);
    
    return response;
  }
}
