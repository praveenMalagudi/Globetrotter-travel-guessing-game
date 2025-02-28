import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    formatLabel?: (value: number) => string;
  }
>(({ className, formatLabel, ...props }, ref) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex w-full touch-none select-none items-center",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden bg-primary-100">
        <SliderPrimitive.Range className="absolute h-full bg-primary-600" />
      </SliderPrimitive.Track>
      <TooltipProvider>
        <Tooltip open={showTooltip}>
          <TooltipTrigger asChild>
            <SliderPrimitive.Thumb
              className="block h-3 w-3 rounded-full bg-primary-600 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              onPointerDown={() => setShowTooltip(true)}
              onPointerUp={(e) => {
                // Only hide tooltip if we're not hovering over the thumb
                if (!e.currentTarget.matches(":hover")) {
                  setShowTooltip(false);
                }
              }}
            />
          </TooltipTrigger>
          <TooltipContent
            className="py-1 px-2 bg-neutral-600 text-white text-xs"
            side="bottom"
          >
            {formatLabel
              ? formatLabel(props.value?.[0] || 0)
              : props.value?.[0]}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
