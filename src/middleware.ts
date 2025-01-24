import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Middleware para la autenticación y redirección en las funciones Edge
export async function middleware(req: NextRequest) {
  // Obtén el token de autenticación usando la cabecera de la solicitud
  const secret = req.headers.get('NEXTAUTH_SECRET');  // Usamos la cabecera 'NEXTAUTH_SECRET'
  
  if (!secret) {
    // Si no encontramos el secreto, retornamos un error
    return NextResponse.error();
  }

  const session = await getToken({ req, secret: secret });
  console.log('session', session);

  if (!session) {
    // Si no hay sesión, redirigimos al usuario a la página de login
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const userRoleId = session.roleId;
  const restrictedRoutesForUser = ['/menu']; 

  // Redirigir si el rol del usuario es 2 y está intentando acceder a una ruta restringida
  if (userRoleId === 2 && restrictedRoutesForUser.includes(req.nextUrl.pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/products';  // Redirigir a la página de productos
    return NextResponse.redirect(url);
  }

  // Si todo está bien, continuamos con la solicitud
  return NextResponse.next();
}

// Configuración para especificar las rutas que el middleware debe manejar
export const config = {
  matcher: ['/menu'], // Solo se aplica a las rutas que incluyan '/menu'
};
