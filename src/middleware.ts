import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { env } from 'process';

// Configuración de CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',  // Permitir todos los orígenes
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',  // Métodos permitidos
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',  // Encabezados permitidos
  'Access-Control-Allow-Credentials': 'true',  // Si usas credenciales como cookies, añadir esto
};

// Middleware para aplicar CORS
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Agregar encabezados de CORS a todas las respuestas
  res.headers.set('Access-Control-Allow-Origin', corsHeaders['Access-Control-Allow-Origin']);
  res.headers.set('Access-Control-Allow-Methods', corsHeaders['Access-Control-Allow-Methods']);
  res.headers.set('Access-Control-Allow-Headers', corsHeaders['Access-Control-Allow-Headers']);
  res.headers.set('Access-Control-Allow-Credentials', corsHeaders['Access-Control-Allow-Credentials']);

  // Si es una solicitud OPTIONS (preflight), responder inmediatamente
  if (req.method === 'OPTIONS') {
    return res;
  }

  // Obtener el token de la sesión
  const session = await getToken({ req, secret: env.JWT_SECRET });
  console.log('session', session);

  // Si no existe sesión, redirigir al login
  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = '/login';
    url.search = `p=${requestedPage}`;  // Pasar la página solicitada en el parámetro 'p'
    return NextResponse.redirect(url);
  }

  const userRoleId = session.roleId;
  const restrictedRoutesForUser = ['/menu'];

  // Si el rol es 2 (y la ruta está restringida), redirigir al usuario
  if (userRoleId === 2 && restrictedRoutesForUser.includes(req.nextUrl.pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/products';  // Redirigir a otra página
    return NextResponse.redirect(url);
  }

  return res;  // Continuar con la solicitud si no hay problemas
}

export const config = {
  matcher: ['/menu', '/api/v1/:path*'],  // Este middleware solo se aplica a las rutas que comienzan con '/menu' y '/api/v1/*'
};
