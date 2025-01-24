import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
// Usa 'process.env' para acceder a variables de entorno de Next.js

export async function middleware(req:any) {
  // Acceder a las variables de entorno usando 'next/env'
  const secret = process.env.NEXTAUTH_SECRET;
  if (!secret) {
    return NextResponse.error();  // Si no hay secreto, retornar error
  }

  const session = await getToken({ req, secret: secret });
  console.log('session', session);

  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);  // Redirigir a login si no hay sesión
  }

  const userRoleId = session.roleId;
  const restrictedRoutesForUser = ['/menu']; 

  if (userRoleId === 2 && restrictedRoutesForUser.includes(req.nextUrl.pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/products';  // Redirigir si el rol del usuario es 2
    return NextResponse.redirect(url);
  }

  return NextResponse.next();  // Continuar si todo está bien
}

export const config = {
  matcher: ['/menu'],  // Aplicar el middleware solo a estas rutas
};
