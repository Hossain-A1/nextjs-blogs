import axios from "axios";
import useSWR from "swr";

const fetcher = async (url) => {
  try {
    const {data} = await axios.get(url);
    return data.payload;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};

export const useFetch =(url) => {
  const { data, error, isLoading } = useSWR(url, fetcher);
  
  return {
    data,
    error,
    isLoading,
  };
};
