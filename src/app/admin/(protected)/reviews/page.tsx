import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireSuperAdmin, writeAuditLog } from "@/lib/admin-auth";
import { formDataToObject, toggleEntitySchema } from "@/validations/admin";

async function toggleReview(formData: FormData) {
  "use server";
  const admin = await requireSuperAdmin();
  const { id, isActive } = toggleEntitySchema.parse(
    formDataToObject(formData),
  );
  await db.review.update({ where: { reviewsId: id }, data: { isActive } });
  await writeAuditLog({ adminUserId: admin.adminUsersId, action: "TOGGLE_REVIEW", entity: "Review", entityId: String(id), metadata: { isActive } });
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}

const SOURCE_ICON: Record<string, string> = {
  TRIPADVISOR: "🌿",
  GOOGLE: "🔍",
  FACEBOOK: "📘",
  DIRECT: "✅",
};

export default async function ReviewsPage() {
  const reviews = await db.review.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="min-h-full p-5 md:p-8">
      <h1 className="mb-6 text-2xl font-bold text-[#102326]">Reviews</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviews.map((r) => (
          <div
            key={r.reviewsId}
            className={`bg-[#0f2040] border rounded-2xl p-5 transition-colors ${
              r.isActive ? "border-white/10" : "border-white/5 opacity-50"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-white font-medium text-sm">
                  {r.reviewerName}
                </p>
                <p className="text-white/40 text-xs">
                  {SOURCE_ICON[r.source]} {r.source}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#d4af37] text-sm">
                  {"★".repeat(r.rating)}
                </span>
                <form action={toggleReview}>
                  <input type="hidden" name="id" value={r.reviewsId} />
                  <input
                    type="hidden"
                    name="isActive"
                    value={String(!r.isActive)}
                  />
                  <button
                    type="submit"
                    className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                      r.isActive
                        ? "bg-green-500/10 text-green-400 border-green-500/30 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30"
                        : "bg-red-500/10 text-red-400 border-red-500/30 hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/30"
                    }`}
                  >
                    {r.isActive ? "Visible" : "Hidden"}
                  </button>
                </form>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {r.reviewText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
