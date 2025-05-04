"use client";

import type React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type {
  SessionALl,
  SpeakerAll,
  CategoryAll,
  RoomAll,
} from "sessionize_api";

interface SessionDetailDialogProps {
  session: SessionALl;
  speakers: SpeakerAll[];
  categories: CategoryAll[];
  rooms: RoomAll[];
  trigger: React.ReactNode;
}

export function SessionDetailDialog({
  session,
  speakers,
  categories,
  rooms,
  trigger,
}: SessionDetailDialogProps) {
  // Format date and time
  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return "TBA";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "TBA";
    const date = new Date(dateString);
    return date.toLocaleDateString([], {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Get room name
  const roomName = session.roomId
    ? rooms.find((room) => room.id === session.roomId)?.name || "TBA"
    : "TBA";

  // Get category names
  const sessionCategories = session.categoryItems
    .map((catId) => {
      for (const category of categories) {
        const item = category.items.find((item) => item.id === catId);
        if (item) return { name: item.name, type: category.title };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{session.title}</DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {sessionCategories.map(
              (category, index) =>
                category && (
                  <Badge key={index} variant="outline">
                    {category.name}
                  </Badge>
                )
            )}
            {session.isServiceSession && (
              <Badge variant="secondary">Service Session</Badge>
            )}
          </div>

          {/* Time and location */}
          <div className="grid gap-2">
            {session.startsAt && (
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatDate(session.startsAt)}</span>
              </div>
            )}
            {session.startsAt && session.endsAt && (
              <div className="flex items-center text-sm">
                <Clock className="h-4 w-4 mr-2" />
                <span>
                  {formatDateTime(session.startsAt)} -{" "}
                  {formatDateTime(session.endsAt)}
                </span>
              </div>
            )}
            {roomName !== "TBA" && (
              <div className="flex items-center text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{roomName}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-medium mb-2">Description</h3>
            {session.description ? (
              <div
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: session.description }}
              />
            ) : (
              <p className="text-gray-500 italic">No description available</p>
            )}
          </div>

          {/* Links */}
          <div className="space-y-2">
            {session.liveUrl && (
              <div>
                <a
                  href={session.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Join Live Session
                </a>
              </div>
            )}
            {session.recordingUrl && (
              <div>
                <a
                  href={session.recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Watch Recording
                </a>
              </div>
            )}
          </div>

          {/* Speakers */}
          {speakers.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-3">Speakers</h3>
              <div className="space-y-4">
                {speakers.map((speaker) => (
                  <div key={speaker.id} className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={speaker.profilePicture || ""}
                        alt={speaker.fullName}
                      />
                      <AvatarFallback>
                        {speaker.firstName.charAt(0)}
                        {speaker.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{speaker.fullName}</h4>
                      <p className="text-sm text-gray-500">{speaker.tagLine}</p>
                      {speaker.bio && (
                        <div
                          className="mt-2 text-sm prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: speaker.bio }}
                        />
                      )}
                      {speaker.links.length > 0 && (
                        <div className="mt-2 flex gap-2">
                          {speaker.links.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {link.title || link.linkType}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
