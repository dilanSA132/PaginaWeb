import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

function generateTempPassword(length: number = 8): string {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
}

export async function POST(
  req: NextRequest,
  _res: NextResponse<String  | null>
) {
  try {
    const { email } = await req.json();

    const parameter = await prisma.parameter.findUnique({
      where: { id: 1 },
    });

    if (!parameter) {
      return NextResponse.json({ message: 'Configuración no encontrada' }, { status: 500 });
    }

    const { email: configEmail, emailPassword: plainPassword } = parameter;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: configEmail,
        pass: plainPassword,
      },
    });

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Usuario no encontrado' }, { status: 404 });
    }

    const tempPassword = generateTempPassword();

    await prisma.user.update({
      where: { email },
      data: {
        tempPassword,
        isRecovering: true,
      },
    });

    const mailOptions = {
      from: configEmail,
      to: email,
      subject: 'Recuperación de contraseña',
      html: `<p>Tu nueva contraseña temporal es: <strong>${tempPassword}</strong></p>`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Correo enviado con éxito' }, { status: 200 });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return NextResponse.json({ message: 'Error al enviar el correo', error }, { status: 500 });
  }
}
