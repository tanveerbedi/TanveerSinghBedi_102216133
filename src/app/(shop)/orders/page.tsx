
'use client';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { PackageOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// This is mock data. In a real app, this would come from Firestore.
const mockOrders = [
  {
    id: 'ORD-001',
    date: '2023-10-26',
    status: 'Completed',
    total: 1498.98,
    items: [
      { id: 'velvet-sofa', name: 'LUXE Velvet Sofa', quantity: 1, price: 1299.99, imageUrl: 'https://images.unsplash.com/photo-1689414126346-b21dfbc308de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxncmVlbiUyMHNvZmF8ZW58MHx8fHwxNzYwODEwMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { id: 'wicker-pendant-light', name: 'BOHO Pendant Light', quantity: 1, price: 180.00, imageUrl: 'https://images.unsplash.com/photo-1630833945339-af5c140a2fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cGVuZGFudCUyMGxpZ2h0fGVufDB8fHx8MTc2MDgxMDA3OXww&ixlib=rb-4.1.0&q=80&w=1080' },
    ]
  },
  {
    id: 'ORD-002',
    date: '2023-09-15',
    status: 'Processing',
    total: 499.99,
    items: [
      { id: 'minimalist-lounge-chair', name: 'AURA Lounge Chair', quantity: 1, price: 499.99, imageUrl: 'https://images.unsplash.com/photo-1686223679871-8d6ae19ec3fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxsb3VuZ2UlMjBjaGFpcnxlbnwwfHx8fDE3NjA4MTAwNzh8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    ]
  },
];


export default function OrdersPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState(mockOrders);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  // In a real app, you would fetch orders from Firestore here
  // based on the user's ID.

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return (
        <div className="container mx-auto py-12 px-4 text-center">
            <PackageOpen className="mx-auto h-16 w-16 text-muted-foreground" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight font-headline">No Orders Yet</h1>
            <p className="mt-2 text-muted-foreground">You haven't placed any orders with us yet. Let's change that!</p>
            <Link href="/products">
                <Button className="mt-6 btn-cta">Start Shopping</Button>
            </Link>
        </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">Your Orders</h1>
      <div className="space-y-8">
        {orders.map(order => (
          <Card key={order.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{order.id}</CardTitle>
                <CardDescription>Date: {new Date(order.date).toLocaleDateString()}</CardDescription>
              </div>
              <Badge variant={order.status === 'Completed' ? 'default' : 'secondary'}>{order.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.items.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="relative h-16 w-16 rounded-md border overflow-hidden">
                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover"/>
                        </div>
                        <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-end font-bold text-lg">
                <span>Total: ${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
