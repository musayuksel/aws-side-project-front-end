// import { useState, useEffect } from 'react';
// import { FetchResponseTypes } from './useFetch.types';

// const BASE_URL = "https://myapi.execute-api.eu-west-1.amazonaws.com/prod"

// export const useFetch = <T>(url: string): FetchResponseTypes<T> => {
//     const token = sessionStorage.getItem('idToken')

//     const [response, setResponse] = useState<FetchResponseTypes<T>>({
//         data: null,
//         error: null,
//         isLoading: false,
//     });

//     const completeUrl = BASE_URL + url;

//     console.log(completeUrl, `>>>>>>>>>>>completeUrl`);
//     console.log(token, `>>>>>>>>>>>token`);

//     useEffect(() => {
//         const fetchData = async () => {
//             setResponse(prevState => ({ ...prevState, isLoading: true }));

//             try {
//                 const headers = {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                   };

//                 const requestOptions:RequestInit = {
//                     method: 'GET',
//                     headers: headers,
//                 };

//                 const res = await fetch(completeUrl, requestOptions);
//                 if (!res.ok) {
//                     throw new Error('Network response was not ok');
//                 }

//                 const { success, data, message }= await res.json();
//                 if (!success) {
//                     throw new Error(message);
//                 }

//                 setResponse({ data, error: null, isLoading: false });

//             } catch (error:any) {
//                 setResponse({ data: null, error, isLoading: false });
//             }
//         };

//         fetchData();
//     }, [url]);

//     return response;
// }

// export default useFetch;

import { useState, useEffect, useRef } from 'react';
import { FetchResponseTypes } from './useFetch.types';

const BASE_URL = 'https://myapi.execute-api.eu-west-1.amazonaws.com/prod';

export const useFetch = <T>(url: string): FetchResponseTypes<T> => {
  const token = sessionStorage.getItem('idToken');
  const completeUrl = BASE_URL + url;

  console.log(completeUrl, `>>>>>>>>>>>completeUrl`);
  console.log(token, `>>>>>>>>>>>token`);

  const [response, setResponse] = useState<FetchResponseTypes<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  // Store the AbortController in a ref to maintain it across renders
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    // Create a new AbortController for this request
    abortControllerRef.current = new AbortController();
    const signal = abortControllerRef.current.signal;

    const fetchData = async () => {
      setResponse((prevState) => ({ ...prevState, isLoading: true }));

      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        };

        const requestOptions: RequestInit = {
          method: 'GET',
          headers,
          signal, // Add abort signal to the request
        };

        const res = await fetch(completeUrl, requestOptions);

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        // Simply parse the JSON response as T
        const data = (await res.json()) as T;
        setResponse({ data, error: null, isLoading: false });
      } catch (error) {
        // Don't update state if the request was aborted
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }

        setResponse({
          data: null,
          error: error instanceof Error ? error : new Error(String(error)),
          isLoading: false,
        });
      }
    };

    fetchData();

    // Cleanup function to abort fetch if component unmounts or dependencies change
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url, token, completeUrl]); // Include all dependencies

  return response;
};

export default useFetch;
