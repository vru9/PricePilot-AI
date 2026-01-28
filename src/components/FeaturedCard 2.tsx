import Image from 'next/image'
import { Sparkles, TrendingUp, TrendingDown, Package } from 'lucide-react'
import ActionButtons from './ActionButtons'
import PriceEditor from './PriceEditor'
import { ProductWithOptimized } from '@/types'

interface FeaturedCardProps {
  product: ProductWithOptimized
}

export default function FeaturedCard({ product }: FeaturedCardProps) {
  const currentPrice = Number(product.current_price)
  const optimizedPrice = product.optimized?.optimized_price ? Number(product.optimized.optimized_price) : null
  const priceDiff = optimizedPrice ? ((optimizedPrice - currentPrice) / currentPrice * 100) : null

  return (
    <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-black rounded-2xl border border-zinc-800 overflow-hidden hover:border-purple-500/50 transition-all duration-300 group shadow-2xl">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative lg:w-1/3 h-64 lg:h-auto lg:min-h-[320px] bg-black">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-black">
              <Package className="w-24 h-24 text-zinc-700" />
            </div>
          )}
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/50 hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          
          {/* Badges */}
          <div className="absolute top-4 left-4">
            <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-500 text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-lg shadow-purple-500/30">
              <Sparkles className="w-4 h-4" />
              Featured Product
            </span>
          </div>
          {product.category && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1.5 bg-black/60 text-zinc-300 text-sm font-medium rounded-full backdrop-blur-md border border-zinc-700/50">
                {product.category}
              </span>
            </div>
          )}
        </div>
        
        {/* Content Section */}
        <div className="flex-1 p-6 lg:p-8 flex flex-col justify-center">
          {/* Product Info */}
          <div className="mb-6">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{product.name}</h3>
            {product.description && (
              <p className="text-zinc-400 text-base lg:text-lg">{product.description}</p>
            )}
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {/* Stock */}
            <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
              <span className="text-zinc-500 text-xs uppercase tracking-wider">Stock Level</span>
              <div className={`text-xl font-bold mt-1 ${
                product.stock_level < 20 
                  ? 'text-red-400' 
                  : product.stock_level < 50 
                    ? 'text-yellow-400' 
                    : 'text-emerald-400'
              }`}>
                {product.stock_level} units
              </div>
            </div>
            
            {/* Current Price */}
            <div className="bg-zinc-900/50 rounded-xl p-4 border border-zinc-800">
              <span className="text-zinc-500 text-xs uppercase tracking-wider">Current Price</span>
              <div className="mt-1">
                <PriceEditor productId={product.id} currentPrice={currentPrice} />
              </div>
            </div>
            
            {/* AI Suggestion */}
            {optimizedPrice !== null && (
              <div className="col-span-2 lg:col-span-1 bg-gradient-to-r from-purple-900/30 to-purple-800/20 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span className="text-purple-400 text-xs uppercase tracking-wider">AI Suggestion</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-white">${optimizedPrice.toFixed(2)}</span>
                  {priceDiff !== null && (
                    <span className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${
                      priceDiff >= 0 
                        ? 'bg-emerald-500/10 text-emerald-400' 
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      {priceDiff >= 0 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {priceDiff >= 0 ? '+' : ''}{priceDiff.toFixed(1)}%
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          {optimizedPrice !== null && (
            <div className="flex gap-3">
              <ActionButtons productId={product.id} optimizedPrice={optimizedPrice} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
