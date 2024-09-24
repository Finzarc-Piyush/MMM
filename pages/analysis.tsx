import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Layout from '../components/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/router';
import { useFilter } from '../context/FilterContext';

const brands = ['All', 'Saffola', 'NSA', 'Livon'];
const geographies = ['All', 'NSA Stronghold', 'DA Stronghold', 'Uncontested'];
const packRanges = ['All', '0-40 ml', '41-89 ml', '90-299 ml', 'Large Packs'];

export default function Analysis() {
  const [selectedP, setSelectedP] = useState<string | null>(null);
  const { selectedBrand, setSelectedBrand, selectedGeography, setSelectedGeography, selectedPackRange, setSelectedPackRange } = useFilter();
  const router = useRouter();
  const [zoomedChart, setZoomedChart] = useState<React.ReactNode | null>(null);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/data')
      .then((response) => response.json())
      .then((jsonData) => {
        console.log('Fetched Data:', jsonData); // Log the fetched data
        setData(jsonData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const renderChart = (title: string, data: any[], lines: { key: string; color: string }[]) => (
    <Card className="w-full mb-4 bg-white rounded-xl shadow-md cursor-pointer" onClick={() => handleChartClick(
      <Card className="w-full h-full bg-white rounded-xl shadow-md">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#4F46E5" />
              <YAxis yAxisId="left" stroke="#4F46E5" domain={[60, 'auto']} />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip contentStyle={{ background: 'white', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
              <Legend />
              {lines.map((line) => (
                <Line
                  key={line.key}
                  type="monotone"
                  dataKey={line.key}
                  stroke={line.color}
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6 }}
                  yAxisId={line.key === 'salesUnits' ? 'left' : 'right'}
                  strokeDasharray={line.key === 'salesUnits' ? '0' : '3 3'}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    )}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="month" stroke="#4F46E5" />
            <YAxis yAxisId="left" stroke="#4F46E5" domain={[60, 'auto']} />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip contentStyle={{ background: 'white', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
            <Legend />
            {lines.map((line) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                stroke={line.color}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                yAxisId={line.key === 'salesUnits' ? 'left' : 'right'}
                strokeDasharray={line.key === 'salesUnits' ? '0' : '3 3'}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const renderPriceCharts = () => (
    <>
      {renderChart('RPI DA 10/- vs Sales Units', data, [
        { key: 'salesUnits', color: '#8884d8' },
        { key: 'rpiDA10', color: '#82ca9d' },
      ])}
      {renderChart('RPI DA 20/- vs Sales Units', data, [
        { key: 'salesUnits', color: '#8884d8' },
        { key: 'rpiDA20', color: '#82ca9d' },
      ])}
    </>
  );

  const renderPlaceCharts = () => (
    <>
      {renderChart('WTD vs Sales Units', data, [
        { key: 'salesUnits', color: '#8884d8' },
        { key: 'wtdNSA', color: '#82ca9d' },
      ])}
      {renderChart('# Stores vs Sales Units', data, [
        { key: 'salesUnits', color: '#8884d8' },
        { key: 'storesNSA', color: '#82ca9d' },
      ])}
      {renderChart('WTD NSA vs WTD DA', data, [
        { key: 'salesUnits', color: '#8884d8' },
        { key: 'wtdNSA', color: '#8884d8' },
        { key: 'wtdDA', color: '#82ca9d' },
      ])}
      {renderChart('# Stores NSA vs # Stores DA', data, [
        { key: 'salesUnits', color: '#8884d8' },
        { key: 'storesNSA', color: '#8884d8' },
        { key: 'storesDA', color: '#82ca9d' },
      ])}
    </>
  );

  const renderProductCharts = () => (
    <>
      {renderChart('34ml vs 30ml vs 29ml (Sales Units)', data, [
        { key: 'salesUnits', color: '#8884d8' },
        { key: 'SalesUnits29ml', color: '#82ca9d' },
        { key: 'SalesUnits30ml', color: '#ffc658' },
        { key: 'SalesUnits34ml', color: '#ff7300' },
      ])}
      {renderChart('34ml vs 30ml vs 29ml (WTD)', data, [
        { key: 'wtdNSA', color: '#8884d8' },
        { key: 'WTD29ml', color: '#82ca9d' },
        { key: 'WTD30ml', color: '#ffc658' },
        { key: 'WTD34ml', color: '#ff7300' },
      ])}
    </>
  );

  const renderPromotionCharts = () => (
    <>
      {renderChart('TUP Scheme NSA vs TUP Scheme DA vs Sales Units', data, [
        { key: 'salesUnits', color: '#8884d8' },
        { key: 'tupSchemeNSA', color: '#82ca9d' },
        { key: 'tupSchemeDA', color: '#ffc658' },
      ])}
      {renderChart('Value Promotion vs Volume Promotion vs Sales Units', data, [
        { key: 'salesUnits', color: '#8884d8' },
        { key: 'valuePromo', color: '#82ca9d' },
        { key: 'volumePromo', color: '#ffc658' },
      ])}
    </>
  );

  const renderCharts = () => {
    if (data.length === 0) {
      return <p>No data available. Please upload an Excel file.</p>;
    }

    switch (selectedP) {
      case 'Price':
        return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{renderPriceCharts()}</div>;
      case 'Place':
        return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{renderPlaceCharts()}</div>;
      case 'Product':
        return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{renderProductCharts()}</div>;
      case 'Promotion':
        return <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{renderPromotionCharts()}</div>;
      default:
        return (
          <>
            <h3 className="text-xl font-bold mt-4 mb-2">Price</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{renderPriceCharts()}</div>
            <h3 className="text-xl font-bold mt-4 mb-2">Place</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{renderPlaceCharts()}</div>
            <h3 className="text-xl font-bold mt-4 mb-2">Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{renderProductCharts()}</div>
            <h3 className="text-xl font-bold mt-4 mb-2">Promotion</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{renderPromotionCharts()}</div>
          </>
        );
    }
  };

  const handleChartClick = (chart: React.ReactNode) => {
    setZoomedChart(chart);
  };

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

  return (
    <Layout>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Analysis</h2>
          <div className="flex space-x-4 mb-8">
            <div>
              <h3 className="text-sm font-semibold text-indigo-600">Brand</h3>
              <select
                className="w-[180px] p-2 rounded-md border border-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedBrand}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  sessionStorage.setItem('selectedBrand', e.target.value);
                }}
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
                onChange={(e) => {
                  setSelectedGeography(e.target.value);
                  sessionStorage.setItem('selectedGeography', e.target.value);
                }}
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
                onChange={(e) => {
                  setSelectedPackRange(e.target.value);
                  sessionStorage.setItem('selectedPackRange', e.target.value);
                }}
              >
                <option value="" disabled>Select Pack Range</option>
                {packRanges.map((range) => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex space-x-2 mb-4">
            <button
              className={`px-4 py-2 rounded-md ${selectedP === null ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}
              onClick={() => setSelectedP(null)}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md ${selectedP === 'Price' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}
              onClick={() => setSelectedP('Price')}
            >
              Price
            </button>
            <button
              className={`px-4 py-2 rounded-md ${selectedP === 'Place' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}
              onClick={() => setSelectedP('Place')}
            >
              Place
            </button>
            <button
              className={`px-4 py-2 rounded-md ${selectedP === 'Product' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}
              onClick={() => setSelectedP('Product')}
            >
              Product
            </button>
            <button
              className={`px-4 py-2 rounded-md ${selectedP === 'Promotion' ? 'bg-indigo-600 text-white' : 'bg-indigo-100 text-indigo-600'}`}
              onClick={() => setSelectedP('Promotion')}
            >
              Promotion
            </button>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex-1 overflow-y-auto mb-8">
              {renderCharts()}
            </div>
          </div>
          {zoomedChart && (
            <>
              <div className="dimmed-background" onClick={() => setZoomedChart(null)}></div>
              <div className="zoomed-chart">
                {zoomedChart}
              </div>
            </>
          )}
          <div className="fixed bottom-0 left-64 right-0 bg-white p-4 shadow-lg">
            <Card>
              <CardHeader>
                <CardTitle className="text-md text-indigo-600">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm">
                  <li>Consider a slight price decrease to boost sales volume.</li>
                  <li>Focus on increasing distribution as it has a significant positive impact on revenue.</li>
                  <li>Optimize trade offers for better ROI.</li>
                  <li>Maintain current levels of consumer offers and advertising.</li>
                  <li>Improve product quality and packaging to increase brand equity.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}