import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(
  req: NextRequest,
  _res: NextResponse<String | null>
) {
  try {
    const { email, tempPassword, newPassword } = await req.json();

    if (!email || !tempPassword || !newPassword) {
      return NextResponse.json({ message: 'Email, contraseña temporal y nueva contraseña son requeridos' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    if (user.tempPassword !== tempPassword) {
      return NextResponse.json({ message: 'Contraseña temporal incorrecta' }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: {
        password: hashedPassword,
        isRecovering: false,
        tempPassword: null,
      },
    });

    return NextResponse.json({ message: 'Contraseña actualizada exitosamente' }, { status: 200 });
  } catch (error) {
    console.error('Error al actualizar contraseña:', error);
    return NextResponse.json({ message: 'Error al actualizar la contraseña', error }, { status: 500 });
  }
}
