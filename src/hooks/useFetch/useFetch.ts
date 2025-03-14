import { useState, useEffect } from 'react';
import { FetchResponseTypes } from './useFetch.types';



export const useFetch = <T>(url: string): FetchResponseTypes<T> => {
    const [response, setResponse] = useState<FetchResponseTypes<T>>({
        data: null,
        error: null,
        isLoading: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            setResponse(prevState => ({ ...prevState, isLoading: true }));
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }

                const result: T = await res.json();
                setResponse({ data: result, error: null, isLoading: false });

            } catch (error) {
                setResponse({ data: null, error, isLoading: false });
            }
        };

        fetchData();
    }, [url]);

    return response;
}

export default useFetch;
