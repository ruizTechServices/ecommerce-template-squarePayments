"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
// import { supabase } from '@/lib/supabase';

// CUSTOMIZATION: Define the Product interface based on your data model
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// TODO: Replace this with actual data fetching from your API
const mockProducts: Product[] = [
  { id: 1, name: 'Product 1', price: 19.99, image: 'https://via.placeholder.com/300x200' },
  { id: 2, name: 'Product 2', price: 29.99, image: 'https://via.placeholder.com/300x200' },
  { id: 3, name: 'Product 3', price: 39.99, image: 'https://via.placeholder.com/300x200' },
  { id: 4, name: 'Product 4', price: 49.99, image: 'https://via.placeholder.com/300x200' },
];

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      // TODO: Implement actual data fetching
      // SECURITY: Ensure proper authentication for data fetching
      // PERFORMANCE: Implement caching and pagination for large datasets
      try {
        // Example with Supabase:
        // const { data, error } = await supabase.from('products').select('*');
        // if (error) throw error;
        // setProducts(data);

        // Mock data fetch
        setProducts(mockProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // CUSTOMIZATION: Implement add to cart functionality
  const addToCart = async (productId: number) => {
    // TODO: Implement actual add to cart logic
    // This should add the product to the cart in your database or local storage
    console.log(`Adding product ${productId} to cart`);
    // SECURITY: Ensure proper authentication and authorization
    // PERFORMANCE: Optimize for quick updates and feedback
  };

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="flex flex-col">
          <CardHeader className="p-0">
            <div className="relative w-full pt-[66.67%]">
              <Image 
                src={product.image} 
                alt={product.name} 
                layout="fill" 
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <p className="text-lg font-semibold mt-2">${product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/products/${product.id}`} className="w-full mr-2">
              <Button variant="outline" className="w-full">View Details</Button>
            </Link>
            <Button className="w-full ml-2" onClick={() => addToCart(product.id)}>Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

// PERFORMANCE: Implement lazy loading or infinite scrolling for large product lists
// const ProductGridWithInfiniteScroll = () => {
//   // Implement infinite scrolling logic
//   // ...
// };

// ERROR HANDLING: Implement error boundary for the ProductGrid component
// class ProductGridErrorBoundary extends React.Component {
//   // Implement error boundary logic
//   // ...
// }

// SECURITY: Implement input sanitization for product data
// function sanitizeProductData(product: any): Product {
//   // Implement sanitization logic
//   // ...
// }