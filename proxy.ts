import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_ROUTES = ["/login", "/register"];
const PUBLIC_ROUTES = [
  "/",
  "/properties",
  "/about",
  "/contact",
  "/terms",
  "/privacy",
];

// Edge runtime safe JWT payload decoding with Expiration check
function decodeAndValidateJwt(token: string) {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    
    const payload = JSON.parse(jsonPayload);

    // Check if token is expired
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;

  let decodedToken = null;
  let userRole: string | null = null;

  if (accessToken) {
    decodedToken = decodeAndValidateJwt(accessToken);
    if (decodedToken) {
      userRole = decodedToken.role?.toUpperCase() || null;
    }
  }

  // 1. Logged-in user trying to access Auth routes (/login, /register)
  if (decodedToken && AUTH_ROUTES.includes(pathname)) {
    if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/dashboard/tenant", request.url));
    } else if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/dashboard/landlord", request.url));
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url));
    } else {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  );

  // 2. Unauthenticated user trying to access Protected routes
  if (!decodedToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);

    const response = NextResponse.redirect(loginUrl);
    // Clear expired or invalid token cookie
    if (accessToken) {
      response.cookies.delete("accessToken");
    }
    return response;
  }

  // 3. Role-Based Access Control (RBAC) for dashboards
  if (pathname.startsWith("/dashboard/tenant") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/", request.url));
  } 
  
  if (pathname.startsWith("/dashboard/landlord") && userRole !== "LANDLORD") {
    return NextResponse.redirect(new URL("/", request.url));
  } 
  
  if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};