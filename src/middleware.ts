import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Configuración CORS
const allowedOrigins = [
  'https://pagina-web-git-main-dilans-projects-76ddfd04.vercel.app', // Agrega los orígenes permitidos
  'https://pagina-web-ten-fawn.vercel.app', // Si necesitas otro origen
];

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: 'jksde7fufsefjhsoiyawedawdngqwdpoqeuqwdnasigdywdawdkajiwgdyuagwyudqw213kanwuyyg' });
  console.log('session', session);

  // Verificar la sesión y redirigir al login si no está autenticado
  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/login`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  const userRoleId = session.roleId;
  const restrictedRoutesForUser = ['/menu'];

  // Redirigir según el rol del usuario
  if (userRoleId === 2 && restrictedRoutesForUser.includes(req.nextUrl.pathname)) {
    const url = req.nextUrl.clone();
    url.pathname = '/products';
    return NextResponse.redirect(url);
  }

  // Verificar el origen y agregar las cabeceras CORS
  const origin = req.headers.get('origin');
  if (allowedOrigins.includes(origin || '')) {
    const res = NextResponse.next();
    res.headers.set('Access-Control-Allow-Origin', origin || '*');
    res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.headers.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');
    return res;
  }

  // Si el origen no es permitido, podemos devolver un error o una respuesta diferente
  if (origin) {
    const res = new NextResponse('Forbidden', { status: 403 });
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/menu', '/api/v1/(.*)'], // Rutas a las que se aplica este middleware
};
