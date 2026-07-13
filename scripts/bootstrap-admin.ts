import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

function requiredEnvironment(name: "DATABASE_URL" | "ADMIN_EMAIL" | "ADMIN_PASSWORD"): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is required to bootstrap the administrator`);
  }

  return value;
}

async function main(): Promise<void> {
  const databaseUrl = requiredEnvironment("DATABASE_URL");
  const email = requiredEnvironment("ADMIN_EMAIL");
  const password = requiredEnvironment("ADMIN_PASSWORD");
  const adapter = new PrismaPg({ connectionString: databaseUrl });
  const prisma = new PrismaClient({ adapter });

  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const existingAdmin = await prisma.adminUser.findUnique({ where: { email } });

    await prisma.adminUser.upsert({
      where: { email },
      create: {
        email,
        passwordHash,
        name: "Administrator",
        role: "SUPER_ADMIN",
      },
      update: {
        passwordHash,
        role: "SUPER_ADMIN",
      },
    });

    console.log(
      existingAdmin
        ? "Administrator credentials synchronized."
        : "Administrator account created.",
    );
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error("Administrator bootstrap failed.");
  if (error instanceof Error) {
    console.error(error.message);
  }
  process.exitCode = 1;
});
