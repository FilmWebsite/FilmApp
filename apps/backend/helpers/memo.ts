export const memoize = <Args extends any[], R>(
  fn: (...args: Args) => Promise<R>,
  ttl = 60000
): ((...args: Args) => Promise<R>) => {
  const cache = new Map<string, { value: R; expiration: number }>();

  return async (...args: Args): Promise<R> => {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      const { value, expiration } = cache.get(key)!;
      if (now < expiration) {
        console.log(`[CACHE HIT] Returning cached data for key: ${key}`);

        return value;
      }
      // Remove expired entry
      cache.delete(key);
    }
    console.log(`[CACHE MISS] Fetching fresh data for key: ${key}`);

    const result = await fn(...args);
    cache.set(key, { value: result, expiration: now + ttl });
    return result;
  };
};
