
import React from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OrganizationSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <div className="bg-flow w-5 h-5 rounded flex items-center justify-center text-white font-bold text-xs">
            F
          </div>
          <span>Flow Payroll Ltd</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <div className="bg-flow w-5 h-5 rounded flex items-center justify-center text-white font-bold text-xs">
            F
          </div>
          <span>Flow Payroll Ltd</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <div className="bg-gray-600 w-5 h-5 rounded flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
          <span>Another Company</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <div className="bg-emerald-600 w-5 h-5 rounded flex items-center justify-center text-white font-bold text-xs">
            T
          </div>
          <span>Test Organization</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
