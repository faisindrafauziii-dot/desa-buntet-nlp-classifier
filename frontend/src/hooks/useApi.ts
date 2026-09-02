import { useState, useCallback } from 'react';
import { AxiosError } from 'axios';

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useApi<T>(
  apiCall: () => Promise<T>,
  initialData: T | null = null
) {
  const [state, setState] = useState<UseApiState<T>>({
    data: initialData,
    loading: false,
    error: null,
  });

  const execute = useCallback(async () => {
    setState({ data: initialData, loading: true, error: null });
    try {
      const result = await apiCall();
      setState({ data: result, loading: false, error: null });
      return result;
    } catch (err) {
      const error = err as AxiosError;
      const errorMessage =
        (error.response?.data as any)?.error || error.message || 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw err;
    }
  }, [apiCall, initialData]);

  return { ...state, execute };
}
