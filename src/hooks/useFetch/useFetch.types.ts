export type FetchResponseTypes<T> = {
  data: T | null;
  error: any;
  isLoading: boolean;
};
