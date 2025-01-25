import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { env } from 'process';

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: 'jksde7fufsefjhsoiyawedawdngqwdpoqeuqwdnasigdywdawdkajiwgdyuagwyudqw213kanwuyyg'
  });
  
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

  // Añadir cabeceras CORS
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*'); // Permitir todos los orígenes o especificar un dominio
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Permitir métodos
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Permitir cabeceras específicas

  return response;
}

export const config = {
  matcher: ['/menu', '/products', '/api/*'], // Aplica el middleware en otras rutas si es necesario
};

