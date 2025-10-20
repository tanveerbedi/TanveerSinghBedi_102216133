
'use client';
import { useEffect, useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { getProducts } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { Button } from '@/components/ui/button';
import { normalizeCategory, type CategoryKey } from '@/lib/categories';
import { Skeleton } from './ui/skeleton';

interface SectionGridProps {
  categoryKey: CategoryKey;
  title: string;
  anchor: string;
}

const PAGE_SIZE = 4;

export function SectionGrid({ categoryKey, title, anchor }: SectionGridProps) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const products = await getProducts();
      setAllProducts(products);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  const filteredItems = useMemo(() => {
    return allProducts.filter(p => normalizeCategory(p.category) === categoryKey);
  }, [allProducts, categoryKey]);

  const visibleItems = useMemo(() => {
    return filteredItems.slice(0, visibleCount);
  }, [filteredItems, visibleCount]);

  const hasMore = visibleCount < filteredItems.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + PAGE_SIZE);
  };
  
  if (loading) {
    return (
        <section id={anchor}>
            <div className="flex items-end justify-between mb-3">
                <h2 className="text-2xl font-semibold">{title}</h2>
            </div>
             <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                        <Skeleton className="h-64 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                ))}
            </div>
        </section>
    );
  }


  if (filteredItems.length === 0 && !loading) {
    return (
        <section id={anchor}>
             <div className="flex items-end justify-between mb-3">
                <h2 className="text-2xl font-semibold">{title}</h2>
            </div>
            <p className="text-sm text-muted-foreground">No {title.toLowerCase()} found.</p>
        </section>
    );
  }

  return (
    <section id={anchor}>
      <div className="flex items-end justify-between mb-3">
        <h2 className="text-2xl font-semibold">{title}</h2>
      </div>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleItems.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            onClick={loadMore}
          >
            Load more
          </Button>
        </div>
      )}
    </section>
  );
}
