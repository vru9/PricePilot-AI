import Image from 'next/image'
import { Sparkles, TrendingUp, TrendingDown, Package } from 'lucide-react'
import ActionButtons from './ActionButtons'
import PriceEditor from './PriceEditor'
import { ProductWithOptimized } from '@/types'

interface ProductRowProps {
  product: ProductWithOptimized
}

export default function ProductRow({ product }: ProductRowProps) {
  const currentPrice = Number(product.current_price)
  const optimizedPrice = product.optimized?.optimized_price ? Number(product.optimized.optimized_price) : null
  const priceDiff = optimizedPrice ? ((optimizedPrice - currentPrice) / currentPrice * 100) : null

  const getStockColor = (level: number) => {
    if (level < 20) return 'text-red-400 bg-red-500/10 border-red-500/20'
    if (level < 50) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
    return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
  }

  return (
    <div className="bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-4 transition-all duration-200">
      {/* Main Row */}
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="relative w-14 h-14 flex-shrink-0 rounded-xl overflow-hidden bg-black border border-zinc-800">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="w-6 h-6 text-zinc-700" />
            </div>
          )}
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-white font-medium truncate">{product.name}</h3>
            {product.featured && (
              <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
            )}
          </div>
          {product.category && (
            <span className="text-zinc-600 text-sm">{product.category}</span>
          )}
        </div>
        
        {/* Stock Level */}
        <div className="hidden sm:flex flex-col items-center min-w-[80px]">
          <span className="text-zinc-600 text-xs mb-1">Stock</span>
          <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStockColor(product.stock_level)}`}>
            {product.stock_level}
          </span>
        </div>
        
        {/* Current Price */}
        <div className="flex flex-col items-end min-w-[130px]">
          <span className="text-zinc-600 text-xs mb-1">Current Price</span>
          <PriceEditor productId={product.id} currentPrice={currentPrice} />
        </div>
        
        {/* AI Suggested Price */}
        <div className="flex flex-col items-end min-w-[130px]">
          <span className="text-zinc-600 text-xs mb-1">AI Suggestion</span>
          {optimizedPrice !== null ? (
            <div className="flex items-center gap-2">
              <span className="text-purple-400 font-semibold">${optimizedPrice.toFixed(2)}</span>
              {priceDiff !== null && (
                <span className={`flex items-center text-xs font-medium px-1.5 py-0.5 rounded ${
                  priceDiff >= 0 
                    ? 'text-emerald-400 bg-emerald-500/10' 
                    : 'text-red-400 bg-red-500/10'
                }`}>
                  {priceDiff >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                  {priceDiff >= 0 ? '+' : ''}{priceDiff.toFixed(1)}%
                </span>
              )}
            </div>
          ) : (
            <span className="text-zinc-700 text-sm">—</span>
          )}
        </div>
      </div>
      
      {/* Action Buttons Row - Only shown if there's an AI suggestion */}
      {optimizedPrice !== null && (
        <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-end">
          <ActionButtons productId={product.id} optimizedPrice={optimizedPrice} />
        </div>
      )}
    </div>
  )
}
