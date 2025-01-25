import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: 'jksde7fufsefjhsoiyawedawdngqwdpoqeuqwdnasigdywdawdkajiwgdyuagwyudqw213kanwuyyg' });
  console.log('session', session);  
  
  // Handling CORS headers
  const response = NextResponse.next();

  // Cambia esto por tu dominio de producción en Vercel
  const allowedOrigin = 'https://pagina-bya9vquvf-dilans-projects-76ddfd04.vercel.app'; 

  // Asegúrate de que solo aceptas solicitudes desde tu dominio de Vercel
  response.headers.set('Access-Control-Allow-Origin', allowedOrigin); 
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Responder a las solicitudes OPTIONS (pre-flight)
  if (req.method === 'OPTIONS') {
    return response;
  }

  // Si no hay sesión, redirige a la página de login
  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const userRoleId = session.roleId; 
  const restrictedRoutesForUser = ['/menu']; 

  // Si el rol del usuario es 2 y está intentando acceder a rutas restringidas, redirige
  if (userRoleId === 2 && restrictedRoutesForUser.includes(req.nextUrl.pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/products'; 
    return NextResponse.redirect(url);
  }

  // Devolver la respuesta con los headers CORS configurados
  return response;
}

export const config = {
  matcher: ['/menu'],
};
