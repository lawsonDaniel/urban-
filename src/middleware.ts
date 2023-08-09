import { NextResponse, NextRequest } from "next/server";
import jwt_decode from "jwt-decode";
import { decode } from "querystring";

export function middleware(req: NextRequest) {
  const storedUser:any = req.cookies.get("userToken");
  console.log("middleware:::", storedUser);

  // Decode the JWT to get the expiration timestamp
  var decoded:any = storedUser && jwt_decode(storedUser?.value)
  const currentTime = Math.floor(Date.now() / 1000);

  if (!storedUser || decoded?.exp < currentTime) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
