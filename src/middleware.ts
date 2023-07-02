import { NextResponse, NextRequest } from "next/server";
import { GetStoredAuthToken } from "./common/hooks/token";

export function middleware(req: NextRequest) {
  const storedUser = req.cookies.get("userToken");

  console.log("middleware:::", storedUser);
  if (!storedUser) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
