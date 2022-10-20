import axios from "axios";
import { useState } from "react";

const useAxios = (url, method) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const fetcher = async (payload = undefined) => {
    setIsLoading(true);
    const { data: dataFetched } = await axios[method](url, payload);
    setData(dataFetched);
    setIsLoading(false);
  };

  return { isLoading, data, fetcher };
};

export default useAxios;
