import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PromotionalBanner from "@/components/PromotionalBanner";
import FixedPaginationBar from "@/components/FixedPaginationBar";
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
            <main className="w-full overflow-y-auto">
              <Header/>
              <PromotionalBanner/>
              <div className="pb-12">
                {children}
              </div>
              <div className="fixed bottom-0  w-[calc(100vw-240px)] z-40 text-gray-200">
                <FixedPaginationBar />
              </div>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
