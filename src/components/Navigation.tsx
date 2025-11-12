/* 
Updated this component to be in nextjs format since it was from figma
it now uses the <Link> instead of <OnClick> so its not handled in javascript 

also nextjs server components cant pass functions to client components

we also dont need to include the "use client" hanlder
*/

import React from 'react';
import Link from 'next/link';
import { Home, LayoutDashboard, Shield, Calendar } from 'lucide-react';

export function Navigation() {
  const navItems = [
    { href: '/', label: 'Conferences', icon: Calendar },
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin', label: 'Admin', icon: Shield },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 bg-gray-900 rounded-lg">
              <Calendar className="size-5 text-white" />
            </div>
            <span className="text-lg text-gray-900">
              Tech Conference Explorer
            </span>
          </Link>
          
          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                >
                  <Icon className="size-4" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
