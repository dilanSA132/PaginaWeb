import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

// GET: Obtener todos los correos
export async function GET(_req: NextRequest, _res: NextResponse<String | ErrorResponse | null>) {
    try {
      const emails = await prisma.email.findMany();
      return NextResponse.json(emails, { status: 200 });
    } catch (error) {
      return NextResponse.json({ message: 'Error al obtener los correos' }, { status: 500 });
    }
  }
  
  // POST: Crear un nuevo correo
  export async function POST(req: NextRequest, _res: NextResponse<String | ErrorResponse | null>) {
    try {
      const body = await req.json();
      const newEmail = await prisma.email.create({
        data: { ...body },
      });
      return NextResponse.json(newEmail, { status: 201 });
    } catch (error) {
      return NextResponse.json({ message: 'Error al crear el correo' }, { status: 500 });
    }
  }