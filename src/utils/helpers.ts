import React from "react";
/**
 * Hook for checking when the user clicks outside the passed ref
 */
export function useClickOutside({
  ref,
  callback,
  enabled,
}: {
  ref: React.RefObject<any>;
  callback: () => void;
  enabled: boolean;
}) {
  const callbackRef = React.useRef(callback);
  callbackRef.current = callback;
  React.useEffect(() => {
    if (!enabled) {
      return;
    }
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        callbackRef.current();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, enabled]);
}
