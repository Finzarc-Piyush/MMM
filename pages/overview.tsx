import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, ShoppingCart, Search, TrendingUp, TrendingDown, Filter } from 'lucide-react';

const Dashboard: React.FC = () => {
  // Sample data for the line chart
  const chartData = [
    { date: '2023-01-01', sales: 4000, wtd: 2400 },
    { date: '2023-02-01', sales: 3000, wtd: 1398 },
    { date: '2023-03-01', sales: 2000, wtd: 9800 },
    { date: '2023-04-01', sales: 2780, wtd: 3908 },
    { date: '2023-05-01', sales: 1890, wtd: 4800 },
    { date: '2023-06-01', sales: 2390, wtd: 3800 },
    { date: '2023-07-01', sales: 3490, wtd: 4300 },
  ];

  // Update kpiData to include icon and graph data
  const kpiData = [
    { title: 'Total sales', value: '$28,407', change: '+4.3%', trend: 'up', icon: DollarSign, graphData: [2, 3, 4, 3, 5, 4, 6] },
    { title: 'Online sessions', value: '54,778', change: '+2.7%', trend: 'up', icon: Users, graphData: [3, 4, 3, 5, 4, 5, 6] },
    { title: 'Average order value', value: '$28.92', change: '-0.5%', trend: 'down', icon: ShoppingCart, graphData: [6, 5, 4, 5, 3, 4, 3] },
  ];

  // Sample data for events table
  const eventsData = [
    { event: 'New Product Launch', description: 'Successful launch of Product X', verdict: 'positive' },
    { event: 'Marketing Campaign', description: 'Q2 social media campaign results', verdict: 'negative' },
    { event: 'Customer Feedback', description: 'Positive reviews for Service Y', verdict: 'positive' },
  ];

  // Sample data for optimizer recommendations
  const optimizerData = [
    { recommendation: 'Increase ad spend on Platform A', impact: 'High' },
    { recommendation: 'Optimize product pricing for Category B', impact: 'Medium' },
    { recommendation: 'Improve customer onboarding process', impact: 'High' },
  ];

  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [selectedGeography, setSelectedGeography] = useState<string>('All');
  const [selectedPackRange, setSelectedPackRange] = useState<string>('All');

  const brands = ['All', 'Saffola', 'Nihar Shanti', 'Livon'];
  const geographies = ['All', 'North', 'South', 'East', 'West'];
  const packRanges = ['All', '0-25 ml', '25-50 ml'];

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="w-64 bg-indigo-900 text-white">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto py-4 px-6 sm:px-8 lg:px-10">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-indigo-900">Executive Summary</h1>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full bg-white/50 border border-indigo-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400" size={18} />
              </div>
            </div>
            <div className="flex space-x-4 items-center">
              <Filter size={20} className="text-indigo-600" />
              <select
                className="w-[180px] p-2 rounded-md border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="" disabled>Select Brand</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <select
                className="w-[180px] p-2 rounded-md border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedGeography}
                onChange={(e) => setSelectedGeography(e.target.value)}
              >
                <option value="" disabled>Select Geography</option>
                {geographies.map((geo) => (
                  <option key={geo} value={geo}>{geo}</option>
                ))}
              </select>
              <select
                className="w-[180px] p-2 rounded-md border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedPackRange}
                onChange={(e) => setSelectedPackRange(e.target.value)}
              >
                <option value="" disabled>Select Pack Range</option>
                {packRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-6 sm:px-8 lg:px-10">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <Card key={index} className="bg-white overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <CardContent className="p-4 flex items-center">
                  <div className={`p-2 rounded-full ${kpi.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'} mr-4`}>
                    <kpi.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">{kpi.title}</h3>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-indigo-900 mr-2">{kpi.value}</span>
                      <div className={`flex items-center text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.trend === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                        <span>{kpi.change}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sales and WTD Chart */}
          <Card className="mb-8 bg-white rounded-xl shadow-md">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">Sales and WTD Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="date" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip contentStyle={{ background: 'white', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                  <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                  <Line type="monotone" dataKey="wtd" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Events Table and Optimizer Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Events Table */}
            <Card className="bg-white rounded-xl shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-indigo-900 mb-4">Recent Events</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-indigo-600">Event</TableHead>
                      <TableHead className="text-indigo-600">Description</TableHead>
                      <TableHead className="text-indigo-600">Verdict</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eventsData.map((event, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{event.event}</TableCell>
                        <TableCell>{event.description}</TableCell>
                        <TableCell>
                          <Badge variant={event.verdict === 'positive' ? 'success' : 'destructive'} className="rounded-full px-2 py-1 text-xs">
                            {event.verdict}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Optimizer Recommendations */}
            <Card className="bg-white rounded-xl shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-indigo-900 mb-4">Optimizer Recommendations</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-indigo-600">Recommendation</TableHead>
                      <TableHead className="text-indigo-600">Impact</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {optimizerData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.recommendation}</TableCell>
                        <TableCell>
                          <Badge variant={item.impact === 'High' ? 'default' : 'secondary'} className="rounded-full px-2 py-1 text-xs">
                            {item.impact}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;