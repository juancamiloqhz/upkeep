// export { default } from "next-auth/middleware";

// import { withAuth } from "next-auth/middleware";

// export default withAuth({});

// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/#home", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/",
};
