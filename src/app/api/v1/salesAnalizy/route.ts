import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorResponse } from '@/types/api';

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const analysis = await prisma.salesAnalysis.findMany({
      include: { sale: true },
    });
    return NextResponse.json(analysis, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching sales analysis' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const body = await req.json();
    const newAnalysis = await prisma.salesAnalysis.create({
      data: body,
    });
    return NextResponse.json(newAnalysis, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating sales analysis' }, { status: 500 });
  }
}
