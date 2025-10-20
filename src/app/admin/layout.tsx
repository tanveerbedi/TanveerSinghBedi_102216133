'use client';
import { useAuth } from '@/lib/auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  BarChart3,
  Package,
  FileUp,
  Loader2,
  Sofa,
  Menu,
} from 'lucide-react';
import { UserNav } from '@/components/user-nav';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (user === null || !user.isAdmin)) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || !user.isAdmin) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <MobileAdminSidebar />
          <div className="ml-auto flex items-center gap-2">
            <UserNav />
          </div>
        </header>
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-8 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}

function AdminSidebarLinks({ className }: { className?: string}) {
    const pathname = usePathname();
    const navItems = [
      { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
      { href: '/admin/products', label: 'Products', icon: Package },
      { href: '/admin/import', label: 'Import', icon: FileUp },
    ];
  
    return (
        <nav className={cn("grid items-start px-2 text-sm font-medium lg:px-4", className)}>
            {navItems.map((item) => (
                <Link
                key={item.href}
                href={item.href}
                className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                    pathname === item.href && "bg-muted text-primary"
                )}
                >
                <item.icon className="h-4 w-4" />
                {item.label}
                </Link>
            ))}
        </nav>
    );
}

function AdminSidebar() {
  return (
    <aside className="hidden w-64 border-r bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Sofa className="h-6 w-6" />
            <span className="">FurniVerse</span>
          </Link>
        </div>
        <div className="flex-1">
            <AdminSidebarLinks />
        </div>
      </div>
    </aside>
  );
}

function MobileAdminSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
                >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <div className="flex h-14 items-center border-b px-4 lg:px-6 mb-4">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Sofa className="h-6 w-6" />
                        <span className="">FurniVerse</span>
                    </Link>
                </div>
                <AdminSidebarLinks className="!px-0" />
            </SheetContent>
        </Sheet>
    )
}
