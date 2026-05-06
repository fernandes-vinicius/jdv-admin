export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export type ApiOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

export type ApiInstance = {
  <T>(path: string, opts?: ApiOptions): Promise<T>;

  get<T>(path: string, opts?: ApiOptions): Promise<T>;
  post<T>(path: string, body?: unknown, opts?: ApiOptions): Promise<T>;
  put<T>(path: string, body?: unknown, opts?: ApiOptions): Promise<T>;
  patch<T>(path: string, body?: unknown, opts?: ApiOptions): Promise<T>;
  delete<T>(path: string, opts?: ApiOptions): Promise<T>;
};
