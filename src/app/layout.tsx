import "./globals.css";
import { poppins } from "@/app/(protected)/ui/fonts";
import { Providers } from "@/components/providers/Providers";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entekas Customer",
  description: "Next.js Proje",
  icons: "/favicon.ico",  
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body className={`${poppins.className} antialiased bg-black text-white`}>
          <Providers>
            {children}
          </Providers>
        </body>
      </html>
  );
}