import prisma from '@/lib/prisma'
import { Sidebar, Header, FeaturedCard, ProductRow } from '@/components'
import { Sparkles, Package } from 'lucide-react'
import { ProductWithOptimized } from '@/types'

// Helper function to serialize Decimal/BigInt values to plain JSON-compatible values
function serializeProduct(product: any): ProductWithOptimized {
  // Use JSON serialization to convert all special types to plain values
  const serialized = JSON.parse(JSON.stringify(product, (key, value) =>
    typeof value === 'bigint' ? Number(value) : value
  ))
  
  return {
    ...serialized,
    current_price: serialized.current_price ? Number(serialized.current_price) : 0,
    competitor_price: serialized.competitor_price ? Number(serialized.competitor_price) : null,
    cost_price: serialized.cost_price ? Number(serialized.cost_price) : null,
    optimized: serialized.optimized ? {
      ...serialized.optimized,
      optimized_price: serialized.optimized.optimized_price ? Number(serialized.optimized.optimized_price) : null,
      justification: serialized.optimized.justification || null,
    } : null,
  }
}

async function getProducts(): Promise<ProductWithOptimized[]> {
  const products = await prisma.products.findMany({
    include: {
      optimized: true
    },
    orderBy: [
      { featured: 'desc' },
      { updated_at: 'desc' }
    ]
  })
  return products.map(serializeProduct)
}

export default async function Home() {
  const products = await getProducts()
  
  const featuredProducts = products.filter((p: ProductWithOptimized) => p.featured)
  const allProducts = products
  const pendingSuggestions = products.filter((p: ProductWithOptimized) => p.optimized !== null).length

  return (
    <div className="flex h-screen bg-black">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header totalProducts={products.length} pendingSuggestions={pendingSuggestions} />
        
        <main className="flex-1 overflow-y-auto p-6 bg-black">
          {/* Featured Products Section */}
          {featuredProducts.length > 0 && (
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <h2 className="text-lg font-bold text-white">Featured Product</h2>
              </div>
              <div className="space-y-5">
                {featuredProducts.map((product: ProductWithOptimized) => (
                  <FeaturedCard key={product.id} product={product} />
                ))}
              </div>
            </section>
          )}
          
          {/* All Products Section */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 flex items-center justify-center">
                <Package className="w-4 h-4 text-zinc-500" />
              </div>
              <h2 className="text-lg font-bold text-white">All Products</h2>
              <span className="text-zinc-600 text-sm">({allProducts.length} items)</span>
            </div>
            
            {allProducts.length > 0 ? (
              <div className="space-y-3">
                {allProducts.map((product: ProductWithOptimized) => (
                  <ProductRow key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-2xl bg-zinc-900 flex items-center justify-center mb-4">
                  <Package className="w-10 h-10 text-zinc-700" />
                </div>
                <h3 className="text-lg font-medium text-zinc-500">No products found</h3>
                <p className="text-zinc-600 text-sm mt-1">Add some products to get started</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  )
}
