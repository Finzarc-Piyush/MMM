import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Users, ShoppingCart, Search, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { useRouter } from 'next/router';
import { useFilter } from '../context/FilterContext';
import { Modal } from '../components/Modal';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const { selectedBrand, setSelectedBrand, selectedGeography, setSelectedGeography, selectedPackRange, setSelectedPackRange } = useFilter();
  const [zoomedContent, setZoomedContent] = useState<React.ReactNode | null>(null);

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    if (role !== 'brand') {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('selectedBrand', selectedBrand);
      sessionStorage.setItem('selectedGeography', selectedGeography);
      sessionStorage.setItem('selectedPackRange', selectedPackRange);
    }
  }, [selectedBrand, selectedGeography, selectedPackRange]);

  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/overview-data');
        const data = await response.json();
        console.log(data.map((item: { date: string }) => item.date)); // Define the type for item
        setChartData(data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);


  function excelSerialToDate(serial: number) {
    const excelEpoch = new Date(1900, 0, 1); // Excel starts counting from Jan 1, 1900
    const daysOffset = serial - 1; // Excel's day 1 is actually Jan 1, 1900
    const date = new Date(excelEpoch.getTime() + daysOffset * 24 * 60 * 60 * 1000); // Add the number of days
    return date;
  }

  
  const kpiData = [
    { title: 'Sales Units (P6M)', value: '98 lac', change: '+2.3%', trend: 'up', icon: DollarSign, graphData: [2, 3, 4, 3, 5, 4, 6] },
    { title: 'WTD (P6M)', value: '56', change: '-5.2%', trend: 'down', icon: Users, graphData: [6,5,4,3,2,1] },
    { title: 'Sales Value (P6M)', value: '981 lac', change: '2.5%', trend: 'up', icon: ShoppingCart, graphData: [3,4,5,6,7,8,9] },
  ];

  const eventsData = [
    { event: 'DA | TUP Scheme Increase', month: 'Jun-21', description: 'From 1.36/- to 2.7/-' },
    { event: 'NSA | MLage drop', month: 'Oct-22', description: 'From 34ml to 30ml' },
    { event: 'NSA | TUP Increase', month: 'Feb-23', description: 'From 1.5/- to 1.9/-' },
  ];

  const optimizerData = [
    { recommendation: 'Maintain minimum threshold for WTD at 62', P6M: '56' },
    { recommendation: 'Maintain maximum threshold for RPI DA 10 at 0.94', P6M: '0.98' },
    { recommendation: 'Maintain minimum threshold for TUP Scheme at 2.1/-', P6M: '1.9/-' },
  ];

  const brands = ['All', 'Saffola', 'NSA', 'Livon'];
  const geographies = ['All', 'NSA Stronghold', 'DA Stronghold', 'Uncontested'];
  const packRanges = ['All', '0-40 ml', '41-89 ml', '90-299 ml', 'Large Packs'];

  const handleChartClick = () => {
    setZoomedContent(
      <div className="p-10 w-full h-full" style={{ width: '1800px', height: '500px' }}>
        <ResponsiveContainer width="80%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="date"
              stroke="#6B7280"
              tickFormatter={(date) => {
              if (typeof date === 'number') {
                const parsedDate = excelSerialToDate(date);
                  return parsedDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                }
                return "x";
              }}
              ticks={chartData
                .map((entry, index) => (index % 3 === 0 ? entry.date : null))
                .filter((date) => date !== null)}
            />
            <YAxis stroke="#4F46E5" domain={['auto', 'auto']} />
            <YAxis yAxisId="right" orientation="right" stroke="#10B981" domain={['auto', 'auto']} />
            <Tooltip />
            <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="wtd" stroke="#10B981" strokeWidth={2} dot={false} strokeDasharray="3 3" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const handleCloseZoom = () => {
    setZoomedContent(null);
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="w-64 bg-indigo-900 text-white">
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto">
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto py-4 px-6 sm:px-8 lg:px-10">
            <h2 className="text-3xl font-bold mb-6">Executive Summary</h2>
            <div className="flex space-x-4 items-center">
              <Filter size={20} className="text-indigo-600" />
              <div>
                <h3 className="text-sm font-semibold text-indigo-600">Brand</h3>
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
              </div>
              <div>
                <h3 className="text-sm font-semibold text-indigo-600">Geography</h3>
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
              </div>
              <div>
                <h3 className="text-sm font-semibold text-indigo-600">Pack Range</h3>
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
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 px-6 sm:px-8 lg:px-10">
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

          <Card className="mb-8 bg-white rounded-xl shadow-md" onClick={handleChartClick}>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-indigo-900 mb-4">Sales and WTD Trends</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis
                    dataKey="date"
                    stroke="#6B7280"
                    tickFormatter={(date) => {
                      if (typeof date === 'number') {
                        const parsedDate = excelSerialToDate(date);
                        return parsedDate.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                      }
                      return "x";
                    }}
                    ticks={chartData
                      .map((entry, index) => (index % 3 === 0 ? entry.date : null))
                      .filter((date) => date !== null)}
                  />
                  <YAxis stroke="#6B7280" domain={['auto', 'auto']} />
                  <YAxis yAxisId="right" orientation="right" stroke="#10B981" domain={['auto', 'auto']} />
                  <Tooltip contentStyle={{ background: 'white', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                  <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                  <Line yAxisId="right" type="monotone" dataKey="wtd" stroke="#10B981" strokeWidth={2} dot={false} activeDot={{ r: 6 }} strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-white rounded-xl shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-indigo-900 mb-4">Recent Events</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-indigo-600">Event</TableHead>
                      <TableHead className="text-indigo-600">Month</TableHead>
                      <TableHead className="text-indigo-600">Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {eventsData.map((event, index) => (
                      <TableRow key={index}>
                        <TableCell>{event.event}</TableCell>
                        <TableCell>
                          <Badge variant={event.month === 'positive' ? 'success' : 'destructive'} className="rounded-full px-2 py-1 text-xs">
                            {event.month}
                          </Badge>
                        </TableCell>
                        <TableCell>{event.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="bg-white rounded-xl shadow-md">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-indigo-900 mb-4">Optimizer Recommendations</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-indigo-600">Recommendation</TableHead>
                      <TableHead className="text-indigo-600">P6M</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {optimizerData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.recommendation}</TableCell>
                        <TableCell>
                          <Badge variant={item.P6M === 'High' ? 'default' : 'secondary'} className="rounded-full px-2 py-1 text-xs">
                            {item.P6M}
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
      {zoomedContent && (
        <Modal onClose={handleCloseZoom}>
          {zoomedContent ? (
            <div className="w-full h-full p-10">{zoomedContent}</div>
          ) : (
            <div>No Content</div> // fallback in case zoomedContent is null
          )}
        </Modal>
      )}
    </div>
  );
};

export default Dashboard;