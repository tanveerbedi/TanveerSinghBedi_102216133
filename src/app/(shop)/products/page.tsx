'use client';
import { Suspense } from 'react';
import { CategoryTabs } from '@/components/CategoryTabs';
import { SectionGrid } from '@/components/SectionGrid';
import { SearchResults } from '@/components/SearchResults';
import { useSearchParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');

  if (query) {
    return <SearchResults query={query} />;
  }

  return (
    <>
      <h1 id="top" className="text-3xl md:text-4xl font-bold mb-4">All Products</h1>
      <CategoryTabs />
      <div className="space-y-12 mt-6">
        <SectionGrid categoryKey="tables" title="Tables" anchor="tables" />
        <SectionGrid categoryKey="sofas" title="Sofas" anchor="sofas" />
        <SectionGrid categoryKey="chairs" title="Chairs" anchor="chairs" />
      </div>
    </>
  );
}

function LoadingFallback() {
  return (
    <div className="space-y-6">
       <Skeleton className="h-10 w-1/3" />
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
            </div>
        ))}
      </div>
    </div>
  )
}

export default function ProductsPage() {
  return (
    <main className="px-6 md:px-10 py-6">
      <Suspense fallback={<LoadingFallback />}>
        <ProductsPageContent />
      </Suspense>
    </main>
  );
}
