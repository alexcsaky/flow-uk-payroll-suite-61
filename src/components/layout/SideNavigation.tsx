import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Users,
  ClipboardList,
  FileText,
  BarChart3,
  Settings,
  CreditCard,
  Building,
  PieChart,
  Calendar,
  CheckCircle2,
  LogOut,
  LucideIcon,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useBillingFeatures } from "@/hooks/use-billing-features";

interface SideNavigationProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  requiresBilling?: boolean;
}

export function SideNavigation({ isOpen, setIsOpen }: SideNavigationProps) {
  const { pathname } = useLocation();
  const { billingEnabled } = useBillingFeatures();

  const navigation: NavigationItem[] = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Employees", href: "/employees", icon: Users },
    { name: "Payroll", href: "/payroll", icon: ClipboardList },
    { name: "Timesheets", href: "/timesheets", icon: Calendar },
    { name: "Approvals", href: "/approvals", icon: CheckCircle2 },
    { name: "Reports", href: "/reports", icon: BarChart3 },
    { name: "Clients", href: "/clients", icon: Building, requiresBilling: true },
    { name: "Invoices", href: "/invoices", icon: FileText, requiresBilling: true },
    { name: "Payments", href: "/payments", icon: CreditCard, requiresBilling: true },
    { name: "Analytics", href: "/analytics", icon: PieChart },
  ];

  const filteredNavigation = navigation.filter(
    (item) => !item.requiresBilling || billingEnabled
  );

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-40 flex flex-col bg-white shadow-sm border-r border-sidebar-border transition-all duration-300",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center h-16 px-4 border-b border-sidebar-border shrink-0">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lovable-uploads/4c6655f2-ef3e-4920-8b84-456eddec7e90.png" 
            alt="Flow Payroll Logo" 
            className={cn(
              "h-10 w-10",
              !isOpen && "mx-auto"
            )}
          />
          {isOpen && (
            <span className="text-xl font-semibold tracking-tight animate-fade-in">
              Flow Payroll
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "ml-auto hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            !isOpen && "mx-auto"
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <ChevronLeft className="h-5 w-5" />
          ) : (
            <ChevronRight className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex-1 overflow-auto py-4">
        <TooltipProvider delayDuration={0}>
          <nav className="grid gap-1 px-2">
            {filteredNavigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Tooltip key={item.name} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                        !isOpen && "justify-center"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5 shrink-0", isActive ? "text-paycircle" : "text-muted-foreground")} />
                      {isOpen && <span>{item.name}</span>}
                    </Link>
                  </TooltipTrigger>
                  {!isOpen && (
                    <TooltipContent side="right" className="flex items-center">
                      {item.name}
                    </TooltipContent>
                  )}
                </Tooltip>
              );
            })}
          </nav>
        </TooltipProvider>
      </div>

      <div className="mt-auto p-4 border-t border-sidebar-border">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/settings"
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  pathname === "/settings" ? "bg-sidebar-accent text-sidebar-accent-foreground" : "",
                  !isOpen && "justify-center"
                )}
              >
                <Settings className={cn("h-5 w-5", pathname === "/settings" ? "text-paycircle" : "text-muted-foreground")} />
                {isOpen && <span>Settings</span>}
              </Link>
            </TooltipTrigger>
            {!isOpen && (
              <TooltipContent side="right">Settings</TooltipContent>
            )}
          </Tooltip>
          <Separator className="my-2 bg-sidebar-border" />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                  !isOpen && "justify-center"
                )}
              >
                <LogOut className="h-5 w-5 text-muted-foreground" />
                {isOpen && <span className="ml-2">Log out</span>}
              </Button>
            </TooltipTrigger>
            {!isOpen && (
              <TooltipContent side="right">Log out</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
