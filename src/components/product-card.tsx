'use client';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ShoppingBag } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';

interface ProductCardProps {
  product: Product;
  onFail?: () => void;
}

export function ProductCard({ product, onFail }: ProductCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();

  const handleBuyNow = () => {
    addToCart(product, 1);
    router.push('/checkout');
  };

  return (
    <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-300 hover:shadow-xl rounded-lg">
      <Link href={`/products/${product.id}`} className="group block">
        <CardHeader className="p-0">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={600}
              height={450}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={product.imageHint}
              onError={onFail}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Badge variant="secondary" className="mb-2">{product.category}</Badge>
          <h3 className="font-semibold text-lg leading-tight truncate font-headline">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.brand}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex flex-col items-start space-y-4">
        <p className="font-semibold text-lg w-full">${product.price.toFixed(2)}</p>
        <div className="w-full grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" onClick={() => addToCart(product, 1)}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
          <Button size="sm" className="btn-cta" onClick={handleBuyNow}>
            <ShoppingBag className="mr-2 h-4 w-4" />
            Buy Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
