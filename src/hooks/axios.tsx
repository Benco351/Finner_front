import { useState, useCallback } from "react";
import axios from "axios";

interface Axios {
  url: string;
  method: "get" | "post" | "patch" | "delete";
  body?: any;
}
const useAxios = (requestConfig: Axios, applyData: any) => {
  const { url, method, body } = requestConfig;
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const sendRequest = useCallback(async () => {
    try {
      setError("");
      setIsLoading(true);
      const response = await axios[method](url, body);
      applyData(response);
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.data.message === "validation failed") {
          return setError("Request error , please try again.");
        }
        setError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request);
        setError("Request error , please try again.");
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log("Error", error.message);
        setError("Request error , please try again.");
      }
    }
    setIsLoading(false);
  }, [url, body, applyData, method]);

  return { sendRequest, error, isLoading };
};

export default useAxios;
