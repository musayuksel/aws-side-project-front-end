export type TFetchResponse<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
};

export type TFetchDataArgs = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  signal?: AbortSignal | null;
};
