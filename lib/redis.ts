import { createClient } from 'redis';

// SECURITY: Store the Redis URL in an environment variable
const redisClient = createClient({
  url: process.env.REDIS_URL
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

export async function connectRedis() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
  return redisClient;
}

export { redisClient };

// PERFORMANCE: Implement caching strategies
// export async function cacheProduct(productId: string, productData: any) {
//   try {
//     await redisClient.set(`product:${productId}`, JSON.stringify(productData), {
//       EX: 3600 // Expire after 1 hour
//     });
//   } catch (error) {
//     console.error('Redis caching error:', error);
//     // SECURITY: Ensure error messages don't reveal sensitive information
//     throw new Error('Failed to cache product data');
//   }
// }

// PERFORMANCE: Implement cache invalidation strategies
// export async function invalidateProductCache(productId: string) {
//   try {
//     await redisClient.del(`product:${productId}`);
//   } catch (error) {
//     console.error('Redis cache invalidation error:', error);
//     throw new Error('Failed to invalidate product cache');
//   }
// }

// CUSTOMIZATION: Add methods for caching other data types
// export async function cacheUserSession(userId: string, sessionData: any) { ... }
// export async function cacheSearchResults(query: string, results: any) { ... }

// ERROR HANDLING: Implement a custom error handler for Redis operations
// function handleRedisError(error: any) {
//   // Log the error securely (avoid logging sensitive data)
//   // Implement retry logic if appropriate
//   // ...
// }

// SECURITY: Implement rate limiting
// export async function checkRateLimit(ip: string): Promise<boolean> {
//   const requests = await redisClient.incr(`ratelimit:${ip}`);
//   if (requests === 1) {
//     await redisClient.expire(`ratelimit:${ip}`, 60);
//   }
//   return requests <= 100; // Allow 100 requests per minute
// }