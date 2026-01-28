'use client'

import { Star, TrendingUp, ArrowRight, Sparkles } from 'lucide-react'
import { ProductWithOptimized } from '@/types'
import ActionButtons from './ActionButtons'
import PriceEditor from './PriceEditor'

interface FeaturedCardProps {
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

export default function FeaturedCard({ product }: FeaturedCardProps) {
  const currentPrice = getNumericPrice(product.current_price)
  const optimizedPrice = product.optimized?.optimized_price 
    ? Number(product.optimized.optimized_price) 
    : null
  const priceDiff = optimizedPrice ? ((optimizedPrice - currentPrice) / currentPrice * 100) : null

  return (
    <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-purple-950/30 rounded-2xl border border-zinc-800/50 overflow-hidden">
      {/* Featured Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full">
        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
        <span className="text-yellow-500 text-xs font-semibold">Featured</span>
      </div>

      <div className="p-6">
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="w-32 h-32 rounded-xl bg-zinc-800 flex items-center justify-center overflow-hidden flex-shrink-0">
            {product.image_url ? (
              <img 
                src={product.image_url} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-4xl">📦</div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-white mb-2 truncate">{product.name}</h3>
            <p className="text-zinc-500 text-sm mb-4 line-clamp-2">
              {product.description || 'No description available'}
            </p>

            <div className="flex items-center gap-6">
              {/* Current Price */}
              <div>
                <span className="text-zinc-600 text-xs uppercase tracking-wider">Current</span>
                <div className="flex items-center gap-2">
                  <PriceEditor productId={product.id} currentPrice={currentPrice} />
                </div>
              </div>

              {/* AI Suggested Price */}
              {optimizedPrice && (
                <>
                  <ArrowRight className="w-5 h-5 text-zinc-600" />
                  <div>
                    <span className="text-zinc-600 text-xs uppercase tracking-wider">AI Suggested</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-purple-400">
                        ${formatPrice(optimizedPrice)}
                      </span>
                      {priceDiff !== null && (
                        <span className={`text-sm font-medium ${priceDiff >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {priceDiff >= 0 ? '+' : ''}{priceDiff.toFixed(1)}%
                        </span>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {optimizedPrice && (
            <div className="flex items-center">
              <ActionButtons productId={product.id} optimizedPrice={optimizedPrice} />
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center gap-8">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-zinc-600" />
            <span className="text-zinc-500 text-sm">
              {product.units_sold ?? 0} sold
            </span>
          </div>
          <div className="text-zinc-500 text-sm">
            Stock: <span className="text-white font-medium">{product.stock_level}</span>
          </div>
          {product.category && (
            <span className="px-2 py-1 bg-zinc-800 rounded-md text-zinc-400 text-xs">
              {product.category}
            </span>
          )}
        </div>

        {/* AI Justification */}
        {product.optimized?.justification && (
          <div className="mt-4 pt-4 border-t border-zinc-800/50">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-purple-400 text-xs font-semibold uppercase tracking-wider">AI Justification</span>
                <p className="text-zinc-400 text-sm mt-1">{product.optimized.justification}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
