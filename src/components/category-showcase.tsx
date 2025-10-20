'use client';
import Link from 'next/link';
import Image from 'next/image';
import { CATEGORY_MAP } from '@/lib/categories';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export function CategoryShowcase() {
  const categories = [
    { key: 'sofas', imageId: 'velvet-sofa' },
    { key: 'tables', imageId: 'oak-dining-table' },
    { key: 'chairs', imageId: 'minimalist-lounge-chair' },
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight font-headline text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map(({ key, imageId }) => {
            const categoryInfo = CATEGORY_MAP[key];
            const imageInfo = PlaceHolderImages.find(p => p.id === imageId);

            return (
              <Link href={`/category/${key}`} key={key} className="group">
                <Card className="relative h-80 overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
                  {imageInfo && (
                    <Image
                      src={imageInfo.imageUrl}
                      alt={categoryInfo.label}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                  <div className="relative h-full flex flex-col items-center justify-center text-white text-center p-4">
                    <h3 className="text-3xl font-bold font-headline">{categoryInfo.label}</h3>
                    <p className="mt-2 text-sm opacity-90">Explore our curated collection</p>
                    <Button variant="ghost" className="mt-4 text-white hover:bg-white/20">
                      Explore {categoryInfo.label} <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
