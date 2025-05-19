
import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    orientation?: "horizontal" | "vertical"
  }
>(({ className, value, orientation = "horizontal", ...props }, ref) => {
  const isVertical = orientation === "vertical";
  
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-full bg-secondary",
        isVertical ? "h-full w-2" : "h-2 w-full", // Reduced height from h-4 to h-2 for better UI consistency
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full bg-primary transition-all",
          isVertical ? "w-full absolute bottom-0" : "w-[var(--radix-progress-indicator-width)]"
        )}
        style={
          isVertical
            ? { height: `${value || 0}%` }
            : {}
        }
      />
    </ProgressPrimitive.Root>
  )
})
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
