import { config } from 'dotenv';
config();

import '@/ai/flows/generate-product-descriptions.ts';
import '@/ai/flows/group-similar-products.ts';
import '@/ai/flows/provide-conversational-recommendations.ts';
import '@/ai/flows/tag-product-images.ts';
import '@/ai/flows/group-similar-products-semantically.ts';
import '@/ai/flows/tag-product-images-with-cv.ts';