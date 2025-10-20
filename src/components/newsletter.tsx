'use client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    // In a real app, you would save this to Firestore.
    // addDoc(collection(db, 'subscribers'), { email, createdAt: serverTimestamp() });
    
    console.log('Newsletter subscription for:', email);
    toast({
      title: 'Subscribed!',
      description: "You're on the list for deals and design inspiration.",
    });
    setEmail('');
  };

  return (
    <section className="py-16 md:py-24 bg-accent/10">
      <div className="container mx-auto px-4 text-center max-w-2xl">
        <Mail className="mx-auto h-10 w-10 text-accent mb-4" />
        <h2 className="text-3xl font-bold tracking-tight font-headline">Join Our Community</h2>
        <p className="text-muted-foreground mt-2 mb-6">
          Be the first to know about new arrivals, exclusive deals, and design inspiration.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-background"
          />
          <Button type="submit" className="btn-cta">Subscribe</Button>
        </form>
      </div>
    </section>
  );
}
