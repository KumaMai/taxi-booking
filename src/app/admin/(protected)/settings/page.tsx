import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireSuperAdmin, writeAuditLog } from "@/lib/admin-auth";
import { formDataToObject, settingSchema } from "@/validations/admin";

async function saveSetting(formData: FormData) {
  "use server";
  const admin = await requireSuperAdmin();
  const { key, value } = settingSchema.parse(formDataToObject(formData));
  await db.setting.upsert({ where: { key }, update: { value }, create: { key, value } });
  await writeAuditLog({ adminUserId: admin.adminUsersId, action: "UPDATE_SETTING", entity: "Setting", entityId: key });
  revalidatePath("/admin/settings"); revalidatePath("/", "layout");
}

export default async function SettingsPage() {
  const settings = await db.setting.findMany({ orderBy: { key: "asc" } });
  return <div className="min-h-full bg-[#f3eadb] p-5 text-[#102326] md:p-8"><p className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#e46d52]">Business details</p><h1 className="mb-2 text-4xl">Settings</h1><p className="mb-6 text-sm text-[#102326]/55">Update public contact details without a redeploy.</p><div className="max-w-2xl space-y-4">{settings.map((setting) => <div key={setting.settingsId} className="rounded-2xl border border-[#102326]/15 bg-[#eadfce] p-5"><div className="mb-3"><p className="font-mono text-sm font-medium text-[#e46d52]">{setting.key}</p>{setting.description && <p className="mt-1 text-xs text-[#102326]/55">{setting.description}</p>}</div><form action={saveSetting} className="flex gap-2"><input type="hidden" name="key" value={setting.key} /><input type="text" name="value" defaultValue={setting.value} className="flex-1 rounded-xl border border-[#102326]/15 bg-[#f3eadb] px-3 py-2 text-sm text-[#102326] outline-none focus:border-[#e46d52]" /><button type="submit" className="shrink-0 rounded-full bg-[#e46d52] px-4 py-2 text-sm font-bold text-[#102326]">Save changes</button></form></div>)}</div></div>;
}
