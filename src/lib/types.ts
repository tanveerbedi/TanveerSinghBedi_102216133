export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  imageUrl: string;
  imageHint: string;
  features: string[];
  tags_cv?: string[];
  dominant_colors?: string[];
  similar_ids?: string[];
}
