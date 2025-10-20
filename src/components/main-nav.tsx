'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Sofa, ShoppingCart } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/hooks/use-cart';
import { SearchBar } from './search-bar';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { itemCount } = useCart();

  const routes = [
    {
      href: `/`,
      label: 'Home',
      active: pathname === `/`,
    },
    {
      href: `/products`,
      label: 'All Products',
      active: pathname.startsWith(`/products`),
    },
    {
        href: `/orders`,
        label: 'Orders',
        active: pathname.startsWith(`/orders`),
      },
  ];
  
  if (user?.isAdmin) {
    routes.push({
      href: '/admin/dashboard',
      label: 'Admin',
      active: pathname.startsWith('/admin'),
    });
  }


  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link href="/" className="flex items-center space-x-2 mr-6">
        <Sofa className="h-8 w-8" />
        <span className="font-bold inline-block font-headline text-lg">FurniVerse</span>
      </Link>
      <div className="hidden md:flex items-center space-x-4 lg:space-x-6 flex-1">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-primary',
              route.active
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <SearchBar />
        <Link href="/cart" className="relative text-muted-foreground hover:text-primary transition-colors p-2">
            <ShoppingCart className="h-5 w-5" />
            {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-accent-foreground text-xs font-bold">
                    {itemCount}
                </span>
            )}
             <span className="sr-only">View Cart</span>
        </Link>
      </div>
    </nav>
  );
}
