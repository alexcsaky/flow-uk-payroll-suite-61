import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface InvoiceExportButtonProps {
  onExport: (format: "standard" | "factoring" | "epsys") => void;
}

export function InvoiceExportButton({ onExport }: InvoiceExportButtonProps) {
  const { toast } = useToast();

  const handleExport = (format: "standard" | "factoring" | "epsys") => {
    // Show loading state
    toast({
      title: "Generating Report",
      description: "Please wait while we prepare your export...",
    });

    // Simulate processing delay
    setTimeout(() => {
      onExport(format);
      
      // Show success message
      toast({
        title: "Export Successful",
        description: `${format === "standard" ? "Standard" : format === "factoring" ? "Factoring Upload" : "EPSYS Upload"} CSV generated successfully!`,
      });
    }, 1000);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport("standard")}>
          Standard CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("factoring")}>
          Factoring Upload (CSV)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("epsys")}>
          EPSYS Upload (CSV)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
} 