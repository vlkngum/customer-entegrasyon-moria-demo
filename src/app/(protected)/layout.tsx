import "../globals.css";
import ClientLayout from "../ClientLayout";

import type { Metadata } from "next";
import { Providers } from "@/components/providers/Providers";
// import { poppins } from "./ui/fonts";
import { authOptions } from "../api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Entekas Customer",
  description: "Next.js Proje",
  icons: "/favicon.ico",  
};

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const session = await getServerSession(authOptions as any);
  if (!session) {
    redirect("/login");
  }

  return (
    <Providers>
      <ClientLayout>
        {children}
      </ClientLayout>
    </Providers>
  );
}