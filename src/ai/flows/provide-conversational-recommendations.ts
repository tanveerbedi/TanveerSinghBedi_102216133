'use server';

/**
 * @fileOverview A conversational AI agent for providing furniture recommendations.
 *
 * - provideConversationalRecommendations - A function that handles the conversational recommendation process.
 * - ProvideConversationalRecommendationsInput - The input type for the provideConversationalRecommendations function.
 * - ProvideConversationalRecommendationsOutput - The return type for the provideConversationalRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvideConversationalRecommendationsInputSchema = z.object({
  userInput: z.string().describe('The user input specifying furniture needs.'),
  productIds: z.array(z.string()).optional().describe('List of product IDs to consider.'),
  k: z.number().default(5).describe('The number of top product recommendations to return.'),
});
export type ProvideConversationalRecommendationsInput = z.infer<typeof ProvideConversationalRecommendationsInputSchema>;

const ProvideConversationalRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('The list of recommended product IDs.'),
});
export type ProvideConversationalRecommendationsOutput = z.infer<typeof ProvideConversationalRecommendationsOutputSchema>;

export async function provideConversationalRecommendations(
  input: ProvideConversationalRecommendationsInput
): Promise<ProvideConversationalRecommendationsOutput> {
  return provideConversationalRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'provideConversationalRecommendationsPrompt',
  input: {schema: ProvideConversationalRecommendationsInputSchema},
  output: {schema: ProvideConversationalRecommendationsOutputSchema},
  prompt: `You are a helpful AI assistant specialized in providing furniture recommendations based on user needs.

  The user will provide their needs and you will provide a list of product IDs that best match their requirements.
  Consider only the following product IDs: {{#if productIds}}{{{productIds}}}{{else}}all available products{{/if}}.

  User Needs: {{{userInput}}}

  Return only a JSON array of product IDs. Do not provide any additional text or explanation.
  Example: [\"product1\", \"product2\", \"product3\"]`,
});

const provideConversationalRecommendationsFlow = ai.defineFlow(
  {
    name: 'provideConversationalRecommendationsFlow',
    inputSchema: ProvideConversationalRecommendationsInputSchema,
    outputSchema: ProvideConversationalRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output || !output.recommendations) {
      // If the model fails to return valid recommendations, return an empty array.
      return { recommendations: [] };
    }
    return {
      recommendations: output.recommendations,
    };
  }
);