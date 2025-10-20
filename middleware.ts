/* eslint-disable @next/next/no-server-import-in-page */
import { NextRequest, NextResponse } from "next/server";

const STATUS_ACTIVE = 1;

function isApiLocalhost(): boolean {
  const api_url = process.env.NEXT_PUBLIC_BASE_URL || "";
  if (!api_url) {
    throw new Error(`env NEXT_PUBLIC_BASE_URL value not found`);
  }
  if (api_url.includes("localhost") || api_url.includes("127.0.0.1")) {
    return true;
  } else return false;
}

export async function middleware(req: NextRequest) {
  // console.log("req.url:", req.url);
  let maintenance = 0;

  // Skip middleware if required environment variables are not set
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const secretKey = process.env.NEXT_PUBLIC_SECRET_KEY;
  
  if (!baseUrl || !secretKey) {
    console.warn("Middleware: Missing environment variables, skipping maintenance check");
    return NextResponse.next();
  }

  try {
    if (!isApiLocalhost()) {
      const res = await fetch(
        // `${process.env.NEXT_PUBLIC_BASE_URL}/api/common-settings`,
        `${baseUrl}/api/maintenance-mode`,
        {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Origin: "*",
            userapisecret: secretKey,
          },
        }
      );
      
      if (!res.ok) {
        console.warn("Middleware: Failed to fetch maintenance mode status");
        return NextResponse.next();
      }
      
      const data = await res.json();
      // console.log("data: ", data);

      if (data?.data) {
        maintenance = parseInt(data?.data?.maintenance_mode_status);
      } else {
        maintenance = parseInt(data?.maintenance_mode_status);
      }
    }
  } catch (error) {
    console.error("Middleware error:", error);
    // Continue with normal flow if maintenance check fails
    return NextResponse.next();
  }

  // console.log("req.nextUrl.pathname:", req.nextUrl.pathname);
  // console.log("req.url:", req.url);
  // console.log({new_url: new URL("/", req.url)});

  if (maintenance == STATUS_ACTIVE) {
    return NextResponse.redirect(new URL("/maintenance", req.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
      -- maintenance|js|style.....
     */
    "/((?!maintenance|js|style|static|.*.(?:png|svg|json|ico|xml|txt)$|_next/static|_next/image).*)",
    "/",
    // "/:path*",
    // "/dashboard/:path*",
    // "/user/:path*",
    // "/exchange/:path*",
    // "/user/my-wallet/:path*",
  ],
};
