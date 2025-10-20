import type { Product } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const productsData: Omit<Product, 'imageUrl' | 'imageHint'>[] = [
  {
    id: 'minimalist-lounge-chair',
    name: 'AURA Lounge Chair',
    description: 'Experience tranquility with the AURA Lounge Chair. Its clean lines and minimalist design bring a sense of calm to any space. Perfect for reading or quiet contemplation.',
    price: 499.99,
    category: 'Chairs',
    brand: 'Moderno',
    features: ['Ergonomic Design', 'Solid Ash Wood Frame', 'Linen Blend Upholstery'],
    tags_cv: ['chair', 'furniture', 'wood', 'indoor', 'popular'],
    dominant_colors: ['#F5F5DC', '#D2B48C'],
    similar_ids: ['leather-armchair', 'blue-accent-chair'],
  },
  {
    id: 'oak-dining-table',
    name: 'TERRA Dining Table',
    description: 'Gather your loved ones around the TERRA Dining Table. Crafted from solid oak, its robust construction and natural finish make it a timeless centerpiece for your dining room.',
    price: 899.0,
    category: 'Tables',
    brand: 'Natura',
    features: ['Seats 6-8 people', 'Solid Oak Construction', 'Protective Varnish'],
    tags_cv: ['table', 'dining', 'wood', 'furniture', 'trending'],
    dominant_colors: ['#8B4513', '#DEB887'],
    similar_ids: ['marble-coffee-table', 'scandinavian-desk'],
  },
  {
    id: 'velvet-sofa',
    name: 'LUXE Velvet Sofa',
    description: 'Indulge in the opulence of the LUXE Velvet Sofa. Its plush green velvet and deep cushions offer unparalleled comfort, making it the star of your living room.',
    price: 1299.99,
    category: 'Sofas',
    brand: 'Opulence Home',
    features: ['High-Density Foam Cushions', 'Kiln-Dried Hardwood Frame', 'Emerald Green Velvet'],
    tags_cv: ['sofa', 'green', 'velvet', 'living room', 'trending'],
    dominant_colors: ['#006400', '#2E8B57'],
    similar_ids: [],
  },
  {
    id: 'industrial-bookshelf',
    name: 'GRID Bookshelf',
    description: 'Organize your stories with the GRID Bookshelf. A perfect blend of raw metal and reclaimed wood, it adds an industrial edge to your study or living area.',
    price: 650.0,
    category: 'Storage',
    brand: 'Urban Loft',
    features: ['5-Tier Shelving', 'Powder-Coated Steel Frame', 'Reclaimed Pine Wood'],
    tags_cv: ['bookshelf', 'industrial', 'metal', 'wood'],
    dominant_colors: ['#2F4F4F', '#A0522D'],
    similar_ids: ['floating-wall-shelves'],
  },
  {
    id: 'marble-coffee-table',
    name: 'ORION Coffee Table',
    description: 'Elevate your living space with the ORION Coffee Table. A stunning piece of Carrara marble atop a geometric brass base creates a look of sophisticated modernity.',
    price: 750.0,
    category: 'Tables',
    brand: 'Celestia',
    features: ['Genuine Carrara Marble Top', 'Brushed Brass Base', 'Geometric Design'],
    tags_cv: ['coffee table', 'marble', 'modern', 'brass', 'popular'],
    dominant_colors: ['#FFFFFF', '#B8860B'],
    similar_ids: ['oak-dining-table', 'scandinavian-desk'],
  },
  {
    id: 'leather-armchair',
    name: 'LEGACY Armchair',
    description: 'The LEGACY Armchair is an instant classic. Wrapped in rich, top-grain brown leather, it promises to age gracefully, becoming a cherished part of your home for years to come.',
    price: 950.0,
    category: 'Chairs',
    brand: 'Heritage',
    features: ['Top-Grain Aniline Leather', 'Down-Feather Cushions', 'Solid Walnut Legs'],
    tags_cv: ['armchair', 'leather', 'brown', 'classic', 'trending'],
    dominant_colors: ['#800000', '#A52A2A'],
    similar_ids: ['minimalist-lounge-chair', 'blue-accent-chair'],
  },
  {
    id: 'wicker-pendant-light',
    name: 'BOHO Pendant Light',
    description: 'Cast a warm, patterned glow with the BOHO Pendant Light. Hand-woven from natural wicker, it introduces a touch of bohemian flair and soft, ambient lighting.',
    price: 180.0,
    category: 'Lighting',
    brand: 'Free Spirit',
    features: ['Hand-Woven Wicker', 'Adjustable Cord Length', 'Eco-Friendly Materials'],
    tags_cv: ['pendant light', 'wicker', 'bohemian', 'lighting'],
    dominant_colors: ['#F5DEB3', '#D2B48C'],
    similar_ids: [],
  },
  {
    id: 'four-poster-bed',
    name: 'SERENITY Bed',
    description: 'Drift into dreams with the SERENITY Four-Poster Bed. Its elegant wooden frame creates a cozy, private sanctuary, turning your bedroom into a peaceful retreat.',
    price: 1500.0,
    category: 'Beds',
    brand: 'Haven Sleep',
    features: ['Solid Mahogany Frame', 'Queen Size', 'Minimalist Canopy Design'],
    tags_cv: ['bed', 'four-poster', 'wood', 'bedroom'],
    dominant_colors: ['#A0522D', '#8B4513'],
    similar_ids: [],
  },
  {
    id: 'scandinavian-desk',
    name: 'FOCUS Desk',
    description: 'Find your focus with this Scandinavian-inspired desk. Simple, functional, and beautiful, its light wood finish and clean design promote a clear and productive mind.',
    price: 350.0,
    category: 'Tables',
    brand: 'Nordic Work',
    features: ['Two Storage Drawers', 'Solid Birch Legs', 'White Lacquer Top'],
    tags_cv: ['desk', 'scandinavian', 'office', 'wood', 'popular'],
    dominant_colors: ['#FFFFFF', '#E6D8AD'],
    similar_ids: ['oak-dining-table', 'marble-coffee-table'],
  },
  {
    id: 'blue-accent-chair',
    name: 'COBALT Accent Chair',
    description: 'Make a bold statement with the COBALT Accent Chair. Its striking navy blue upholstery and sculptural form provide a vibrant pop of color and sophisticated seating.',
    price: 399.0,
    category: 'Chairs',
    brand: 'ColorPop',
    features: ['Velvet-Like Fabric', 'Tapered Gold-Tipped Legs', 'Curved Backrest'],
    tags_cv: ['chair', 'blue', 'accent', 'modern'],
    dominant_colors: ['#000080', '#FFD700'],
    similar_ids: ['minimalist-lounge-chair', 'leather-armchair'],
  },
  {
    id: 'round-jute-rug',
    name: 'EARTH Round Rug',
    description: 'Ground your space with the EARTH Round Jute Rug. Hand-braided from natural fibers, its texture and organic shape add warmth and a rustic touch to any room.',
    price: 250.0,
    category: 'Rugs',
    brand: 'Terra Firma',
    features: ['100% Natural Jute', 'Hand-Braided', '8-Foot Diameter'],
    tags_cv: ['rug', 'jute', 'round', 'natural'],
    dominant_colors: ['#C2B280', '#D8C8A8'],
    similar_ids: [],
  },
  {
    id: 'floating-wall-shelves',
    name: 'NIMBUS Floating Shelves',
    description: 'Display your treasures on the NIMBUS Floating Shelves. Their invisible mounting and slim profile create a clean, minimalist look, making your items appear to float on the wall.',
    price: 120.0,
    category: 'Storage',
    brand: 'Aether',
    features: ['Set of 3 Shelves', 'High-Gloss White Finish', 'Internal Steel Bracket'],
    tags_cv: ['shelves', 'floating', 'minimalist', 'white'],
    dominant_colors: ['#FFFFFF', '#E5E5E5'],
    similar_ids: ['industrial-bookshelf'],
  },
];

export const products: Product[] = productsData.map(p => {
  const placeholder = PlaceHolderImages.find(img => img.id === p.id);
  if (!placeholder) {
    // Fallback for items that don't have a specific image in placeholder-images.json
    // This makes the data seeding more robust.
    const genericImage = PlaceHolderImages.find(img => img.id === 'hero-background');
    return {
      ...p,
      imageUrl: genericImage?.imageUrl || 'https://picsum.photos/seed/1/600/400',
      imageHint: p.category.toLowerCase(),
    };
  }
  return {
    ...p,
    imageUrl: placeholder.imageUrl,
    imageHint: placeholder.imageHint,
  };
});

export const getProducts = async (): Promise<Product[]> => {
  // In a real app, this would fetch from Firestore
  return Promise.resolve(products);
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  // In a real app, this would fetch from Firestore
  return Promise.resolve(products.find(p => p.id === id));
};

export const getProductsByIds = async (ids: string[]): Promise<Product[]> => {
  return Promise.resolve(products.filter(p => ids.includes(p.id)));
};

export const searchProducts = async (query: string): Promise<Product[]> => {
  const lowerCaseQuery = query.toLowerCase();
  return Promise.resolve(
    products.filter(product => {
      const searchableText = [
        product.name,
        product.description,
        product.category,
        product.brand,
        ...(product.tags_cv || [])
      ].join(' ').toLowerCase();
      return searchableText.includes(lowerCaseQuery);
    })
  );
};


export const getCategories = async (): Promise<string[]> => {
  const categories = new Set(products.map(p => p.category));
  return Promise.resolve(Array.from(categories));
};

export const getBrands = async (): Promise<string[]> => {
  const brands = new Set(products.map(p => p.brand));
  return Promise.resolve(Array.from(brands));
};

export const analyticsData = {
  totalVisits: 120456,
  clickThroughRate: 5.6,
  conversionRate: 2.3,
  topCategories: [
    { name: 'Chairs', value: 35 },
    { name: 'Tables', value: 25 },
    { name: 'Sofas', value: 20 },
    { name: 'Storage', value: 15 },
    { name: 'Lighting', value: 5 },
  ],
  topBrands: [
    { name: 'Moderno', value: 28 },
    { name: 'Natura', value: 22 },
    { name: 'Urban Loft', value: 18 },
    { name: 'Opulence Home', value: 15 },
    { name: 'Celestia', value: 17 },
  ],
  priceDistribution: [
    { range: '$0-250', count: 4 },
    { range: '$251-500', count: 4 },
    { range: '$501-1000', count: 3 },
    { range: '$1000+', count: 2 },
  ],
  salesOverTime: [
    { date: '2023-01-01', sales: 4000 },
    { date: '2023-02-01', sales: 3000 },
    { date: '2023-03-01', sales: 5000 },
    { date: '2023-04-01', sales: 4500 },
    { date: '2023-05-01', sales: 6000 },
    { date: '2023-06-01', sales: 5500 },
    { date: '2023-07-01', sales: 7000 },
  ],
};
