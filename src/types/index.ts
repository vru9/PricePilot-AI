// Type for products with optimized relation
export interface OptimizedSuggestion {
  id: string
  created_at: Date
  optimized_price: bigint | null
  justification: string | null
}

export interface Product {
  id: string
  name: string
  description: string | null
  current_price: number | string | { toNumber(): number }
  competitor_price: number | string | null | { toNumber(): number }
  cost_price: number | string | null | { toNumber(): number }
  image_url: string | null
  category: string | null
  stock_level: number
  featured: boolean | null
  created_at: Date
  updated_at: Date
  units_sold: number | null
  units_ordered: number | null
}

export type ProductWithOptimized = Product & {
  optimized: OptimizedSuggestion | null
}

export type ProductCardProps = {
  product: ProductWithOptimized
  isFeatured?: boolean
}
