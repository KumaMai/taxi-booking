import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { authConfig } from "./auth.config"; // ← import

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig, // ← spread authConfig
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const admin = await db.adminUser.findUnique({
          where: { email: credentials.email as string },
        });

        if (!admin) return null;

        const isValid = await bcrypt.compare(
          credentials.password as string,
          admin.passwordHash,
        );

        if (!isValid) return null;

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
