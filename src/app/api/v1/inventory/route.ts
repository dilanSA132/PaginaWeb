import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_req: NextRequest, _res: NextResponse) {
  try {
    const inventoryItems = await prisma.inventory.findMany({ include: { category: true } });
    return NextResponse.json(inventoryItems, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching inventory items' }, { status: 500 });
  }
}

export async function POST(req: NextRequest, _res: NextResponse) {
  try {
    const body = await req.json();
    const newItem = await prisma.inventory.create({
      data: {
        ...body,
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating inventory item' }, { status: 500 });
  }
}
