import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import { getLocale } from "@/lib/locale";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Time Taxi Khaolak", url: "/", locale: "en_TH" },
  twitter: { card: "summary_large_image", title: "Time Taxi Khaolak | Private Transfers" },
  title: {
    default: "Time Taxi Khaolak | Private Transfers",
    template: "%s | Time Taxi Khaolak",
  },
  description:
    "Private Taxi & Airport Transfers in Khao Lak and Phuket. Pay after trip — no deposit required. 24/7 service.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className="antialiased">
        {children}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              background: "#0f2040",
              border: "1px solid #d4af37",
              color: "white",
            },
          }}
        />
      </body>
    </html>
  );
}
