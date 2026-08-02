import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const AUTH_ROUTES = ["/login", "/register"]
const PUBLIC_ROUTES = [
  "/",
  "/properties",
  "/about",
  "/contact",
  "/terms",
  "/privacy",
]

// Safe Edge JWT Decoder (Handles UTF-8 and Padding smoothly without throwing)
function decodeAndValidateJwt(token: string) {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null

    let base64Url = parts[1].replace(/-/g, "+").replace(/_/g, "/")
    // Add padding if required
    while (base64Url.length % 4 !== 0) {
      base64Url += "="
    }

    const jsonPayload = decodeURIComponent(
      Array.from(atob(base64Url))
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    )

    const payload = JSON.parse(jsonPayload)

    // Expiration check
    if (payload.exp && payload.exp * 1000 < Date.now()) {
      return null
    }

    return payload
  } catch (error) {
    console.error("JWT Decode error in middleware:", error)
    return null
  }
}

// NOTE: Function name changed from 'proxy' to 'middleware'
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const accessToken = request.cookies.get("accessToken")?.value

  let decodedToken = null
  let userRole: string | null = null

  if (accessToken) {
    decodedToken = decodeAndValidateJwt(accessToken)
    if (decodedToken) {
      userRole = decodedToken.role?.toUpperCase() || null
    }
  }

  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  // 1. Authenticated user trying to access Auth routes (/login, /register)
  if (decodedToken && isAuthRoute) {
    if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/dashboard/tenant", request.url))
    } else if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/dashboard/landlord", request.url))
    } else if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url))
    } else {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  // 2. Unauthenticated user trying to access Protected routes
  if (!decodedToken && !isPublicRoute && !isAuthRoute) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("redirectTo", pathname)

    const response = NextResponse.redirect(loginUrl)
    // Clear expired or invalid token cookie
    if (accessToken) {
      response.cookies.delete("accessToken")
    }
    return response
  }

  // 3. Root '/dashboard' redirect based on role
  if (pathname === "/dashboard") {
    if (userRole === "TENANT") {
      return NextResponse.redirect(new URL("/dashboard/tenant", request.url))
    }
    if (userRole === "LANDLORD") {
      return NextResponse.redirect(new URL("/dashboard/landlord", request.url))
    }
    if (userRole === "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard/admin", request.url))
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Role-Based Access Control (RBAC) for dashboards
  if (pathname.startsWith("/dashboard/tenant") && userRole !== "TENANT") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (pathname.startsWith("/dashboard/landlord") && userRole !== "LANDLORD") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL("/", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
