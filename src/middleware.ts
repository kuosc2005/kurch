import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  console.log("Middleware triggered for request:", req.url);

  // admin route check
  const isAdminRoute =req.url.startsWith('/admin')  ||  req.url.includes('/admin');
    if (isAdminRoute ) {
    console.log("ADMIN ROUTE HIT", req.url);
    const token = await getToken({ req });
    console.log("ADMIN TOKEN", token);
    if (!token) {
      // Redirect to admin login page if no token
      return NextResponse.redirect(new URL('/adminauth', req.url));
    }

    
    // Admin role check
    if (token.role !== 'admin') {
      return NextResponse.redirect(new URL('/', req.url)); // Redirect to home if not an admin
    }
  }
  
  // user route check
  const isUserRoute =  req.url.includes('/settings') || req.url.includes('/dashboard');

  if(isUserRoute)
  {
    console.log("USER ROUTE HIT", req.url);
    const token = await getToken({ req });

    if(!token) {
      // Redirect to user login page if no token
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // yo flow chai paxi design garnu parxa
    if (token.role !== 'user') {
      return NextResponse.redirect(new URL('/', req.url)); 
    }
  }

  // backend route protection
  if (req.nextUrl.pathname.startsWith("/api/protected")) {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/auth/protected/:path*",
    "/settings",
    "/settings/:path*",
    "/dashboard",
    "/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    
  ],
};



