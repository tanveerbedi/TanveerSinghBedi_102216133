'use server';

/**
 * @fileOverview Groups similar products together using embeddings to improve product recommendations and cross-selling opportunities.
 *
 * - groupSimilarProductsSemantically - A function that handles the product grouping process.
 * - GroupSimilarProductsSemanticallyInput - The input type for the groupSimilarProductsSemantically function.
 * - GroupSimilarProductsSemanticallyOutput - The return type for the groupSimilarProductsSemantically function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GroupSimilarProductsSemanticallyInputSchema = z.object({
  productId: z.string().describe('The ID of the product to find similar products for.'),
  productDescription: z.string().describe('The description of the product.'),
  productName: z.string().describe('The name of the product.'),
  k: z.number().describe('The number of similar products to find.').default(5),
});
export type GroupSimilarProductsSemanticallyInput = z.infer<typeof GroupSimilarProductsSemanticallyInputSchema>;

const GroupSimilarProductsSemanticallyOutputSchema = z.object({
  similarProductIds: z.array(z.string()).describe('An array of product IDs that are similar to the input product.'),
});
export type GroupSimilarProductsSemanticallyOutput = z.infer<typeof GroupSimilarProductsSemanticallyOutputSchema>;

export async function groupSimilarProductsSemantically(
  input: GroupSimilarProductsSemanticallyInput
): Promise<GroupSimilarProductsSemanticallyOutput> {
  return groupSimilarProductsSemanticallyFlow(input);
}

const productGroupingPrompt = ai.definePrompt({
  name: 'productGroupingPrompt',
  input: {schema: GroupSimilarProductsSemanticallyInputSchema},
  output: {schema: GroupSimilarProductsSemanticallyOutputSchema},
  prompt: `You are an expert product recommendation system. You are given a product and you will find similar product ids.  Return ONLY the product ids in a JSON array.  Do not include any other text or explanation.  The product ids must be strings.

Product Name: {{{productName}}}
Product Description: {{{productDescription}}}

Find the {{{{k}}}} most similar product ids.
`,
});

const groupSimilarProductsSemanticallyFlow = ai.defineFlow(
  {
    name: 'groupSimilarProductsSemanticallyFlow',
    inputSchema: GroupSimilarProductsSemanticallyInputSchema,
    outputSchema: GroupSimilarProductsSemanticallyOutputSchema,
  },
  async input => {
    const {output} = await productGroupingPrompt(input);
    return output!;
  }
);
