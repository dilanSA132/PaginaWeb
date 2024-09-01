import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const users = await prisma.user.findMany({
      include: { role: true },
    });
    return NextResponse.json(users, { status: 200 });
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
    const newUser = await prisma.user.create({
      data: { ...body },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
  }
}
