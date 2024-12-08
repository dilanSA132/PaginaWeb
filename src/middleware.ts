import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { env } from 'process';

export async function middleware(req: NextRequest) {
 const session = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  console.log('session', session);  
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
    url.pathname = '/'; 
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/v1/client', '/api/v1/accountsReceivable', '/api/v1/category', '/api/v1/credit', '/api/v1/creditDetail','/api/v1/inventory','/api/v1/purchase','/api/v1/purchaseDetail','/api/v1/role','/api/v1/sale','/api/v1/saleDetail','/api/v1/salesAnalizy',],
};
