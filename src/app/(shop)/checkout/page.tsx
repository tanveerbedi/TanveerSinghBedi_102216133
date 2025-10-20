
'use client';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function CheckoutPage() {
  const { cart, totalPrice, itemCount, clearCart } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !user) {
      // In a real app, you might redirect to a login/signup page
      // For this demo, we'll allow anonymous checkout but show a toast
      toast({
        title: 'Checkout as Guest',
        description: 'You are checking out as a guest. To save your order history, please create an account.',
      });
    }
    if (itemCount === 0) {
        router.replace('/cart');
    }
  }, [user, loading, router, toast, itemCount]);

  const handlePayment = () => {
    // This is where you would integrate with Stripe or Razorpay
    // For this demo, we will simulate a successful payment.
    console.log('Processing payment of', totalPrice.toFixed(2));
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: 'Payment Successful!',
        description: 'Your order has been placed.',
      });
      
      // In a real app, you would save the order to Firestore here.
      // e.g. createOrder({ userId: user?.id, items: cart, total: totalPrice })
      
      clearCart();
      router.push('/orders');
    }, 2000);
  };
  
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="you@example.com" defaultValue={user?.email} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" />
              </div>
            </CardContent>
          </Card>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>This is a simulated payment form.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="**** **** **** 1234" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM / YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-12 rounded-md border overflow-hidden">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full btn-cta" onClick={handlePayment}>
                Pay ${totalPrice.toFixed(2)}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
