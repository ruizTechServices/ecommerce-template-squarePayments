import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { supabase } from '@/lib/supabase';

// SECURITY: Ensure all sensitive information is stored in environment variables
export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // SECURITY: Implement proper input validation and sanitization
        // PERFORMANCE: Consider implementing rate limiting for login attempts
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: credentials.email,
            password: credentials.password,
          });

          if (error) {
            console.error('Supabase auth error:', error);
            // SECURITY: Don't reveal specific authentication errors to the client
            return null;
          }

          return data.user;
        } catch (error) {
          console.error('Authentication error:', error);
          // SECURITY: Log errors securely, avoiding sensitive information
          return null;
        }
      }
    })
    // CUSTOMIZATION: Add more authentication providers here if needed
    // Example:
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // }),
  ],
  callbacks: {
    // SECURITY: Customize token creation and session handling
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // CUSTOMIZATION: Add any additional user data to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        // CUSTOMIZATION: Add any additional user data to the session
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    // CUSTOMIZATION: Add custom pages for other auth flows
    // signOut: '/auth/signout',
    // error: '/auth/error',
  },
  // SECURITY: Configure additional NextAuth options
  // secret: process.env.NEXTAUTH_SECRET, // Set this for production
  // session: {
  //   strategy: 'jwt',
  //   maxAge: 30 * 24 * 60 * 60, // 30 days
  //   updateAge: 24 * 60 * 60, // 24 hours
  // },
  // SECURITY: Implement proper CORS settings
  // cors: {
  //   origin: process.env.NEXTAUTH_URL,
  //   allowCredentials: true,
  // },
});

// ERROR HANDLING: Implement global error handler for authentication
// function handleAuthError(error: any) {
//   // Log the error securely
//   // Implement appropriate error responses
//   // ...
// }

// SECURITY: Implement functions for secure password hashing and verification
// async function hashPassword(password: string): Promise<string> {
//   // Use a secure hashing algorithm (e.g., bcrypt)
//   // ...
// }

// async function verifyPassword(hashedPassword: string, inputPassword: string): Promise<boolean> {
//   // Securely compare hashed password with input
//   // ...
// }