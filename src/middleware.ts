import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { env } from 'process';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: env.NEXTAUTH_SECRET });

  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const userRoleId = session.roleId; 
  const restrictedRoutesForUser = ['/menu']; 

  // Verificamos si el usuario tiene roleId = 2 (Usuario) y si intenta acceder a rutas restringidas
  if (userRoleId === 2 && restrictedRoutesForUser.includes(req.nextUrl.pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/products'; // Redirigir a la página de la tienda
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/menu', '/sales', '/orders', '/orderDetails', '/emails', '/products', '/users', '/categories', '/roles', '/permissions', '/api/v1/sale', '/api/v1/orders', '/api/v1/email', '/api/v1/product', '/api/v1/user', '/api/v1/category', '/api/v1/role', '/api/v1/permission'],
};
