import axios from "axios";
import { useState } from "react";

const useAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const fetcher = async () => {
    setIsLoading(true);
    const { data: dataFetched } = await axios.get(url);
    setData(dataFetched);
    setIsLoading(false);
  };

  return { isLoading, data, fetcher };
};

export default useAxios;
