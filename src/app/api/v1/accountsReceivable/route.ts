import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/api';

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const accounts = await prisma.accountsReceivable.findMany({
      include: { customer: true },
    });
    return NextResponse.json(accounts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching accounts receivable' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const body = await req.json();
    const newAccount = await prisma.accountsReceivable.create({
      data: body,
    });
    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating accounts receivable' }, { status: 500 });
  }
}
