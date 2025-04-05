
import React from "react";
import { Bell, ChevronDown, Menu, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserNav } from "./UserNav";
import { OrganizationSwitcher } from "./OrganizationSwitcher";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <header className="border-b bg-white sticky top-0 z-30">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button variant="outline" size="icon" className="md:hidden mr-2" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="hidden md:block">
          <OrganizationSwitcher />
        </div>

        <div className="ml-auto flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-destructive rounded-full"></span>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-4 pt-2">
                <span className="text-sm font-medium">Notifications</span>
                <Button variant="link" size="sm" className="text-xs">
                  Mark all as read
                </Button>
              </div>
              <DropdownMenuSeparator />
              <div className="p-4 text-center text-sm text-muted-foreground">
                No new notifications
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <UserNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
