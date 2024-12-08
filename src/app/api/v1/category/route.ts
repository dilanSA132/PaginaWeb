import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching categories' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const body = await req.json();
    const newCategory = await prisma.category.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating category' }, { status: 500 });
  }
}
