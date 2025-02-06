import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Log para verificar la solicitud
  console.log('Middleware ejecutado para:', req.method, req.nextUrl.pathname);

  if (req.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': 'https://pagina-r0xdl2vwh-dilans-projects-76ddfd04.vercel.app', // Tu dominio
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }
  
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const userRoleId = session.roleId;
  const restrictedRoutesForUser = ['/menu'];
  
  if (userRoleId === 2 && restrictedRoutesForUser.includes(req.nextUrl.pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/products';
    return NextResponse.redirect(url);
  }

  // Configuración de las cabeceras CORS para las respuestas
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', 'https://pagina-r0xdl2vwh-dilans-projects-76ddfd04.vercel.app');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Log para confirmar que las cabeceras están siendo establecidas
  console.log('Cabeceras CORS aplicadas:', {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  return response;
}

export const config = {
  matcher: ['/menu', '/api/v1/:path*'],
};
