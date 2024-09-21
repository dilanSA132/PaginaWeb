import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  const { subject, html, recipientEmail } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // Usa la variable de entorno para el usuario
      pass: process.env.EMAIL_PASSWORD, // Usa la variable de entorno para la contraseña
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // También para el campo "from"
    to: recipientEmail, // Se envía al correo proporcionado por el cliente
    subject: subject || 'Asunto no especificado',
    html: html || '<p>Sin contenido en el mensaje</p>', // Usamos el contenido HTML
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Correo enviado con éxito' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error al enviar el correo', error }, { status: 500 });
  }
}
