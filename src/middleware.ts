import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { env } from 'process';
 
export async function middleware(req: NextRequest) {
  
  const session = await getToken({ req, secret: env.NEXTAUTH_SECRET });
  console.log("session numero", session); 
  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }
 
  return NextResponse.next();
}

export const config = {
  matcher: ['/menu', '/sales', '/orders', '/orderDetails', '/emails'],   
};