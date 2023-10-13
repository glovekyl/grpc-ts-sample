export async function errorHandler(err: unknown): Promise<void> {
  if (!(err instanceof Error)) {
    throw new Error(`Unknown error: ${err.toString()}`);
  }
  console.error(err.message);
}