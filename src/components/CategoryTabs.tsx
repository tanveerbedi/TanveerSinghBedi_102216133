
"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { label:"All", href:"#top" },
  { label:"Tables", href:"#tables" },
  { label:"Sofas", href:"#sofas" },
  { label:"Chairs", href:"#chairs" },
];
export function CategoryTabs(){
  const sp = useSearchParams();
  const activeCategory = sp.get('category');

  return (
    <div className="sticky top-16 bg-background/95 backdrop-blur-sm z-10 py-2 -mx-6 px-6 border-b">
        <div className="flex gap-3 overflow-x-auto">
        {tabs.map(t=>(
            <a key={t.label} href={t.href}
               className={cn(
                "px-3 py-1.5 rounded-full border text-sm whitespace-nowrap transition-colors",
                t.href.substring(1) === activeCategory || (t.label === 'All' && !activeCategory)
                  ? "bg-primary text-primary-foreground border-transparent"
                  : "border-input bg-transparent hover:bg-accent hover:text-accent-foreground"
               )}>
            {t.label}
            </a>
        ))}
        </div>
    </div>
  );
}
