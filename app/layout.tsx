import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-commerce Boilerplate',
  description: 'A comprehensive e-commerce boilerplate built with Next.js and ShadCN UI',
  // CUSTOMIZATION: Add additional metadata as needed
  // keywords: 'e-commerce, online store, shopping',
  // author: 'Your Name',
  // SECURITY: Consider adding security-related metadata
  // referrer: 'strict-origin-when-cross-origin',
  // 'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
        {/* PERFORMANCE: Consider adding analytics or monitoring scripts here */}
        {/* SECURITY: Ensure any third-party scripts are loaded securely */}
      </body>
    </html>
  );
}

// PERFORMANCE: Implement caching strategies for static content
// export const revalidate = 3600; // Revalidate every hour

// CUSTOMIZATION: Add custom error handling for the root layout
// export function ErrorBoundary({ error }: { error: Error }) {
//   return (
//     <div>
//       <h1>Something went wrong</h1>
//       <p>{error.message}</p>
//     </div>
//   );
// }