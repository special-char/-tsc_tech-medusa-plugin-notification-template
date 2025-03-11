import { useEffect, useRef } from "react";

const useLastFocusedElement = () => {
  const lastFocusedRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null
  );

  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        lastFocusedRef.current = event.target;
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    return () => document.removeEventListener("focusin", handleFocusIn);
  }, []);

  return lastFocusedRef;
};
export default useLastFocusedElement;
