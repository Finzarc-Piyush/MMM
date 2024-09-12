import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Layout from '../components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Sidebar from '@/components/Sidebar'

const priceElasticityData = [
  { variable: 'Base Price', elasticity: -1.5 },
  { variable: 'Promotional Price', elasticity: -2.0 },
  { variable: 'Competitor Price', elasticity: 0.5 },
  { variable: 'Price Gap', elasticity: -0.8 },
]

const placeElasticityData = [
  { variable: 'Distribution', elasticity: 0.8 },
  { variable: 'Shelf Space', elasticity: 0.6 },
  { variable: 'Store Type', elasticity: 0.4 },
  { variable: 'Geographic Location', elasticity: 0.3 },
]

const productElasticityData = [
  { variable: 'Quality', elasticity: 0.7 },
  { variable: 'Packaging', elasticity: 0.4 },
  { variable: 'Brand Equity', elasticity: 0.6 },
  { variable: 'Product Mix', elasticity: 0.5 },
]

const promotionElasticityData = [
  { variable: 'Trade Offers', elasticity: 0.5 },
  { variable: 'Consumer Offers', elasticity: 0.3 },
  { variable: 'Advertising', elasticity: 0.2 },
  { variable: 'In-Store Promotions', elasticity: 0.4 },
]

const priceImpactData = [
  { variable: 'Base Price', directImpact: 50, indirectImpact: 10 },
  { variable: 'Promotional Price', directImpact: 30, indirectImpact: 15 },
  { variable: 'Competitor Price', directImpact: 20, indirectImpact: 25 },
  { variable: 'Price Gap', directImpact: 25, indirectImpact: 20 },
]

const placeImpactData = [
  { variable: 'Distribution', directImpact: 40, indirectImpact: 20 },
  { variable: 'Shelf Space', directImpact: 30, indirectImpact: 15 },
  { variable: 'Store Type', directImpact: 25, indirectImpact: 10 },
  { variable: 'Geographic Location', directImpact: 20, indirectImpact: 25 },
]

const productImpactData = [
  { variable: 'Quality', directImpact: 35, indirectImpact: 25 },
  { variable: 'Packaging', directImpact: 20, indirectImpact: 15 },
  { variable: 'Brand Equity', directImpact: 30, indirectImpact: 30 },
  { variable: 'Product Mix', directImpact: 25, indirectImpact: 20 },
]

const promotionImpactData = [
  { variable: 'Trade Offers', directImpact: 30, indirectImpact: 15 },
  { variable: 'Consumer Offers', directImpact: 25, indirectImpact: 10 },
  { variable: 'Advertising', directImpact: 20, indirectImpact: 30 },
  { variable: 'In-Store Promotions', directImpact: 35, indirectImpact: 20 },
]

export default function ModelResults() {
  const [selectedP, setSelectedP] = useState<string | null>(null)

  const renderChart = (title: string, data: any[], dataKey: string) => (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="variable" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey={dataKey} fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  const renderImpactChart = (title: string, data: any[]) => (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="variable" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="directImpact" fill="#8884d8" />
            <Bar dataKey="indirectImpact" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  const renderPriceCharts = () => (
    <>
      {renderChart('Price Elasticities', priceElasticityData, 'elasticity')}
      {renderImpactChart('Price Impact on Revenue', priceImpactData)}
    </>
  )

  const renderPlaceCharts = () => (
    <>
      {renderChart('Place Elasticities', placeElasticityData, 'elasticity')}
      {renderImpactChart('Place Impact on Revenue', placeImpactData)}
    </>
  )

  const renderProductCharts = () => (
    <>
      {renderChart('Product Elasticities', productElasticityData, 'elasticity')}
      {renderImpactChart('Product Impact on Revenue', productImpactData)}
    </>
  )

  const renderPromotionCharts = () => (
    <>
      {renderChart('Promotion Elasticities', promotionElasticityData, 'elasticity')}
      {renderImpactChart('Promotion Impact on Revenue', promotionImpactData)}
    </>
  )

  const renderCharts = () => {
    switch (selectedP) {
      case 'Price':
        return renderPriceCharts()
      case 'Place':
        return renderPlaceCharts()
      case 'Product':
        return renderProductCharts()
      case 'Promotion':
        return renderPromotionCharts()
      default:
        return (
          <>
            <h3 className="text-xl font-bold mt-4 mb-2">Price</h3>
            {renderPriceCharts()}
            <h3 className="text-xl font-bold mt-4 mb-2">Place</h3>
            {renderPlaceCharts()}
            <h3 className="text-xl font-bold mt-4 mb-2">Product</h3>
            {renderProductCharts()}
            <h3 className="text-xl font-bold mt-4 mb-2">Promotion</h3>
            {renderPromotionCharts()}
          </>
        )
    }
  }

  return (
    <Layout>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-8">
          <h2 className="text-3xl font-bold mb-6">Model Results & Recommendations</h2>
          <div className="flex space-x-4 mb-8">
            <Button
              variant={selectedP === null ? 'default' : 'outline'}
              onClick={() => setSelectedP(null)}
            >
              All
            </Button>
            <Button
              variant={selectedP === 'Price' ? 'default' : 'outline'}
              onClick={() => setSelectedP('Price')}
            >
              Price
            </Button>
            <Button
              variant={selectedP === 'Place' ? 'default' : 'outline'}
              onClick={() => setSelectedP('Place')}
            >
              Place
            </Button>
            <Button
              variant={selectedP === 'Product' ? 'default' : 'outline'}
              onClick={() => setSelectedP('Product')}
            >
              Product
            </Button>
            <Button
              variant={selectedP === 'Promotion' ? 'default' : 'outline'}
              onClick={() => setSelectedP('Promotion')}
            >
              Promotion
            </Button>
          </div>
          <div className="overflow-y-auto">
            {renderCharts()}
          </div>
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
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
    </Layout>
  )
}