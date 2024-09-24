import { useState, useEffect } from 'react'
import Layout from '../components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Sidebar from '@/components/Sidebar'
import { useRouter } from 'next/router';
import { useFilter } from '../context/FilterContext';

const initialVariables = [
  { name: 'RPI DA 20/-', value: 0.98, unit: '' },
  { name: 'WTD', value: 46, unit: '' },
  { name: 'TUP Scheme', unit: '₹', value: 1.9},
  { name: 'Volume Promo', value: 38, unit: 'KL' },
  { name: 'TV GRP', value: 270, unit: '' },
  { name: 'Print Spend', value: 147, unit: '₹' },
  { name: 'Digital Spend', value: 60, unit: '₹' },
]

const recommendedValues = [
  0.95,
  62,
  2.3,
  40,
  310,
  120,
  70,
]

export default function Optimizer() {
  const router = useRouter();
  const { selectedBrand, setSelectedBrand, selectedGeography, setSelectedGeography, selectedPackRange, setSelectedPackRange } = useFilter();
  const [variables] = useState(initialVariables)
  const [scenarioValues, setScenarioValues] = useState(initialVariables.map(v => v.value))
  const [revenue, setRevenue] = useState(98)
  const [changes, setChanges] = useState<{ [key: string]: { value: number; percentage: number } }>({})
  const [selectedP, setSelectedP] = useState('Media Budget');

  const brands = ['All', 'Saffola', 'NSA', 'Livon']
  const geographies = ['All', 'NSA Stronghold', 'DA Stronghold', 'Uncontested']
  const packRanges = ['All', '0-40 ml', '41-89 ml', '90-299 ml', 'Large Packs']

  const handleInputChange = (index: number, newValue: number) => {
    const updatedScenarioValues = [...scenarioValues]
    updatedScenarioValues[index] = newValue
    setScenarioValues(updatedScenarioValues)

    // Simulate revenue calculation and factor changes (replace with actual model)
    const newRevenue = 98 + Math.random() * 10 - 5
    setRevenue(newRevenue)

    const newChanges: { [key: string]: { value: number; percentage: number } } = {}
    variables.forEach((variable, i) => {
      const change = Math.random() * 2 - 1
      const percentage = (change / 98) * 100
      newChanges[variable.name] = {
        value: change,
        percentage: percentage,
      }
    })
    setChanges(newChanges)
  }

  const formatChange = (change: number) => {
    return change >= 0 ? `+${change.toLocaleString()}` : change.toLocaleString()
  }

  const formatPercentage = (percentage: number) => {
    return percentage >= 0 ? `+${percentage.toFixed(2)}%` : `${percentage.toFixed(2)}%`
  }

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
        <div className="flex-1 flex flex-col max-w-7xl mx-auto overflow-hidden">
          <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
            <div className="max-w-7xl mx-auto py-4 px-6 sm:px-8 lg:px-10">
              <h2 className="text-3xl font-bold mb-6">Optimizer / Simulator</h2>
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
            </div>
          </header>

          <div className="flex-1 overflow-y-auto">
            <main className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md font-bold text-indigo-600">Significant Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <table className="w-full">
                      <thead>
                        <tr className="flex justify-between">
                          <th className="text-left text-xs font-semibold text-indigo-600 flex-1 align-middle">Feature</th>
                          <th className="text-center text-xs font-semibold text-indigo-600 flex-1 align-middle">P6M Value</th>
                          <th className="text-center text-xs font-semibold text-indigo-600 flex-1 align-middle">Recommended</th>
                          <th className="text-left text-xs font-semibold text-indigo-600 flex-1 align-middle">Scenario Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {variables.map((variable, index) => (
                          <tr key={variable.name} className="flex justify-between items-center"> {/* Add items-center class */}
                            <td className="flex-1 text-xs align-middle">{variable.name}</td>
                            <td className="flex-1 text-xs text-center align-middle">{variable.value.toLocaleString()} {variable.unit}</td>
                            <td className="flex-1 text-xs text-center align-middle">{recommendedValues[index]}</td>
                            <td className="flex-1 text-xs align-middle">
                              <Input
                                type="number"
                                value={scenarioValues[index]}
                                onChange={(e) => handleInputChange(index, parseFloat(e.target.value))}
                                className="w-40 text-xs align-middle vertical-align-middle" // Add vertical-align-middle class
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md font-bold text-indigo-600">Simulated Results: Minimum Estimates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold mb-4">
                      Estimated Volume (KL): {revenue.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                    </p>
                    <h3 className="text-sm font-semibold mb-2">Individual Attribution:</h3>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left text-xs font-semibold text-indigo-600 align-middle">Feature</th>
                          <th className="text-left text-xs font-semibold text-indigo-600 align-middle">Change in Volume</th>
                          <th className="text-left text-xs font-semibold text-indigo-600 align-middle">% Change in Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(changes).map(([factor, change]) => (
                          <tr key={factor}>
                            <td className="text-xs align-middle">{factor}</td>
                            <td className="text-xs align-middle">{formatChange(change.value)}</td>
                            <td className="text-xs align-middle">{formatPercentage(change.percentage)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p className="text-xs text-gray-500 mt-4">
                      Note: This is a simulated result. Actual revenue may vary based on market conditions and other factors.
                    </p>
                  </CardContent>
                </Card>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-2">
                    <button className="bg-indigo-600 text-white px-2 py-1 rounded-md w-48 text-center small-button">Optimize Media Spend basis Budget</button>
                    <Input type="number" placeholder="Enter Budget" className="flex-1" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="bg-indigo-600 text-white px-2 py-1 rounded-md w-48 text-center small-button">Optimize Media Spend basis Target Volume</button>
                    <Input type="number" placeholder="Enter Target Volume" className="flex-1" />
                  </div>
                  <button className="bg-indigo-600 text-white px-2 py-1 rounded-md w-48 text-center small-button">Optimize all for Volume Maximization</button>
                </div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-md font-bold text-indigo-600">Simulated Results: Optimum Estimates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-bold mb-4">
                      Estimated Volume (KL): {revenue.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                    </p>
                    <h3 className="text-sm font-semibold mb-2">Individual Attribution:</h3>
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="text-left text-xs font-semibold text-indigo-600 align-middle">Feature</th>
                          <th className="text-left text-xs font-semibold text-indigo-600 align-middle">Change in Volume</th>
                          <th className="text-left text-xs font-semibold text-indigo-600 align-middle">% Change in Volume</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.entries(changes).map(([factor, change]) => (
                          <tr key={factor}>
                            <td className="text-xs align-middle">{factor}</td>
                            <td className="text-xs align-middle">{formatChange(change.value)}</td>
                            <td className="text-xs align-middle">{formatPercentage(change.percentage)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </Card>
              </div>
            </main>
          </div>
        </div>
      </div>
    </Layout>
  )
}