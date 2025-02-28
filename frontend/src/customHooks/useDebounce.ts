import { useEffect, useState } from "react";

const useDebounce = (value: string, timeDelay: number) => {
  const [debounceValue, setDebounceValue] = useState("");

  useEffect(() => {
    const data = setTimeout(() => {
      setDebounceValue(value);
    }, timeDelay);
    return () => {
      clearTimeout(data);
    };
  }, [timeDelay, value]);

  return debounceValue;
};

export default useDebounce;
