import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
// import "./styles.css";

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
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="select-none rounded-[4px] bg-black/80 p-[6px] text-xs leading-none text-white shadow-md duration-[200ms] will-change-transform"
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

// border-radius: 4px;
//   padding: 10px 15px;
//   font-size: 15px;
//   line-height: 1;
//   color: var(--violet11);
//   background-color: white;
//   box-shadow: hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
//   user-select: none;
//   animation-duration: 400ms;
//   animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
//   will-change: transform, opacity;
