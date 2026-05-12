type Success<T> = { data: T; error: null };
type Failure<E> = { data: null; error: E };
type Result<T, E = unknown> = Success<T> | Failure<E>;

// biome-ignore lint/suspicious/noExplicitAny: needed for constructor inference
type Constructor<E> = abstract new (...args: any[]) => E;

export async function tryCatch<T, E = unknown>(
  fn: () => Promise<T>,
  _errorType?: Constructor<E>,
): Promise<Result<T, E>> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}
