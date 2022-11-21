import React from "react";
import * as Popover from "@radix-ui/react-popover";
// import './styles.css';

const PopoverDemo = () => (
  <Popover.Root>
    <Popover.Trigger asChild>More info</Popover.Trigger>
    <Popover.Portal>
      <Popover.Content className="PopoverContent" sideOffset={5}>
        Some more info…
        <Popover.Arrow className="PopoverArrow" />
      </Popover.Content>
    </Popover.Portal>
  </Popover.Root>
);

export default PopoverDemo;
