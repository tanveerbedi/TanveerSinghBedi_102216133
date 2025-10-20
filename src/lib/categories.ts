
export const CATEGORY_MAP = {
  tables: { label: "Tables", anchor: "tables" },
  sofas:  { label: "Sofas",  anchor: "sofas"  },
  chairs: { label: "Chairs", anchor: "chairs" },
} as const;

export type CategoryKey = keyof typeof CATEGORY_MAP;

export function normalizeCategory(input?: string): CategoryKey | null {
  if (!input) return null;
  const s = input.toLowerCase();
  
  if (s.includes('sofa') || s.includes('couch') || s.includes('sectional')) return "sofas";
  if (s.includes('chair') || s.includes('armchair') || s.includes('stool')) return "chairs";
  if (s.includes('table') || s.includes('desk')) return "tables";
  
  // Fallback for exact category matches
  if (s === 'sofas') return 'sofas';
  if (s === 'chairs') return 'chairs';
  if (s === 'tables') return 'tables';

  return null;
}
