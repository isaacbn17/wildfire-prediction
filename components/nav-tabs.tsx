"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/predict", label: "Predict" },
  { href: "/images", label: "Images" },
];

export function NavTabs() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-2">
      {tabs.map((tab) => {
        const isActive =
          tab.href === "/" ? pathname === "/" : pathname?.startsWith(tab.href);

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-md border border-transparent px-3 py-1.5 text-sm font-medium transition-colors hover:border-primary hover:text-primary",
              isActive && "border-primary bg-primary/10 text-primary",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
