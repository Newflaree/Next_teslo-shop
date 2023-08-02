import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware( req ) {
  /*
  if ( req.nextUrl.pathname.startsWith( '/checkout' ) ) {
    const token = req.cookies.get( 'token' )?.value || '';
    const requestedPage = req.nextUrl.pathname;

    try {
      if ( !token || token.length < 10 ) {
        return NextResponse.rewrite( new URL( `/auth/login?page=${ requestedPage }`, req.url ) )
      }

      return NextResponse.next();
    
    } catch ( error ) {
        return NextResponse.rewrite( new URL( `/auth/login?page=${ requestedPage }`, req.url ) )
    }
  }
    * */
  if ( req.nextUrl.pathname.startsWith( '/checkout' ) ) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || '' })
    //  Información útil sobre el usuario
    //console.log({ session });
    if ( !session ) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = '/auth/login';
      url.search = `page=${ requestedPage }`

      return NextResponse.redirect( url );
    }
   
    return NextResponse.next();
  }

  if ( req.nextUrl.pathname.startsWith( '/admin' ) ) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || '' })
    //  Información útil sobre el usuario
    //console.log( session.user.role );
    if ( !session ) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = '/auth/login';
      url.search = `page=${ requestedPage }`

      return NextResponse.redirect( url );
    }

    const validRoles = [ 'ADMIN_ROLE' ];

    if ( !validRoles.includes( session.user.role ) ) {
      const url = req.nextUrl.clone()
      url.pathname = '/'
      return NextResponse.redirect( url )
    }
   
    return NextResponse.next();
  }

  if ( req.nextUrl.pathname.startsWith( '/api/admin' ) ) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || '' });
    if ( !session ) {
      return new Response( JSON.stringify({
        ok: false,
        message: 'Unauthorized'
      }), {
        status: 401,
        headers: {
          'Content-Type':'application/json'
        }
      });
    }

    const validRoles = [ 'ADMIN_ROLE' ];

    if ( !validRoles.includes( session.user.role ) ) {
      return new Response( JSON.stringify({
        ok: false,
        message: 'Unauthorized'
      }), {
        status: 401,
        headers: {
          'Content-Type':'application/json'
        }
      });
    }
   
    return NextResponse.next();
  }
  /*
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || '' })
  //  Información útil sobre el usuario
  //console.log({ session });
  if ( !session ) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = '/auth/login';
    url.search = `page=${ requestedPage }`

    return NextResponse.redirect( url );
  }
 
  return NextResponse.next();
   * */
}

/*
export const config = {
  matcher: [
    '/checkout/address',
    '/checkout/summary',
    '/checkout/summary',
  ]
}
  * */
