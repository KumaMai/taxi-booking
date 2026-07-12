import "server-only";

import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function requireAdmin(): Promise<{
  adminUsersId: number;
  role: "SUPER_ADMIN" | "ADMIN";
}> {
  const session = await auth();
  const adminUsersId = Number(session?.user?.id);

  if (!Number.isInteger(adminUsersId) || adminUsersId <= 0) {
    throw new Error("Unauthorized");
  }

  const admin = await db.adminUser.findUnique({
    where: { adminUsersId },
    select: { adminUsersId: true, role: true },
  });

  if (!admin) {
    throw new Error("Unauthorized");
  }

  return admin;
}

export async function requireSuperAdmin(): Promise<{
  adminUsersId: number;
  role: "SUPER_ADMIN";
}> {
  const admin = await requireAdmin();
  if (admin.role !== "SUPER_ADMIN") throw new Error("Forbidden");
  return { adminUsersId: admin.adminUsersId, role: "SUPER_ADMIN" };
}

export async function writeAuditLog(input: { adminUserId: number; action: string; entity: string; entityId: string; metadata?: Record<string, string | number | boolean | null> }): Promise<void> {
  const { db } = await import("@/lib/db");
  await db.auditLog.create({ data: input });
}
