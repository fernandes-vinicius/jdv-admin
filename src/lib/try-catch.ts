type Success<T> = { data: T; error: null };
type Failure<E> = { data: null; error: E };
type Result<T, E = unknown> = Success<T> | Failure<E>;

// biome-ignore lint/suspicious/noExplicitAny: needed for constructor inference
type Constructor<E> = abstract new (...args: any[]) => E;

// Next.js redirect() and notFound() throw special errors with a digest property.
// They must propagate freely so the framework can perform the navigation.
function isNextInternalError(error: unknown): boolean {
  return (
    error != null &&
    typeof error === "object" &&
    "digest" in error &&
    typeof (error as { digest: unknown }).digest === "string" &&
    /^NEXT_(REDIRECT|NOT_FOUND)/.test((error as { digest: string }).digest)
  );
}

export async function tryCatch<T, E = unknown>(
  fn: () => Promise<T>,
  _errorType?: Constructor<E>,
): Promise<Result<T, E>> {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (error) {
    if (isNextInternalError(error)) throw error;
    return { data: null, error: error as E };
  }
}
