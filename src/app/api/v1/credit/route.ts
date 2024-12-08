import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/api';

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const credits = await prisma.credit.findMany({
      include: { customer: true, creditDetails: true },
    });
    return NextResponse.json(credits, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching credits' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const body = await req.json();
    const newCredit = await prisma.credit.create({
      data: body,
    });
    return NextResponse.json(newCredit, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating credit' }, { status: 500 });
  }
}
