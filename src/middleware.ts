import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { env } from 'process';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: 'jksde7fufsefjhsoiyawedawdngqwdpoqeuqwdnasigdywdawdkajiwgdyuagwyudqw213kanwuyyg' });
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
    url.pathname = '/products'; 
    return NextResponse.redirect(url);
  }

  // Add CORS headers to the response
  const response = NextResponse.next();
  response.headers.set('Access-Control-Allow-Origin', '*'); // Allow all origins or specify a domain
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow methods
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
  
  return response;
}

export const config = {
  matcher: ['/menu'],
};
