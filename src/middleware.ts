import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    //identifying the path name
  const path = request.nextUrl.pathname;
  //checking if the path is the login or signup page
  const isPublicPath = path === '/login' || path === '/signup';
  //extracting token from the cookie
  const token = request.cookies.get('token')?.value || '';
//checking if there is token, to not let visit login and sign up pages
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/signup',
    '/login',
    '/profile/:path*'
  ],
}