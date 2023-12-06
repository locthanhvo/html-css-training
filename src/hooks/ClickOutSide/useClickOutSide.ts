import { useEffect, useRef } from "react";

const useOutsideClick = (callback: () => void, isOpen: boolean) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        isOpen &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        callback();
      }
    };

    const rootElement = document.getElementById("root");

    if (rootElement) {
      rootElement.addEventListener("mousedown", handleClick);
    }

    return () => {
      if (rootElement) {
        rootElement.removeEventListener("mousedown", handleClick);
      }
    };
  }, [callback, isOpen]);

  return ref;
};

export default useOutsideClick;
