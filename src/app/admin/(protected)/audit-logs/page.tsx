import Link from "next/link";
import { db } from "@/lib/db";
import { requireSuperAdmin } from "@/lib/admin-auth";

export default async function AuditLogsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  await requireSuperAdmin();
  const params = await searchParams;
  const pageSize = 25;
  const page = Math.max(1, Number.parseInt(params.page ?? "1", 10) || 1);
  const [total, logs] = await Promise.all([
    db.auditLog.count(),
    db.auditLog.findMany({ include: { adminUser: { select: { name: true, email: true } } }, orderBy: { createdAt: "desc" }, take: pageSize, skip: (page - 1) * pageSize }),
  ]);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  return <div className="min-h-full bg-[#f3eadb] p-5 text-[#102326] md:p-8"><p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#e46d52]">Security trail</p><h1 className="mb-2 text-4xl">Audit logs</h1><p className="mb-6 text-sm text-[#102326]/55">Review administrative changes made across the booking system.</p><div className="overflow-hidden rounded-2xl border border-[#102326]/15 bg-[#eadfce]"><div className="overflow-x-auto"><table className="min-w-[760px] w-full text-sm"><thead className="border-b border-[#102326]/10 text-left text-xs uppercase tracking-wide text-[#102326]/55"><tr><th className="px-5 py-3">When</th><th className="px-5 py-3">Admin</th><th className="px-5 py-3">Action</th><th className="px-5 py-3">Entity</th><th className="px-5 py-3">ID</th></tr></thead><tbody>{logs.map((log) => <tr key={log.auditLogsId} className="border-b border-[#102326]/10"><td className="px-5 py-3 text-[#102326]/65">{log.createdAt.toLocaleString("en-GB")}</td><td className="px-5 py-3"><p className="font-medium">{log.adminUser.name}</p><p className="text-xs text-[#102326]/50">{log.adminUser.email}</p></td><td className="px-5 py-3 font-mono text-xs text-[#e46d52]">{log.action}</td><td className="px-5 py-3 text-[#102326]/70">{log.entity}</td><td className="px-5 py-3 font-mono text-xs text-[#102326]/60">{log.entityId}</td></tr>)}</tbody></table>{logs.length === 0 && <p className="p-8 text-center text-sm text-[#102326]/55">No audit activity yet.</p>}</div></div><div className="mt-4 flex items-center justify-between text-sm text-[#102326]/60"><span>Page {page} of {pageCount}</span><div className="flex gap-2">{page > 1 && <Link className="rounded-full border border-[#102326]/15 bg-[#eadfce] px-3 py-1.5" href={`/admin/audit-logs?page=${page - 1}`}>Previous</Link>}{page < pageCount && <Link className="rounded-full border border-[#102326]/15 bg-[#eadfce] px-3 py-1.5" href={`/admin/audit-logs?page=${page + 1}`}>Next</Link>}</div></div></div>;
}
