import ProductGrid from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Store</h1>
      <ProductGrid />
      <div className="mt-12 text-center">
        <Link href="/products">
          <Button size="lg">View All Products</Button>
        </Link>
      </div>
    </div>
  );
}