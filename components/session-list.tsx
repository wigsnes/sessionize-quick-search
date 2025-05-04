"use client";

import { SessionCard } from "@/components/session-card";
import type {
  SessionALl,
  SpeakerAll,
  CategoryAll,
  RoomAll,
} from "sessionize_api";

interface SessionListProps {
  initialData: {
    sessions: SessionALl[];
    speakers: SpeakerAll[];
    categories: CategoryAll[];
    rooms: RoomAll[];
  };
  searchQuery: string;
  selectedCategories: string[];
}

export function SessionList({
  initialData,
  searchQuery,
  selectedCategories,
}: SessionListProps) {
  const query = searchQuery.toLowerCase();

  const filteredSessions = initialData.sessions.filter((session) => {
    // Filter by search query
    const matchesQuery =
      !query ||
      session.title.toLowerCase().includes(query) ||
      session.description?.toLowerCase().includes(query) ||
      initialData.speakers
        .filter((speaker) => session.speakers.includes(speaker.id))
        .some((speaker) => speaker.fullName.toLowerCase().includes(query));

    const sessionSpeakers = initialData.speakers.filter((speaker) =>
      session.speakers.includes(speaker.id)
    );

    // Filter by categories
    const matchesCategories =
      selectedCategories.length === 0 ||
      selectedCategories.some(
        (catId) =>
          session.categoryItems.includes(parseInt(catId)) ||
          sessionSpeakers.some((speaker) =>
            speaker.categoryItems.includes(parseInt(catId))
          )
      );

    return matchesQuery && matchesCategories;
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredSessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          speakers={initialData.speakers.filter((speaker) =>
            session.speakers.includes(speaker.id)
          )}
          categories={initialData.categories}
        />
      ))}
    </div>
  );
}
