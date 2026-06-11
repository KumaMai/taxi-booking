import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Time Taxi Khaolak | Private Transfers",
    template: "%s | Time Taxi Khaolak",
  },
  description:
    "Private Taxi & Airport Transfers in Khao Lak and Phuket. Pay after trip — no deposit required. 24/7 service.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
