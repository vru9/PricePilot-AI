'use client'

import { useState } from 'react'
import { Edit3, Check, X, Loader2 } from 'lucide-react'
import { updateProductPrice } from '@/lib/actions'

interface PriceEditorProps {
  productId: string
  currentPrice: number
}

export default function PriceEditor({ productId, currentPrice }: PriceEditorProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [price, setPrice] = useState(currentPrice.toString())
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    const newPrice = parseFloat(price)
    if (isNaN(newPrice) || newPrice <= 0) {
      alert('Please enter a valid price')
      return
    }

    setLoading(true)
    try {
      const result = await updateProductPrice(productId, newPrice)
      if (result.success) {
        setIsEditing(false)
      } else {
        alert(result.error || 'Failed to update price')
      }
    } catch (error) {
      console.error('Failed to update price:', error)
      alert('Failed to update price')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setPrice(currentPrice.toString())
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-zinc-500">$</span>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-24 px-2 py-1 bg-zinc-900 border border-zinc-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
          step="0.01"
          min="0"
          autoFocus
        />
        <button
          onClick={handleSave}
          disabled={loading}
          className="p-1.5 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 rounded-lg disabled:opacity-50 transition-colors"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
        </button>
        <button
          onClick={handleCancel}
          disabled={loading}
          className="p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg disabled:opacity-50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 group">
      <span className="text-white font-semibold">${currentPrice.toFixed(2)}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="p-1.5 text-zinc-600 hover:text-purple-400 hover:bg-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
        title="Edit price"
      >
        <Edit3 className="w-4 h-4" />
      </button>
    </div>
  )
}
