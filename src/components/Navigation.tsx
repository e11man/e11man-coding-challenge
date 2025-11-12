import React from 'react';
import { Home, LayoutDashboard, Shield, Calendar } from 'lucide-react';

interface NavigationProps {
  currentPage: 'home' | 'conference' | 'dashboard' | 'admin';
  onNavigate: (page: string) => void;
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Conferences', icon: Calendar },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'admin', label: 'Admin', icon: Shield },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            <div className="p-2 bg-gray-900 rounded-lg">
              <Calendar className="size-5 text-white" />
            </div>
            <span className="text-lg text-gray-900">
              Tech Conference Explorer
            </span>
          </div>
          
          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id || 
                               (currentPage === 'conference' && item.id === 'home');
              
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className="size-4" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}