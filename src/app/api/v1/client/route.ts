import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const clients = await prisma.customer.findMany();
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching clients' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const body = await req.json();
    const newClient = await prisma.customer.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json(newClient, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating client' }, { status: 500 });
  }
}
