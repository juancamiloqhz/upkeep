import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

const RadixTooltip = ({
  children,
  text,
  side,
}: {
  children: React.ReactNode;
  text: string;
  side?: "top" | "bottom" | "left" | "right";
}) => {
  return (
    <Tooltip.Provider delayDuration={0} disableHoverableContent>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="z-[9999] select-none rounded-[4px] bg-gray-900 p-[6px] text-xs leading-none text-white shadow-md duration-[200ms] will-change-transform dark:bg-gray-700"
            sideOffset={1}
            side={side || "bottom"}
          >
            {text}
            <Tooltip.Arrow className="fill-black/70" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default RadixTooltip;
