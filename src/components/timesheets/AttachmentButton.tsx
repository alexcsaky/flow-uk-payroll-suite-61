import React from "react";
import { Button } from "@/components/ui/button";
import { Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttachmentButtonProps {
  count?: number;
  onClick: () => void;
  className?: string;
}

export function AttachmentButton({ count, onClick, className }: AttachmentButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("relative h-8 w-8", className)}
      onClick={onClick}
    >
      <Paperclip className="h-4 w-4" />
      {count !== undefined && count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
          {count}
        </span>
      )}
    </Button>
  );
} 