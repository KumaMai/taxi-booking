import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { authConfig } from "./auth.config"; // ← import

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // ← spread authConfig
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  trustHost: true,
  callbacks: {
    ...authConfig.callbacks,
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }

      return session;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email as string;
        const password = credentials.password as string;
        let admin = await db.adminUser.findUnique({
          where: { email },
        });

        let isValid = admin
          ? await bcrypt.compare(password, admin.passwordHash)
          : false;

        const isConfiguredAdmin =
          email === process.env.ADMIN_EMAIL &&
          password === process.env.ADMIN_PASSWORD;

        if (!isValid && isConfiguredAdmin) {
          const passwordHash = await bcrypt.hash(password, 12);
          admin = await db.adminUser.upsert({
            where: { email },
            create: {
              email,
              passwordHash,
              name: "Administrator",
              role: "SUPER_ADMIN",
            },
            update: { passwordHash, role: "SUPER_ADMIN" },
          });
          isValid = true;
        }

        if (!admin || !isValid) return null;

        await db.adminUser.update({
          where: { adminUsersId: admin.adminUsersId },
          data: { lastLoginAt: new Date() },
        });

        return {
          id: String(admin.adminUsersId),
          email: admin.email,
          name: admin.name,
          role: admin.role,
        };
      },
    }),
  ],
});
