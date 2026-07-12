import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireSuperAdmin, writeAuditLog } from "@/lib/admin-auth";
import { formDataToObject, routePriceSchema } from "@/validations/admin";

// ─── Server Action ────────────────────────────────────────────
async function updateRoutePrice(formData: FormData) {
  "use server";
  const admin = await requireSuperAdmin();
  const { id, priceStandard, priceSuv, priceVan, isActive } =
    routePriceSchema.parse(formDataToObject(formData));

  await db.priceRoute.update({
    where: { priceRoutesId: id },
    data: {
      priceStandard,
      priceSuv,
      priceVan,
      isActive,
    },
  });
  await writeAuditLog({ adminUserId: admin.adminUsersId, action: "UPDATE_PRICE_ROUTE", entity: "PriceRoute", entityId: String(id), metadata: { priceStandard, priceSuv, priceVan, isActive } });

  revalidatePath("/admin/prices");
  revalidatePath("/price-list");
}

// ─── Page ─────────────────────────────────────────────────────
export default async function AdminPricesPage() {
  const zones = await db.priceZone.findMany({
    include: {
      routes: {
        orderBy: { sortOrder: "asc" },
      },
    },
    orderBy: { sortOrder: "asc" },
  });

  return (
    <div className="min-h-full p-5 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#102326]">Price Management</h1>
        <p className="text-white/40 text-sm mt-1">
          จัดการราคาค่าโดยสารแต่ละเส้นทาง (หน่วย: บาท)
        </p>
      </div>

      <div className="space-y-8">
        {zones.map((zone) => (
          <div
            key={zone.priceZonesId}
            className="bg-[#0f2040] border border-white/10 rounded-2xl overflow-hidden"
          >
            {/* Zone Title */}
            <div className="px-5 py-4 bg-[#1a3a5c]/30 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-[#d4af37] font-bold text-sm tracking-wide">
                  {zone.nameEn.toUpperCase()}
                </h2>
                <p className="text-white/40 text-xs mt-0.5">{zone.nameTh}</p>
              </div>
              <span className="text-white/30 text-xs font-mono">
                {zone.routes.length} routes
              </span>
            </div>

            {/* Routes List */}
            <div className="divide-y divide-white/5">
              {zone.routes.map((route) => (
                <div
                  key={route.priceRoutesId}
                  className={`p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4 transition-opacity ${
                    route.isActive ? "" : "opacity-50"
                  }`}
                >
                  {/* Route Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">
                        {route.fromEn} ➔ {route.toEn}
                      </span>
                    </div>
                    <div className="text-white/40 text-xs mt-1">
                      {route.fromTh} ➔ {route.toTh}
                    </div>
                  </div>

                  {/* Edit Form */}
                  <form
                    action={updateRoutePrice}
                    className="flex flex-wrap items-center gap-3 lg:gap-4"
                  >
                    <input type="hidden" name="id" value={route.priceRoutesId} />

                    {/* Standard Price */}
                    <div className="w-24">
                      <label className="text-white/40 text-[10px] mb-1 block">
                        🚗 Standard
                      </label>
                      <input
                        type="number"
                        name="priceStandard"
                        defaultValue={route.priceStandard}
                        className="w-full rounded-lg border border-[#102326]/15 bg-[#f3eadb] px-2.5 py-1.5 text-xs text-[#102326] outline-none focus:border-[#e46d52]"
                        required
                        min={0}
                      />
                    </div>

                    {/* SUV Price */}
                    <div className="w-24">
                      <label className="text-white/40 text-[10px] mb-1 block">
                        🚙 SUV
                      </label>
                      <input
                        type="number"
                        name="priceSuv"
                        defaultValue={route.priceSuv}
                        className="w-full rounded-lg border border-[#102326]/15 bg-[#f3eadb] px-2.5 py-1.5 text-xs text-[#102326] outline-none focus:border-[#e46d52]"
                        required
                        min={0}
                      />
                    </div>

                    {/* Van Price */}
                    <div className="w-24">
                      <label className="text-white/40 text-[10px] mb-1 block">
                        🚐 Van
                      </label>
                      <input
                        type="number"
                        name="priceVan"
                        defaultValue={route.priceVan}
                        className="w-full rounded-lg border border-[#102326]/15 bg-[#f3eadb] px-2.5 py-1.5 text-xs text-[#102326] outline-none focus:border-[#e46d52]"
                        required
                        min={0}
                      />
                    </div>

                    {/* Active Status */}
                    <div className="w-20">
                      <label className="text-white/40 text-[10px] mb-1 block">
                        Status
                      </label>
                      <select
                        name="isActive"
                        defaultValue={String(route.isActive)}
                        className="w-full rounded-lg border border-[#102326]/15 bg-[#f3eadb] px-2 py-1.5 text-xs text-[#102326] outline-none focus:border-[#e46d52]"
                      >
                        <option value="true">Active</option>
                        <option value="false">Hidden</option>
                      </select>
                    </div>

                    {/* Save Button */}
                    <button
                      type="submit"
                      className="bg-[#d4af37] hover:bg-[#f4c430] text-[#0a1628] font-bold text-xs px-4 py-2 rounded-lg mt-4 lg:mt-0 transition-colors"
                    >
                      Save
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
