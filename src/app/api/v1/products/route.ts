import prisma from '@/lib/prisma';
import { ErrorResponse } from '@/types/api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | ErrorResponse | null>
) {
  try {
    const body = await req.json();
    const newProduct = await prisma.product.create({
      data: { ...body },
    });
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating product' }, { status: 500 });
  }
}
