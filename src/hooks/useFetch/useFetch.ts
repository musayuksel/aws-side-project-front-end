import { useState, useRef, useCallback } from 'react';
import { TFetchDataArgs, TFetchResponse } from './useFetch.types';
import { config } from '../../aws_config';

const BASE_URL = config.API_URL;

export function useFetchData<T>() {
  const [state, setState] = useState<TFetchResponse<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async ({ url, method = 'GET', body = null }: TFetchDataArgs): Promise<T | undefined> => {
      console.log('fetchData called');

      try {
        // Cancel any ongoing request before making a new one
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create a new AbortController for this request
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;

        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        const completeUrl = BASE_URL + url;
        const token = sessionStorage.getItem('idToken');

        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };

        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }

        const requestOptions: RequestInit = {
          method,
          headers,
          body: body ? JSON.stringify(body) : null,
          signal, // Attach signal for aborting request
        };

        const response = await fetch(completeUrl, requestOptions);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const responseData = await response.json();

        // If the request was aborted, don't update state
        if (signal.aborted) return undefined;

        setState({ data: responseData, isLoading: false, error: null });
        return responseData;
      } catch (error) {
        const errorObject = error instanceof Error ? error : new Error(String(error));

        // If the request was aborted, do not update state
        if (errorObject.name === 'AbortError') return undefined;

        setState((prev) => ({ ...prev, isLoading: false, error: errorObject }));
        throw errorObject;
      }
    },
    [] // stay the same for the lifetime of the component
  );

  return {
    ...state,
    fetchData,
  };
}
