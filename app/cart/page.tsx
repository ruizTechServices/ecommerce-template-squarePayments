"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // TODO: Replace this with actual cart data fetching from your API or local storage
    // Example:
    // async function fetchCartItems() {
    //   const response = await fetch('/api/cart');
    //   const data = await response.json();
    //   setCartItems(data);
    // }
    // fetchCartItems();

    const mockCartItems: CartItem[] = [
      { id: 1, name: 'Product 1', price: 19.99, quantity: 2, image: 'https://via.placeholder.com/100x100' },
      { id: 2, name: 'Product 2', price: 29.99, quantity: 1, image: 'https://via.placeholder.com/100x100' },
    ];
    setCartItems(mockCartItems);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    // TODO: Implement actual quantity update logic
    // This should update the quantity in your database or local storage
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    // TODO: Implement actual item removal logic
    // This should remove the item from your database or local storage
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // TODO: Implement checkout functionality
  const handleCheckout = () => {
    // Integrate with your payment provider (e.g., Square) here
    console.log('Proceeding to checkout');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <Card key={item.id} className="mb-4">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row items-start sm:items-center">
                <div className="relative w-24 h-24 mb-4 sm:mb-0 sm:mr-4">
                  <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" className="rounded" />
                </div>
                <div className="flex-grow">
                  <p>Price: ${item.price.toFixed(2)}</p>
                  <div className="flex items-center mt-2">
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</Button>
                    <span className="mx-2">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="destructive" onClick={() => removeItem(item.id)}>Remove</Button>
              </CardFooter>
            </Card>
          ))}
          <div className="mt-8">
            <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
            <Button className="mt-4 w-full sm:w-auto" size="lg" onClick={handleCheckout}>Proceed to Checkout</Button>
          </div>
        </>
      )}
    </div>
  );
}