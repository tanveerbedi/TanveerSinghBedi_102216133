'use server';
import { provideConversationalRecommendations } from '@/ai/flows/provide-conversational-recommendations';
import { getProducts, getProductsByIds } from '@/lib/data';
import type { Product } from '@/lib/types';

export async function getRecommendedProducts(userInput: string): Promise<Product[]> {
  const allProducts = await getProducts();
  const productIds = allProducts.map(p => p.id);

  try {
    const result = await provideConversationalRecommendations({
      userInput,
      productIds,
      k: 3 // Limit to 3 for chat UI
    });
    
    if (result.recommendations.length > 0) {
      return getProductsByIds(result.recommendations);
    }
  } catch (error) {
    console.error('Error getting recommendations:', error);
  }

  // Fallback to simple keyword search
  const keywords = userInput.toLowerCase().split(' ').filter(k => k.length > 2);
  const scoredProducts = allProducts.map(product => {
    let score = 0;
    const productText = `${product.name} ${product.description} ${product.category} ${product.brand}`.toLowerCase();
    keywords.forEach(keyword => {
      if (productText.includes(keyword)) {
        score++;
      }
    });
    return { product, score };
  });

  return scoredProducts
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(item => item.product);
}
