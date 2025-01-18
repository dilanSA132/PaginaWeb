import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const credits = await prisma.credit.findMany();
    return NextResponse.json(credits, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching credits' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const body = await req.json();
    const newCredit = await prisma.credit.create({
      data: { ...body },
    });
    return NextResponse.json(newCredit, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating credits' }, { status: 500 });
  }
}
