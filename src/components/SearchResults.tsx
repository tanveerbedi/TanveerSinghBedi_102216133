'use client';

import { useEffect, useState } from 'react';
import { searchProducts } from '@/lib/data';
import type { Product } from '@/lib/types';
import { ProductCard } from './product-card';
import { Skeleton } from './ui/skeleton';

export function SearchResults({ query }: { query: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      const results = await searchProducts(query);
      setProducts(results);
      setLoading(false);
    };
    performSearch();
  }, [query]);

  if (loading) {
    return (
      <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Searching for &quot;{query}&quot;...</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
          {Array.from({ length: 4 }).map((_, i) => (
             <div key={i} className="space-y-2">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {products.length > 0 ? `Results for "${query}"` : `No results for "${query}"`}
        </h1>
        <p className="text-muted-foreground mb-6">
            Found {products.length} matching products.
        </p>

        {products.length > 0 && (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        )}
    </div>
  );
}
