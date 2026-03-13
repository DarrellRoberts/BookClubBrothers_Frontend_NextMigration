import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value
  const username = request.cookies.get("username")?.value

  const isAuthPage = request.nextUrl.pathname === "/"

  if (token && isAuthPage && username) {
    return NextResponse.redirect(
      new URL(`/brothers/library/${username}`, request.url),
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/"],
}
