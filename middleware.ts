import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/api/:path*"],
});

export const config = {
  matcher: ["/((?!api|trpc).+(_next.*|.+\\.[\\w]+$))", "/"],
};
