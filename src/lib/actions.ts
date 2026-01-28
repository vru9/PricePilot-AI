'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function updateProductPrice(productId: string, newPrice: number) {
  try {
    await prisma.products.update({
      where: { id: productId },
      data: { 
        current_price: newPrice,
        updated_at: new Date()
      }
    })
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Failed to update product price:', error)
    return { success: false, error: 'Failed to update price' }
  }
}

export async function acceptOptimizedPrice(productId: string, optimizedPrice: number) {
  try {
    // Update the product price
    await prisma.products.update({
      where: { id: productId },
      data: { 
        current_price: optimizedPrice,
        updated_at: new Date()
      }
    })
    
    // Remove the optimized suggestion
    await prisma.optimized.delete({
      where: { id: productId }
    })
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Failed to accept optimized price:', error)
    return { success: false, error: 'Failed to accept price' }
  }
}

export async function rejectOptimizedPrice(productId: string) {
  try {
    // Remove the optimized suggestion without updating the price
    await prisma.optimized.delete({
      where: { id: productId }
    })
    
    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('Failed to reject optimized price:', error)
    return { success: false, error: 'Failed to reject suggestion' }
  }
}
