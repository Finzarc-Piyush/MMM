import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BarChart2, PieChart, Sliders, Home, LogOut } from 'lucide-react';

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'Overview', icon: Home, path: '/overview' },
    { name: 'Analysis', icon: BarChart2, path: '/analysis' },
    { name: 'Model Results', icon: PieChart, path: '/model-results' },
    { name: 'Optimizer', icon: Sliders, path: '/optimizer' },
  ];

  return (
    <div className="bg-gray-900 text-gray-300 w-64 min-h-screen p-6 flex flex-col">
      <div className="flex items-center mb-8">
        <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center mr-3">
          <p className="text-lg text-white font-bold">M</p>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Marico</h1>
          <p className="text-sm text-gray-400">Brand Optix</p>
        </div>
      </div>
      <nav className="flex-grow">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                  router.pathname === item.path
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}>
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto pt-6 border-t border-gray-700">
        <Link href="/logout"
          className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;