import { NextResponse } from "next/server";


export async function middleware( req ) {
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
}
