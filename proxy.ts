import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard")

  if (isDashboard && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}
