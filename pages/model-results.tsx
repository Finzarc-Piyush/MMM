import { useState, useEffect } from 'react';
import Layout from '../components/layout';
import Sidebar from '@/components/Sidebar';
import { useRouter } from 'next/router';
import { useFilter } from '../context/FilterContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import Harveyball from '../components/Harveyball';

export default function ModelResults() {
  const router = useRouter();
  const { selectedBrand, setSelectedBrand, selectedGeography, setSelectedGeography, selectedPackRange, setSelectedPackRange } = useFilter();
  const [selectedP, setSelectedP] = useState<string | null>(null);
  const [tableData, setTableData] = useState<any[][]>([]);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/elasticity-data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTableData(data);
      } catch (error) {
        setError('Failed to load data from Excel file.');
      }
    };
    fetchData();
  }, []);

  const brands = ['All', 'Saffola', 'NSA', 'Livon'];
  const geographies = ['All', 'NSA Stronghold', 'DA Stronghold', 'Uncontested'];
  const packRanges = ['All', '0-40 ml', '41-89 ml', '90-299 ml', 'Large Packs'];

  return (
    <Layout>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Model Results & Recommendations</h2>
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
                {brands?.map((brand: string) => (
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
          <div className="border-t border-gray-200 mt-4 pt-4">
            <div className="flex-1 overflow-y-auto mb-8">
              {error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      {tableData[0]?.map((header, index) => (
                        <th key={index} className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-700">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.slice(1).map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex} className="py-2 px-4 border-b border-gray-200 text-sm">
                            {cellIndex === 2 ? <Harveyball value={cell} /> : cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
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