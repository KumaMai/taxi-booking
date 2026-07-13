import type { ReactNode } from "react";
import { connection } from "next/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { getSettings } from "@/lib/settings";
import { getLocale } from "@/lib/locale";

export default async function PublicLayout({ children }: { children: ReactNode }) {
  await connection();
  const settings = await getSettings();
  const locale = await getLocale();

  return (
    <div className="min-h-screen flex flex-col bg-[#f7f1e5] text-[#102326]">
      <Navbar settings={settings} locale={locale} />
      <main className="flex-1">{children}</main>
      <Footer settings={settings} locale={locale} />
      <WhatsAppButton settings={settings} />
    </div>
  );
}
