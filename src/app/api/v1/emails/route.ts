import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
export async function POST(req: NextRequest) {
  const { subject, html, recipientEmail, emailPassword } = await req.json();

  const parameter = await prisma.parameter.findUnique({
    where: { id: 1 },
  });

  if (!parameter) {
    return NextResponse.json({ message: 'Configuración no encontrada' }, { status: 500 });
  }

  const { email, emailPassword: plainPassword } = parameter;  

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: email,
      pass: plainPassword,  
    },
  });

  const mailOptions = {
    from: email,
    to: recipientEmail,
    subject: subject || 'Asunto no especificado',
    html: html || '<p>Sin contenido en el mensaje</p>',
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Correo enviado con éxito' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al enviar el correo', error }, { status: 500 });
  }
}
