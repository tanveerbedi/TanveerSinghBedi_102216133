'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const isMobile = useIsMobile();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '/' && !isModalOpen) {
        event.preventDefault();
        if (isMobile) {
          setIsModalOpen(true);
        } else {
          inputRef.current?.focus();
        }
      }
      if (event.key === 'Escape') {
        setQuery('');
        inputRef.current?.blur();
        if (isModalOpen) {
          setIsModalOpen(false);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobile, isModalOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/products?query=${encodeURIComponent(query)}`);
    if (isModalOpen) {
      setIsModalOpen(false);
    }
  };

  if (isMobile) {
    return (
      <>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9"
          onClick={() => setIsModalOpen(true)}
          aria-label="Open search"
        >
          <Search className="h-5 w-5" />
        </Button>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="top-1/4">
             <DialogHeader>
              <DialogTitle className="sr-only">Search Products</DialogTitle>
             </DialogHeader>
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for products..."
                className="text-base"
                autoFocus
              />
              <Button type="submit" size="icon" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <form
      onSubmit={handleSearch}
      role="search"
      aria-label="Search products"
      className="relative"
    >
      <div className="relative flex items-center text-muted-foreground">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
        <Input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className={cn(
            'h-9 w-28 rounded-full border-black/10 bg-background/70 pl-9 text-sm shadow-sm transition-all duration-300 ease-in-out',
            'hover:w-64 hover:bg-background/90 focus:w-64 focus:bg-background/90 focus:outline-none focus:ring-1 focus:ring-ring'
          )}
        />
      </div>
    </form>
  );
}
