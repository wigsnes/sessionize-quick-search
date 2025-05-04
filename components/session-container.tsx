"use client";

import { useState } from "react";
import { SearchBar } from "@/components/search-bar";
import { SessionList } from "@/components/session-list";
import { FilterBar } from "@/components/filter-bar";
import type {
  SessionALl,
  SpeakerAll,
  CategoryAll,
  RoomAll,
} from "sessionize_api";

interface SessionContainerProps {
  initialData: {
    sessions: SessionALl[];
    speakers: SpeakerAll[];
    categories: CategoryAll[];
    rooms: RoomAll[];
  };
}

export function SessionContainer({ initialData }: SessionContainerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Extract unique categories from the data
  const categories = initialData.categories.flatMap((category) =>
    category.items.map((item) => ({
      id: item.id.toString(),
      name: item.name,
    }))
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Conference Sessions</h1>
      <div className="space-y-6 mb-6">
        <SearchBar searchTerm={searchQuery} onSearch={setSearchQuery} />
        <FilterBar
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={setSelectedCategories}
        />
      </div>
      <SessionList
        initialData={initialData}
        searchQuery={searchQuery}
        selectedCategories={selectedCategories}
      />
    </div>
  );
}
