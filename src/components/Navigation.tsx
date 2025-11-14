/* 
Updated this component to be in nextjs format since it was from figma
it now uses the <Link> instead of <OnClick> so its not handled in javascript 

also nextjs server components cant pass functions to client components

we also dont need to include the "use client" hanlder
*/
'use client';
import Link from 'next/link';
import { LayoutDashboard, Shield, Calendar } from 'lucide-react';

import { NavBar } from '@/components/ui/tubelight-navbar';

const navItems = [
  { name: 'Conferences', url: '/', icon: Calendar },
  { name: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { name: 'Admin', url: '/admin', icon: Shield },
];

export function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <Link href="/" className="flex items-center gap-3">
           
          </Link>

          <NavBar items={navItems} />
    </nav>
  );
}