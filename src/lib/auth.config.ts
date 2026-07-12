import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // The app is deployed behind a controlled reverse proxy; accept its forwarded host.
  trustHost: true,
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname === "/admin/login";
      const isAdminPath = nextUrl.pathname.startsWith("/admin");

      // ยังไม่ login และเข้า /admin → redirect ไป login
      if (isAdminPath && !isLoginPage && !isLoggedIn) {
        return false;
      }

      // login แล้วแต่เปิด /admin/login → redirect ไป /admin
      if (isLoginPage && isLoggedIn) {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      return true;
    },
  },
  providers: [], // ← ไม่ต้องมี providers — ไม่ใช้ crypto
} satisfies NextAuthConfig;
