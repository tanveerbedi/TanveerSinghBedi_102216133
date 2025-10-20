'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/auth';
import { LogIn, LogOut, User, LayoutDashboard, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function UserNav() {
  const { user, logout, login, loading } = useAuth();

  if (loading) {
    return <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user ? `https://avatar.vercel.sh/${user.email}.png` : ''} alt="User avatar" />
            <AvatarFallback>{user ? user.email.charAt(0).toUpperCase() : <User className="h-5 w-5" />}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        {user ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user.isAdmin ? 'Admin' : 'Shopper'}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {user.isAdmin && (
                <Link href="/admin/dashboard">
                  <DropdownMenuItem>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => logout()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>Guest</DropdownMenuLabel>
             <DropdownMenuSeparator />
            <Link href="/login">
              <DropdownMenuItem>
                <LogIn className="mr-2 h-4 w-4" />
                <span>Admin Login</span>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => login(false)}>
              <User className="mr-2 h-4 w-4" />
              <span>Continue as Shopper</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
