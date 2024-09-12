import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import Layout from '../components/layout'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Sidebar from '@/components/Sidebar'

// Mock data for each P
const priceData = [
  { month: 'Jan', price: 200, competitorPrice1: 210, competitorPrice2: 195 },
  { month: 'Feb', price: 210, competitorPrice1: 215, competitorPrice2: 200 },
  { month: 'Mar', price: 190, competitorPrice1: 200, competitorPrice2: 185 },
  { month: 'Apr', price: 200, competitorPrice1: 205, competitorPrice2: 190 },
  { month: 'May', price: 218, competitorPrice1: 220, competitorPrice2: 210 },
  { month: 'Jun', price: 205, competitorPrice1: 210, competitorPrice2: 200 },
]

const placeData = [
  { month: 'Jan', distribution: 80, marketShare: 30, storeCount: 1000 },
  { month: 'Feb', distribution: 82, marketShare: 31, storeCount: 1050 },
  { month: 'Mar', distribution: 85, marketShare: 33, storeCount: 1100 },
  { month: 'Apr', distribution: 83, marketShare: 32, storeCount: 1080 },
  { month: 'May', distribution: 86, marketShare: 34, storeCount: 1150 },
  { month: 'Jun', distribution: 88, marketShare: 35, storeCount: 1200 },
]

const productData = [
  { month: 'Jan', sales: 4000, productA: 2000, productB: 1500, productC: 500 },
  { month: 'Feb', sales: 3000, productA: 1500, productB: 1000, productC: 500 },
  { month: 'Mar', sales: 2000, productA: 1000, productB: 500, productC: 500 },
  { month: 'Apr', sales: 2780, productA: 1280, productB: 1000, productC: 500 },
  { month: 'May', sales: 1890, productA: 890, productB: 500, productC: 500 },
  { month: 'Jun', sales: 2390, productA: 1390, productB: 500, productC: 500 },
]

const promotionData = [
  { month: 'Jan', tradeOffers: 2400, consumerOffers: 2400, advertising: 1000, events: 500 },
  { month: 'Feb', tradeOffers: 2210, consumerOffers: 2290, advertising: 1100, events: 600 },
  { month: 'Mar', tradeOffers: 2290, consumerOffers: 2000, advertising: 1200, events: 700 },
  { month: 'Apr', tradeOffers: 2000, consumerOffers: 2181, advertising: 1300, events: 800 },
  { month: 'May', tradeOffers: 2181, consumerOffers: 2500, advertising: 1400, events: 900 },
  { month: 'Jun', tradeOffers: 2500, consumerOffers: 2100, advertising: 1500, events: 1000 },
]

export default function Analysis() {
  const [selectedP, setSelectedP] = useState<string | null>(null)

  const renderChart = (title: string, data: any[], lines: { key: string; color: string }[]) => (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {lines.map((line) => (
              <Line key={line.key} type="monotone" dataKey={line.key} stroke={line.color} />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )

  const renderPriceCharts = () => (
    <>
      {renderChart('Price Comparison', priceData, [
        { key: 'price', color: '#8884d8' },
        { key: 'competitorPrice1', color: '#82ca9d' },
        { key: 'competitorPrice2', color: '#ffc658' },
      ])}
      {renderChart('Price Elasticity', priceData, [
        { key: 'price', color: '#8884d8' },
        { key: 'sales', color: '#82ca9d' },
      ])}
      {renderChart('Price vs Profit Margin', priceData, [
        { key: 'price', color: '#8884d8' },
        { key: 'profitMargin', color: '#82ca9d' },
      ])}
      {renderChart('Price Positioning', priceData, [
        { key: 'price', color: '#8884d8' },
        { key: 'premiumIndex', color: '#82ca9d' },
      ])}
    </>
  )

  const renderPlaceCharts = () => (
    <>
      {renderChart('Distribution Coverage', placeData, [
        { key: 'distribution', color: '#8884d8' },
      ])}
      {renderChart('Market Share', placeData, [
        { key: 'marketShare', color: '#82ca9d' },
      ])}
      {renderChart('Store Count', placeData, [
        { key: 'storeCount', color: '#ffc658' },
      ])}
      {renderChart('Channel Performance', placeData, [
        { key: 'modernTrade', color: '#8884d8' },
        { key: 'generalTrade', color: '#82ca9d' },
        { key: 'ecommerce', color: '#ffc658' },
      ])}
    </>
  )

  const renderProductCharts = () => (
    <>
      {renderChart('Product Sales', productData, [
        { key: 'productA', color: '#8884d8' },
        { key: 'productB', color: '#82ca9d' },
        { key: 'productC', color: '#ffc658' },
      ])}
      {renderChart('Product Mix', productData, [
        { key: 'productA', color: '#8884d8' },
        { key: 'productB', color: '#82ca9d' },
        { key: 'productC', color: '#ffc658' },
      ])}
      {renderChart('Product Lifecycle', productData, [
        { key: 'productA', color: '#8884d8' },
        { key: 'productB', color: '#82ca9d' },
        { key: 'productC', color: '#ffc658' },
      ])}
      {renderChart('Product Profitability', productData, [
        { key: 'productAProfit', color: '#8884d8' },
        { key: 'productBProfit', color: '#82ca9d' },
        { key: 'productCProfit', color: '#ffc658' },
      ])}
    </>
  )

  const renderPromotionCharts = () => (
    <>
      {renderChart('Trade Offers', promotionData, [
        { key: 'tradeOffers', color: '#8884d8' },
      ])}
      {renderChart('Consumer Offers', promotionData, [
        { key: 'consumerOffers', color: '#82ca9d' },
      ])}
      {renderChart('Advertising Spend', promotionData, [
        { key: 'advertising', color: '#ffc658' },
      ])}
      {renderChart('Event Impact', promotionData, [
        { key: 'events', color: '#8884d8' },
        { key: 'eventROI', color: '#82ca9d' },
      ])}
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
          <h2 className="text-3xl font-bold mb-6">Analysis</h2>
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
        </div>
      </div>
    </Layout>
  )
}