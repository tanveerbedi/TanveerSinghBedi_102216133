'use client';
import { getProductById, getProductsByIds } from '@/lib/data';
import { notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/product-card';
import { CheckCircle2, ShoppingCart, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

type Props = {
  params: { id: string };
};

export default function ProductDetailPage({ params }: Props) {
  const [product, setProduct] = useState<Product | null>(null);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const p = await getProductById(params.id);
      if (!p) {
        notFound();
      }
      setProduct(p);

      if (p.similar_ids && p.similar_ids.length > 0) {
        const sp = await getProductsByIds(p.similar_ids);
        setSimilarProducts(sp);
      }
    };
    fetchProduct();
  }, [params.id]);

  if (!product) {
    return <div>Loading...</div>; // Or a skeleton loader
  }

  const handleBuyNow = () => {
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <Card className="overflow-hidden shadow-lg">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                data-ai-hint={product.imageHint}
                priority
              />
            </div>
          </Card>
        </div>
        <div className="flex flex-col space-y-6">
          <div>
            <Badge variant="secondary">{product.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight mt-2 font-headline">{product.name}</h1>
            <p className="text-lg text-muted-foreground">{product.brand}</p>
          </div>
          <p className="text-4xl font-bold">${product.price.toFixed(2)}</p>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="lg" className="flex-1" onClick={() => addToCart(product, 1)}>
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button size="lg" className="flex-1 btn-cta" onClick={handleBuyNow}>
              <ShoppingBag className="mr-2 h-4 w-4" /> Buy Now
            </Button>
          </div>

          <Separator />

          <div>
            <h2 className="text-xl font-semibold mb-3 font-headline">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-3 font-headline">Features</h2>
            <ul className="space-y-2 text-muted-foreground">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {product.tags_cv && product.tags_cv.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 font-headline">Image Tags</h2>
              <div className="flex flex-wrap gap-2">
                {product.tags_cv.map((tag) => (
                  <Badge key={tag} variant="outline">{tag}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {similarProducts.length > 0 && (
        <section className="mt-24">
          <h2 className="text-3xl font-bold tracking-tight mb-8 font-headline">You Might Also Like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similarProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
