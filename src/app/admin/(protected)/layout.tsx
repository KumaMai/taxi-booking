import { auth, signOut } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import type { ReactNode } from "react";

const NAV_ITEMS = [{ href: "/admin", icon: "▦", label: "Dashboard" }, { href: "/admin/bookings", icon: "▤", label: "Bookings" }, { href: "/admin/prices", icon: "฿", label: "Prices" }, { href: "/admin/reviews", icon: "★", label: "Reviews" }, { href: "/admin/faq", icon: "?", label: "FAQ" }, { href: "/admin/settings", icon: "⚙", label: "Settings" }, { href: "/admin/audit-logs", icon: "≡", label: "Audit logs" }];

export default async function ProtectedAdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session) redirect("/admin/login");
  return <div className="flex min-h-screen bg-[#f3eadb] text-[#102326]"><aside className="flex w-56 shrink-0 flex-col bg-[#0b2a2f] text-[#f3eadb]"><div className="border-b border-[#f3eadb]/10 p-5"><div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e46d52]"><span className="text-center text-[8px] font-semibold leading-tight tracking-[0.12em]">TIME<br />TAXI</span></div><div><p className="text-xs font-bold">Today&apos;s operations</p><p className="text-[10px] text-[#d9cbb8]">Time Taxi Khaolak</p></div></div></div><nav className="flex-1 space-y-0.5 p-3">{NAV_ITEMS.map((item) => <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#d9cbb8] transition-colors hover:bg-[#f3eadb]/10 hover:text-[#f3eadb]"><span className="w-5 text-center">{item.icon}</span>{item.label}</Link>)}</nav><div className="border-t border-[#f3eadb]/10 p-3"><div className="mb-1 px-3 py-2"><p className="text-xs font-medium">{session.user?.name}</p><p className="truncate text-[10px] text-[#d9cbb8]">{session.user?.email}</p></div><form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }); }}><button type="submit" className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[#d9cbb8] hover:bg-[#e46d52]/10 hover:text-[#e46d52]">⇥ Logout</button></form></div></aside><main className="flex-1 overflow-auto">{children}</main></div>;
}
