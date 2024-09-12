import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { BarChart2, PieChart, Sliders, Home } from 'lucide-react';

const Sidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'Overview', icon: Home, path: '/overview' },
    { name: 'Analysis', icon: BarChart2, path: '/analysis' },
    { name: 'Model Results', icon: PieChart, path: '/model-results' },
    { name: 'Optimizer', icon: Sliders, path: '/optimizer' },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">Sales Maximizer</h1>
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                  router.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-white hover:bg-white-700'
                }`}>
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;