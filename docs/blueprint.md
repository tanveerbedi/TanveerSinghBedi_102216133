# **App Name**: Furniture Recommendations

## Core Features:

- Conversational Recommendations: Chat interface where users specify furniture needs and receive top-K product recommendations via semantic vector search.
- GenAI Product Descriptions: Generate creative yet concise per-product descriptions using Gemini, avoiding hallucinated specs and citing only known fields.
- Product Data Import: Admin interface for uploading CSV/JSON product data, auto-ingesting images into Firebase Storage, and writing product documents into Firestore.
- Image Tagging with Computer Vision: Automatically label images and extract dominant colors, storing them in product documents as `tags_cv` and `dominant_colors`.
- Semantic Product Grouping: Use embeddings to find nearest neighbors for each product and upsert `similar_ids` to group related products.
- Analytics Dashboard: Display aggregated metrics (traffic, CTR, conversions, top categories/brands, price bands) with filters by time, category, and CSV export.
- User Authentication: Implement anonymous sign-in for shoppers and email/password authentication for admins, with admin roles controlled via custom claims.

## Style Guidelines:

- Responsive grid layout for product cards.
- Clean, modern typography with consistent spacing and elevation. Use ‘Inter’ (sans-serif) font.
- Minimalist, consistent icons (Lucide or Heroicons).
- Subtle hover transitions, skeleton loaders for async UI.