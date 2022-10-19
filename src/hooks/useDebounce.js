import { useCallback } from "react";

const useDebounce = (ms) => {
  const debouncer = useCallback(
    (callback) => {
      let isAllowed = true;
      let timeoutIndex;
      return (...params) => {
        if (isAllowed) {
          callback(...params);
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
