"use client";

import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterBarProps {
  categories: Array<{ id: string; name: string }>;
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export function FilterBar({
  categories,
  selectedCategories,
  onCategoryChange,
}: FilterBarProps) {
  const handleCategoryToggle = (categoryId: string) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter((id) => id !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge
          key={category.id}
          variant={
            selectedCategories.includes(category.id) ? "default" : "outline"
          }
          className="cursor-pointer"
          onClick={() => handleCategoryToggle(category.id)}
        >
          {category.name}
          {selectedCategories.includes(category.id) && (
            <X className="ml-1 h-3 w-3" />
          )}
        </Badge>
      ))}
    </div>
  );
}
