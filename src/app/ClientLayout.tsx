"use client"; 

import "./globals.css";
import {   useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PromotionalBanner from "@/components/PromotionalBanner";
import FixedPaginationBar from "@/components/FixedPaginationBar";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div className="w-full min-h-screen bg-blue-50 overflow-x-hidden">{children}</div>;
  }

  return (
    <div className="flex h-screen bg-blue-50 text-black overflow-hidden">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <PromotionalBanner />
        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-12">{children}</div>
        <div className="fixed bottom-0 w-full pr-15 z-40 text-gray-200">
          <FixedPaginationBar />
        </div>
      </main>
    </div>
  );
}
