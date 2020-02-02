import { useState, useCallback, useRef, useEffect } from "react";

export const useHttp = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const activeHttpRequest = useRef<AbortController[]>([]);

  const send = useCallback(
    async ({ url, method = "GET", body = null, headers = {} }: ISend) => {
      setLoading(true);
      const httpAbortController = new AbortController();
      activeHttpRequest.current.push(httpAbortController);
      try {
        const response = await fetch(url, {
          method,
          body,
          headers,
          signal: httpAbortController.signal
        } as any);

        const data = await response.json();

        activeHttpRequest.current = activeHttpRequest.current.filter(
          controller => controller !== httpAbortController
        );

        if (!response.ok) {
          throw new Error(data.message);
        }
        setLoading(false);
        return data;
      } catch (e) {
        setError(e.message);
        setLoading(false);
        throw e;
      }
    },
    []
  );

  const clearError = () => setError("");

  useEffect(
    () => () =>
      activeHttpRequest.current.forEach(controller => controller.abort()),
    []
  );

  return {
    isLoading,
    error,
    send,
    clearError
  };
};

interface ISend {
  url: string;
  method?: string;
  body?: any;
  headers?: object;
}
