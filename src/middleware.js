import {getToken} from "next-auth/jwt";
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

export const config = {
  matcher: [
    '/checkout/address',
    '/checkout/summary'
  ]
}
