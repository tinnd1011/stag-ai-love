"use client";
import { SidebarProvider } from "@/providers/side-bar.provider";
import MainPage from "@/components/main-page";

export default function Home() {
  return (
    <SidebarProvider>
      <MainPage />
    </SidebarProvider>
  );
}
