import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

/** Lightweight readiness probe for Docker, a reverse proxy, or an uptime monitor. */
export async function GET(): Promise<NextResponse> {
  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, service: "taxi-booking" });
  } catch {
    return NextResponse.json(
      { ok: false, service: "taxi-booking" },
      { status: 503 },
    );
  }
}
