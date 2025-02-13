import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const orders = await prisma.parameter.findMany();
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching Parameters:', error.message);
      return NextResponse.json({ message: 'Error fetching Parameters', details: error.message }, { status: 500 });
    } else {
      console.error('Unknown error:', error);
      return NextResponse.json({ message: 'Unknown error occurred' }, { status: 500 });
    }
  }
}


export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const body = await req.json();
    const newOrder = await prisma.parameter.create({
      data: { ...body },
    });
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating parameter' }, { status: 500 });
  }
}
