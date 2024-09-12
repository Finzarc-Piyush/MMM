import { useState } from 'react'
import Layout from '../components/layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Sidebar from '@/components/Sidebar'

const initialVariables = [
  { name: 'Price', value: 10, unit: '$' },
  { name: 'Distribution', value: 80, unit: '%' },
  { name: 'Trade Offers', value: 5, unit: '%' },
  { name: 'Consumer Offers', value: 3, unit: '%' },
  { name: 'Advertising', value: 1000000, unit: '$' },
]

export default function Optimizer() {
  const [variables, setVariables] = useState(initialVariables)
  const [revenue, setRevenue] = useState(10000000)
  const [changes, setChanges] = useState<{ [key: string]: { value: number; percentage: number } }>({})

  const handleInputChange = (index: number, newValue: number) => {
    const updatedVariables = [...variables]
    updatedVariables[index].value = newValue
    setVariables(updatedVariables)

    // Simulate revenue calculation and factor changes (replace with actual model)
    const newRevenue = 10000000 + Math.random() * 1000000 - 500000
    setRevenue(newRevenue)

    const newChanges: { [key: string]: { value: number; percentage: number } } = {}
    updatedVariables.forEach((variable) => {
      const change = Math.random() * 200000 - 100000
      const percentage = (change / 10000000) * 100
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

  return (
    <Layout>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-6">Optimizer / Simulator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Input Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Variable</th>
                      <th className="text-left">Current Value</th>
                      <th className="text-left">New Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {variables.map((variable, index) => (
                      <tr key={variable.name}>
                        <td>{variable.name}</td>
                        <td>{variable.value.toLocaleString()} {variable.unit}</td>
                        <td>
                          <Input
                            type="number"
                            value={variable.value}
                            onChange={(e) => handleInputChange(index, parseFloat(e.target.value))}
                            className="w-full"
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
                <CardTitle>Simulated Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-bold mb-4">
                  Estimated Revenue: ${revenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
                <h3 className="text-lg font-semibold mb-2">Factor Contributions:</h3>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Factor</th>
                      <th className="text-left">Change</th>
                      <th className="text-left">% Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(changes).map(([factor, change]) => (
                      <tr key={factor}>
                        <td>{factor}</td>
                        <td>{formatChange(change.value)}</td>
                        <td>{formatPercentage(change.percentage)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-sm text-gray-500 mt-4">
                  Note: This is a simulated result. Actual revenue may vary based on market conditions and other factors.
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8">
            <Button>Run Optimization</Button>
          </div>
        </div>
      </div>
    </Layout>
  )
}