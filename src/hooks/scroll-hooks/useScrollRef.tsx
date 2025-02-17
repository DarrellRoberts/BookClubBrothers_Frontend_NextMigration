import { useRef, useCallback } from "react";

const useScrollRef = (
  loadingState: boolean,
  limit: number,
  callback: () => void
) => {
  const observer = useRef(null);

  const lastItemRef = useCallback(
    (node) => {
      if (loadingState) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingState, limit]
  );
  return lastItemRef;
};

export default useScrollRef;
