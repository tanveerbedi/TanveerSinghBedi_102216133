'use client';

import { useState, useRef, useEffect } from 'react';
import { SendHorizonal, Bot, User, Loader2, Frown, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { Product } from '@/lib/types';
import { getRecommendedProducts } from '@/app/actions';
import { Separator } from './ui/separator';
import { MiniProductCard } from './mini-product-card';

type Message = {
  role: 'user' | 'bot';
  content: React.ReactNode;
};

const initialMessage: Message = {
    role: 'bot',
    content: "Hello! How can I help you find the perfect furniture today? Feel free to describe what you're looking for."
}

export function ChatRecommendations() {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const recommendedProducts: Product[] = await getRecommendedProducts(currentInput);

      let botContent;
      if (recommendedProducts.length > 0) {
        botContent = (
          <div className="space-y-3">
            <p>Based on your request, I found these products for you:</p>
            <div className="grid grid-cols-1 gap-2">
              {recommendedProducts.map((product) => (
                <MiniProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      } else {
        botContent = (
          <div className="flex items-center space-x-2">
            <Frown className="h-5 w-5 text-muted-foreground" />
            <p>Sorry, I couldn't find any products matching that. Please try being more specific or use different terms.</p>
          </div>
        );
      }
      
      const botMessage: Message = { role: 'bot', content: botContent };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      const errorMessage: Message = { role: 'bot', content: 'There was an error getting recommendations. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-card text-card-foreground">
      <div className="p-4 border-b flex items-center gap-2">
        <Sparkles className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-semibold">AI Assistant</h2>
      </div>
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-3 text-sm ${message.role === 'user' ? 'justify-end' : ''}`}>
              {message.role === 'bot' && <div className="p-1.5 rounded-full bg-primary/10 text-primary flex-shrink-0"><Bot className="h-5 w-5" /></div>}
              <div className={`rounded-lg p-3 max-w-xs md:max-w-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {message.content}
              </div>
              {message.role === 'user' && <div className="p-1.5 rounded-full bg-muted flex-shrink-0"><User className="h-5 w-5" /></div>}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded-full bg-primary/10 text-primary flex-shrink-0"><Bot className="h-5 w-5" /></div>
              <div className="rounded-lg p-3 bg-muted flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Finding products...</span>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <Separator />
      <div className="p-2 sm:p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe furniture..."
            disabled={isLoading}
            className="text-sm"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <SendHorizonal className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
