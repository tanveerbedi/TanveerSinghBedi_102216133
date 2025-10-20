'use server';

/**
 * @fileOverview Groups similar products together using embeddings to improve product recommendations and cross-selling opportunities.
 *
 * - groupSimilarProducts - A function that handles the product grouping process.
 * - GroupSimilarProductsInput - The input type for the groupSimilarProducts function.
 * - GroupSimilarProductsOutput - The return type for the groupSimilarProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GroupSimilarProductsInputSchema = z.object({
  productId: z.string().describe('The ID of the product to find similar products for.'),
  productDescription: z.string().describe('The description of the product.'),
  productName: z.string().describe('The name of the product.'),
  k: z.number().describe('The number of similar products to find.').default(5),
});
export type GroupSimilarProductsInput = z.infer<typeof GroupSimilarProductsInputSchema>;

const GroupSimilarProductsOutputSchema = z.object({
  similarProductIds: z.array(z.string()).describe('An array of product IDs that are similar to the input product.'),
});
export type GroupSimilarProductsOutput = z.infer<typeof GroupSimilarProductsOutputSchema>;

export async function groupSimilarProducts(input: GroupSimilarProductsInput): Promise<GroupSimilarProductsOutput> {
  return groupSimilarProductsFlow(input);
}

const productGroupingPrompt = ai.definePrompt({
  name: 'productGroupingPrompt',
  input: {schema: GroupSimilarProductsInputSchema},
  output: {schema: GroupSimilarProductsOutputSchema},
  prompt: `You are an expert product recommendation system.

You are given a product and you will find similar product ids.

Product Name: {{{productName}}}
Product Description: {{{productDescription}}}

Find the {{{{k}}}} most similar product ids.  Return ONLY the product ids in a JSON array.  Do not include any other text or explanation.  The product ids must be strings.
`,
});

const groupSimilarProductsFlow = ai.defineFlow(
  {
    name: 'groupSimilarProductsFlow',
    inputSchema: GroupSimilarProductsInputSchema,
    outputSchema: GroupSimilarProductsOutputSchema,
  },
  async input => {
    const {output} = await productGroupingPrompt(input);
    return output!;
  }
);
