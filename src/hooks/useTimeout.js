import { useState } from "react";

const useTimeout = (callback, ms) => {
  const [timeoutId, setTimeoutId] = useState(NaN);
  const setOut = () => {
    setTimeoutId(setTimeout(callback, ms));
  };
  const clearOut = () => {
    clearTimeout(timeoutId);
  };
  return { setOut, clearOut };
};

export default useTimeout;
