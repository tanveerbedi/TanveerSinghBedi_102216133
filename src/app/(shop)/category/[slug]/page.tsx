
'use client';
import { SectionGrid } from '@/components/SectionGrid';
import { CATEGORY_MAP, CategoryKey } from '@/lib/categories';
import { notFound, useParams }s from 'next/navigation';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as CategoryKey;

  if (!slug || !CATEGORY_MAP[slug]) {
    notFound();
  }

  const { label, anchor } = CATEGORY_MAP[slug];

  return (
    <main className="px-6 md:px-10 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{label}</h1>
        <Link href="/products" className="text-sm text-accent hover:underline">View All</Link>
      </div>
      <div className="space-y-12 mt-6">
        <SectionGrid categoryKey={slug} title={label} anchor={anchor} />
      </div>
    </main>
  );
}
