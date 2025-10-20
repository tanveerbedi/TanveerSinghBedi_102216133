import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';

export function MiniProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.id}`} className="group block" target="_blank" rel="noopener noreferrer">
      <div className="flex items-center space-x-3 rounded-lg border bg-card p-2 text-card-foreground transition-all hover:bg-muted/50 hover:shadow-sm">
        <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={64}
            height={64}
            className="object-cover w-full h-full"
            data-ai-hint={product.imageHint}
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="truncate font-semibold text-sm">{product.name}</p>
          <p className="text-xs text-muted-foreground">{product.brand}</p>
          <p className="mt-1 font-medium text-sm">${product.price.toFixed(2)}</p>
        </div>
      </div>
    </Link>
  );
}
