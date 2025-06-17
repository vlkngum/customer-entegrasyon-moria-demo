import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PromotionalBanner from "@/components/PromotionalBanner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CMApps Customer",
  description: "CMApps Customer Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-screen bg-blue-50 text-black">
            <Sidebar />
            <main className="flex-1 overflow-y-auto ">
              <Header/>
              <PromotionalBanner/>
              {children}
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
