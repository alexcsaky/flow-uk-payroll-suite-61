
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SideNavigation } from "./SideNavigation";
import { Toaster } from "@/components/ui/sonner";
import Header from "./Header";

interface AppLayoutProps {
  children?: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-background">
      <SideNavigation isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      
      <div className={cn(
        "flex flex-col flex-1 w-full transition-all duration-300",
        sidebarOpen ? "md:pl-64" : "md:pl-20"
      )}>
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 p-6">
          {children || <Outlet />}
          <Toaster />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
