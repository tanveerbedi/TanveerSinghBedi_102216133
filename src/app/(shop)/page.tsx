import { ChatRecommendations } from '@/components/chat-recommendations';
import { ProductCard } from '@/components/product-card';
import { getProducts } from '@/lib/data';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Bot, Star, Package, ThumbsUp } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CategoryShowcase } from '@/components/category-showcase';
import { TrendingCarousel } from '@/components/trending-carousel';
import { Newsletter } from '@/components/newsletter';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default async function Home() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 4);
  const trendingProducts = allProducts.filter(p => (p.tags_cv?.includes('trending') || p.tags_cv?.includes('popular'))).slice(0, 6);

  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-background');

  return (
    <>
      <section className="relative">
        {heroImage && (
            <div className="absolute inset-0">
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20" />
            </div>
        )}
        <div className="relative container mx-auto px-4 py-12 md:py-24 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-[1fr_500px]">
                <div className="flex flex-col justify-center space-y-6">
                    <div className="space-y-4 animate-fade-in-up">
                        <h1 className="text-4xl font-bold tracking-tighter text-white sm:text-5xl xl:text-6xl/none font-headline">
                            Find Your Perfect Furniture, Instantly.
                        </h1>
                        <p className="max-w-[600px] text-gray-200 md:text-xl">
                            Describe what you're looking for, and our AI will find the best matches from our collection. Let's furnish your dream space together.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="#featured-products">
                            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-black">
                                Start Exploring
                            </Button>
                        </Link>
                    </div>
                </div>
                <Card className="overflow-hidden shadow-2xl rounded-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <ChatRecommendations />
                </Card>
            </div>
        </div>
      </section>

      <CategoryShowcase />

      <section id="featured-products" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight font-headline">Featured Products</h2>
            <Link href="/products">
                <Button variant="outline">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </Link>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
            </div>
        </div>
      </section>
      
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold tracking-tight font-headline text-center mb-12">Why Choose FurniVerse?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Star className="mx-auto h-10 w-10 text-accent mb-4"/>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Recommendations</h3>
              <p className="text-muted-foreground">Get furniture tailored to your taste and space instantly.</p>
            </div>
            <div className="text-center p-6">
              <Package className="mx-auto h-10 w-10 text-accent mb-4"/>
              <h3 className="text-xl font-semibold mb-2">Fast, Secure Delivery</h3>
              <p className="text-muted-foreground">From checkout to doorstep in days, not weeks.</p>
            </div>
            <div className="text-center p-6">
              <ThumbsUp className="mx-auto h-10 w-10 text-accent mb-4"/>
              <h3 className="text-xl font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-muted-foreground">Every piece crafted to last for years to come.</p>
            </div>
          </div>
        </div>
      </section>

      {trendingProducts.length > 0 && <TrendingCarousel products={trendingProducts} />}

      <Newsletter />

      <Footer />
    </>
  );
}
