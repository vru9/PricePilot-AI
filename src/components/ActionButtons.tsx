'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check, X, Loader2 } from 'lucide-react'
import { acceptOptimizedPrice } from '@/lib/actions'

interface ActionButtonsProps {
  productId: string
  optimizedPrice: number
}

export default function ActionButtons({ productId, optimizedPrice }: ActionButtonsProps) {
  const [loading, setLoading] = useState<'accept' | 'reject' | null>(null)
  const router = useRouter()

  const handleAccept = async () => {
    setLoading('accept')
    try {
      // Send to n8n webhook (Slack-like payload)
      await fetch('https://rjdp.app.n8n.cloud/webhook-test/slack-interactivity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `payload=${encodeURIComponent(JSON.stringify({
          actions: [{
            action_id: 'approve_price',
            value: `${productId}|${optimizedPrice}`
          }]
        }))}`,
      })
      
      // Update the database
      await acceptOptimizedPrice(productId, optimizedPrice)
      
      // Refresh the page
      router.refresh()
    } catch (error) {
      console.error('Failed to accept price:', error)
    } finally {
      setLoading(null)
    }
  }

  const handleReject = async () => {
    setLoading('reject')
    try {
      // Send to n8n webhook (Slack-like payload)
      await fetch('https://rjdp.app.n8n.cloud/webhook-test/slack-interactivity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `payload=${encodeURIComponent(JSON.stringify({
          actions: [{
            action_id: 'reject_price',
            value: `${productId}|${optimizedPrice}`
          }]
        }))}`,
      })
      
      // Refresh the page
      router.refresh()
    } catch (error) {
      console.error('Failed to reject price:', error)
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleAccept}
        disabled={loading !== null}
        className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
      >
        {loading === 'accept' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Check className="w-4 h-4" />
        )}
        Accept
      </button>
      <button
        onClick={handleReject}
        disabled={loading !== null}
        className="flex items-center gap-1.5 px-4 py-2 bg-red-500 hover:bg-red-400 text-white text-sm font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-red-500/20"
      >
        {loading === 'reject' ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <X className="w-4 h-4" />
        )}
        Reject
      </button>
    </div>
  )
}
