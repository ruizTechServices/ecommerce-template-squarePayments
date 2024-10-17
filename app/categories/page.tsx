"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // TODO: Replace this with actual category data fetching from your API
    // Example:
    // async function fetchCategories() {
    //   const response = await fetch('/api/categories');
    //   const data = await response.json();
    //   setCategories(data);
    // }
    // fetchCategories();

    const mockCategories: Category[] = [
      { id: 1, name: 'Electronics', description: 'Gadgets and devices for your tech needs' },
      { id: 2, name: 'Clothing', description: 'Fashionable apparel for all occasions' },
      { id: 3, name: 'Home & Garden', description: 'Everything you need for your living space' },
      { id: 4, name: 'Books', description: 'A wide selection of literature and educational materials' },
    ];
    setCategories(mockCategories);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Product Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link href={`/categories/${category.id}`} key={category.id}>
            <Card className="hover:shadow-lg transition-shadow duration-300 h-full">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">{category.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}