import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const roles = await prisma.role.findMany();
    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching roles' }, { status: 500 });
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
    return NextResponse.json(newRole, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating role' }, { status: 500 });
  }
}
