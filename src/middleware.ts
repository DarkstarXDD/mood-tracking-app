import { NextResponse } from "next/server"

import { verifyToken } from "@/lib/session"

import type { NextRequest } from "next/server"

const protectedRoutes = ["/"]
const publicRoutes = ["/login", "/signup"]

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname

  const token = request.cookies.get("token")?.value
  const session = await verifyToken(token)

  const loginPageURL = new URL("/login", request.url)
  const homePageURL = new URL("/", request.url)

  // Redirect to /login, if not authenticated
  if (!session?.userId && protectedRoutes.includes(pathName)) {
    return NextResponse.redirect(loginPageURL)
  }

  // Redirect to /, if authenticated
  if (session?.userId && publicRoutes.includes(pathName)) {
    return NextResponse.redirect(homePageURL)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
