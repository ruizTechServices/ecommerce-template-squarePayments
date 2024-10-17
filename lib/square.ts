import { Client, Environment } from 'square';

// SECURITY: Store the Square access token in an environment variable
const squareClient = new Client({
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
  environment: Environment.Sandbox, // TODO: Change to Environment.Production for live transactions
});

export { squareClient };

// SECURITY: Implement proper error handling and logging
// PERFORMANCE: Consider implementing caching for frequently accessed data
// Example:
// export async function createPayment(amount: number, sourceId: string) {
//   try {
//     const response = await squareClient.paymentsApi.createPayment({
//       sourceId: sourceId,
//       amountMoney: {
//         amount: amount,
//         currency: 'USD'
//       },
//       // SECURITY: Generate a unique key for each request to prevent duplicate transactions
//       idempotencyKey: generateUniqueKey()
//     });
//     return response.result;
//   } catch (error) {
//     console.error('Error creating payment:', error);
//     // SECURITY: Ensure error messages don't reveal sensitive information
//     throw new Error('Payment processing failed');
//   }
// }

// CUSTOMIZATION: Add methods for other Square API operations
// export async function fetchInventory() { ... }
// export async function createRefund(paymentId: string, amount: number) { ... }

// SECURITY: Implement input validation
// function validatePaymentInput(amount: number, sourceId: string) {
//   if (typeof amount !== 'number' || amount <= 0) {
//     throw new Error('Invalid payment amount');
//   }
//   if (typeof sourceId !== 'string' || sourceId.length === 0) {
//     throw new Error('Invalid payment source');
//   }
// }

// SECURITY: Generate a unique idempotency key
// function generateUniqueKey(): string {
//   return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
// }

// ERROR HANDLING: Implement a custom error handler for Square API errors
// function handleSquareError(error: any) {
//   // Log the error securely (avoid logging sensitive data)
//   // Categorize and handle different types of errors
//   // ...
// }

// SECURITY: Implement webhook handling for Square events
// export async function handleSquareWebhook(payload: any) {
//   // Verify webhook signature
//   // Process different event types
//   // Update local database or trigger relevant actions
//   // ...
// }