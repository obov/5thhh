import { useState } from "react";
import useTimeout from "./useTimeout";

const useDebounce = (callback, time) => {
  const [isAllowed, setIsAllowed] = useState(true);
  const { setOut, clearOut } = useTimeout(() => {
    setIsAllowed(true);
  }, time);
  const calling = () => {
    if (isAllowed) {
      callback();
      setIsAllowed(false);
    } else {
      clearOut();
    }
    setOut();
  };
  return calling;
};

export default useDebounce;
