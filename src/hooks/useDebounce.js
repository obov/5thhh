import { useCallback } from "react";

const useDebounce = (ms) => {
  const debouncer = useCallback(
    (callback) => {
      let isAllowed = true;
      let timeoutIndex;
      return () => {
        if (isAllowed) {
          callback();
          isAllowed = false;
        } else {
          clearTimeout(timeoutIndex);
        }
        timeoutIndex = setTimeout(() => {
          isAllowed = true;
        }, ms);
      };
    },
    [ms]
  );
  return debouncer;
};

export default useDebounce;
