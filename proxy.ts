import { auth } from "@/lib/auth/server";

export default auth.middleware({
  loginUrl: "/authentication",
});

export const config = {
  matcher: [
    "/dashboard/:path*",
  ],
};