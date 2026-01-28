'use client'

import { ArrowRight, Package, Sparkles } from 'lucide-react'
import { ProductWithOptimized } from '@/types'
import ActionButtons from './ActionButtons'
import PriceEditor from './PriceEditor'

interface ProductRowProps {
  product: ProductWithOptimized
}

function formatPrice(price: number | string | null | undefined | { toNumber(): number }): string {
  if (price === null || price === undefined) return 'N/A'
  if (typeof price === 'object' && 'toNumber' in price) {
    return price.toNumber().toFixed(2)
  }
  const num = typeof price === 'string' ? parseFloat(price) : price
  return isNaN(num) ? 'N/A' : num.toFixed(2)
}

function getNumericPrice(price: number | string | null | undefined | { toNumber(): number }): number {
  if (price === null || price === undefined) return 0
  if (typeof price === 'object' && 'toNumber' in price) {
    return price.toNumber()
  }
  const num = typeof price === 'string' ? parseFloat(price) : price
  return isNaN(num) ? 0 : num
}

export default function ProductRow({ product }: ProductRowProps) {
  const currentPrice = getNumericPrice(product.current_price)
  const optimizedPrice = product.optimized?.optimized_price 
    ? Number(product.optimized.optimized_price) 
    : null
  const priceDiff = optimizedPrice ? ((optimizedPrice - currentPrice) / currentPrice * 100) : null

  return (
    <div className="group bg-zinc-900/50 hover:bg-zinc-900 rounded-xl border border-zinc-800/50 hover:border-zinc-700/50 transition-all p-4">
      <div className="flex items-center gap-4">
        {/* Product Image */}
        <div className="w-14 h-14 rounded-lg bg-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0">
          {product.image_url ? (
            <img 
              src={product.image_url} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <Package className="w-6 h-6 text-zinc-600" />
          )}
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium truncate">{product.name}</h3>
          <div className="flex items-center gap-3 mt-1">
            {product.category && (
              <span className="text-zinc-600 text-xs">{product.category}</span>
            )}
            <span className="text-zinc-600 text-xs">Stock: {product.stock_level}</span>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="flex items-center gap-4">
          {/* Current Price */}
          <div className="text-right">
            <span className="text-zinc-600 text-xs block">Current</span>
            <PriceEditor productId={product.id} currentPrice={currentPrice} />
          </div>

          {/* AI Suggested Price */}
          {optimizedPrice && (
            <>
              <ArrowRight className="w-4 h-4 text-zinc-600" />
              <div className="text-right">
                <span className="text-zinc-600 text-xs block">AI Suggested</span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-semibold text-purple-400">
                    ${formatPrice(optimizedPrice)}
                  </span>
                  {priceDiff !== null && (
                    <span className={`text-xs font-medium ${priceDiff >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {priceDiff >= 0 ? '+' : ''}{priceDiff.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Buttons */}
        {optimizedPrice ? (
          <ActionButtons productId={product.id} optimizedPrice={optimizedPrice} />
        ) : (
          <div className="w-24" /> // Spacer when no actions
        )}
      </div>

      {/* AI Justification */}
      {product.optimized?.justification && (
        <div className="mt-3 pt-3 border-t border-zinc-800/50 flex items-start gap-2">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 mt-0.5 flex-shrink-0" />
          <p className="text-zinc-400 text-xs">{product.optimized.justification}</p>
        </div>
      )}
    </div>
  )
}
