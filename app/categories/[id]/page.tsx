import { Metadata } from 'next';
import ProductGrid from '@/components/ProductGrid';

interface Category {
  id: number;
  name: string;
  description: string;
}

// TODO: Replace this mock data with actual data fetching from your API
const mockCategories: Category[] = [
  { id: 1, name: 'Electronics', description: 'Gadgets and devices for your tech needs' },
  { id: 2, name: 'Clothing', description: 'Fashionable apparel for all occasions' },
  { id: 3, name: 'Home & Garden', description: 'Everything you need for your living space' },
  { id: 4, name: 'Books', description: 'A wide selection of literature and educational materials' },
];

export async function generateStaticParams() {
  // TODO: Fetch this data from your API
  // Example:
  // const categories = await fetchCategories();
  // return categories.map((category) => ({
  //   id: category.id.toString(),
  // }));

  return mockCategories.map((category) => ({
    id: category.id.toString(),
  }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  // TODO: Fetch the category data from your API
  // Example:
  // const category = await fetchCategory(params.id);

  const category = mockCategories.find(cat => cat.id === Number(params.id));
  return {
    title: category ? `${category.name} | E-commerce Store` : 'Category Not Found',
    description: category?.description || 'Category not found',
  };
}

export default function CategoryDetailPage({ params }: { params: { id: string } }) {
  // TODO: Fetch the category and its products from your API
  // Example:
  // const category = await fetchCategory(params.id);
  // const products = await fetchProductsByCategory(params.id);

  const category = mockCategories.find(cat => cat.id === Number(params.id));

  if (!category) {
    return <div className="max-w-4xl mx-auto px-4">Category not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-4">{category.name}</h1>
      <p className="text-lg sm:text-xl mb-8">{category.description}</p>
      <h2 className="text-2xl font-semibold mb-4">Products in this category</h2>
      <ProductGrid />
    </div>
  );
}