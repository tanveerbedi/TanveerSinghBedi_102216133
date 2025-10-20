'use client';
import Link from 'next/link';
import { Sofa, Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-muted/40 border-t">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Sofa className="h-8 w-8 text-primary" />
              <span className="font-bold text-lg font-headline">FurniVerse</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Furnishing your dream space with AI-powered recommendations and timeless quality.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h4 className="font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="text-muted-foreground hover:text-primary">Home</Link></li>
                <li><Link href="/products" className="text-muted-foreground hover:text-primary">All Products</Link></li>
                <li><Link href="/orders" className="text-muted-foreground hover:text-primary">My Orders</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Shipping & Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://github.com/tanveerbedi" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Github className="h-5 w-5" /></a>
                <a href="https://www.linkedin.com/in/tanveersinghbedi/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary"><Linkedin className="h-5 w-5" /></a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FurniVerse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
