import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSuperAdmin, writeAuditLog } from "@/lib/admin-auth";
import {
  formDataToObject,
  toggleEntitySchema,
  updateFaqSchema,
} from "@/validations/admin";

async function toggleFaq(formData: FormData) {
  "use server";
  const admin = await requireSuperAdmin();
  const { id, isActive } = toggleEntitySchema.parse(
    formDataToObject(formData),
  );
  await db.faq.update({ where: { faqsId: id }, data: { isActive } });
  await writeAuditLog({ adminUserId: admin.adminUsersId, action: "TOGGLE_FAQ", entity: "Faq", entityId: String(id), metadata: { isActive } });
  revalidatePath("/admin/faq");
  revalidatePath("/qa");
  revalidatePath("/");
}

async function updateFaq(formData: FormData) {
  "use server";
  const admin = await requireSuperAdmin();
  const { id, questionEn, questionTh, answerEn, answerTh } =
    updateFaqSchema.parse(formDataToObject(formData));
  await db.faq.update({
    where: { faqsId: id },
    data: { questionEn, questionTh, answerEn, answerTh },
  });
  await writeAuditLog({ adminUserId: admin.adminUsersId, action: "UPDATE_FAQ", entity: "Faq", entityId: String(id) });
  revalidatePath("/admin/faq");
  revalidatePath("/qa");
  revalidatePath("/");
  redirect("/admin/faq");
}

export default async function FaqAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ editing?: string }>;
}) {
  const { editing } = await searchParams;
  const editingId = editing ? parseInt(editing) : null;

  const categories = await db.faqCategory.findMany({
    include: { faqs: { orderBy: { sortOrder: "asc" } } },
    orderBy: { sortOrder: "asc" },
  });

  const editingFaq = editingId
    ? categories.flatMap((c) => c.faqs).find((f) => f.faqsId === editingId)
    : null;

  return (
    <div className="min-h-full p-5 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-[#102326]">FAQ Management</h1>

      <div className="space-y-6">
        {categories.map((cat) => (
          <div
            key={cat.faqCategoriesId}
            className="bg-[#0f2040] border border-white/10 rounded-2xl overflow-hidden"
          >
            <div className="px-5 py-3 bg-[#1a3a5c]/40 border-b border-white/5">
              <h2 className="text-[#d4af37] font-semibold text-sm">
                {cat.nameEn}
              </h2>
              <p className="text-white/40 text-xs">{cat.nameTh}</p>
            </div>

            <div className="divide-y divide-white/5">
              {cat.faqs.map((faq) => (
                <div
                  key={faq.faqsId}
                  className={`p-5 ${!faq.isActive ? "opacity-50" : ""}`}
                >
                  {editingId === faq.faqsId && editingFaq ? (
                    // ── Edit Form ──
                    <form action={updateFaq} className="space-y-3">
                      <input type="hidden" name="id" value={faq.faqsId} />
                      {[
                        {
                          name: "questionEn",
                          label: "Question (EN)",
                          val: faq.questionEn,
                        },
                        {
                          name: "questionTh",
                          label: "Question (TH)",
                          val: faq.questionTh,
                        },
                        {
                          name: "answerEn",
                          label: "Answer (EN)",
                          val: faq.answerEn,
                        },
                        {
                          name: "answerTh",
                          label: "Answer (TH)",
                          val: faq.answerTh,
                        },
                      ].map(({ name, label, val }) => (
                        <div key={name}>
                          <label className="text-white/40 text-xs mb-1 block">
                            {label}
                          </label>
                          <textarea
                            name={name}
                            defaultValue={val}
                            rows={2}
                            className="w-full rounded-xl border border-[#102326]/15 bg-[#f3eadb] px-3 py-2 text-sm text-[#102326] outline-none focus:border-[#e46d52] resize-none"
                          />
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <button
                          type="submit"
                          className="bg-[#d4af37] hover:bg-[#f4c430] text-[#0a1628] font-medium text-sm px-4 py-1.5 rounded-lg"
                        >
                          Save
                        </button>
                        <a
                          href="/admin/faq"
                          className="bg-white/5 hover:bg-white/10 text-white/60 text-sm px-4 py-1.5 rounded-lg"
                        >
                          Cancel
                        </a>
                      </div>
                    </form>
                  ) : (
                    // ── View Row ──
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-white/80 text-sm font-medium mb-1">
                          {faq.questionEn}
                        </p>
                        <p className="text-white/40 text-xs">
                          {faq.questionTh}
                        </p>
                        <p className="text-white/60 text-xs mt-2 leading-relaxed">
                          {faq.answerEn}
                        </p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <a
                          href={`/admin/faq?editing=${faq.faqsId}`}
                          className="bg-[#d4af37]/10 hover:bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 text-xs px-3 py-1 rounded-full"
                        >
                          Edit
                        </a>
                        <form action={toggleFaq}>
                          <input type="hidden" name="id" value={faq.faqsId} />
                          <input
                            type="hidden"
                            name="isActive"
                            value={String(!faq.isActive)}
                          />
                          <button
                            type="submit"
                            className={`text-xs px-3 py-1 rounded-full border ${
                              faq.isActive
                                ? "bg-green-500/10 text-green-400 border-green-500/30"
                                : "bg-red-500/10 text-red-400 border-red-500/30"
                            }`}
                          >
                            {faq.isActive ? "On" : "Off"}
                          </button>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
