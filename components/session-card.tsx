"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Plane, Hotel } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { SessionALl, SpeakerAll, CategoryAll } from "sessionize_api";

interface SessionCardProps {
  session: SessionALl;
  speakers: SpeakerAll[];
  categories: CategoryAll[];
}

const getCompensationIcon = (itemId: number) => {
  switch (itemId) {
    case 352783:
      return { icon: null, tooltip: "No compensation needed" };
    case 352784:
      return { icon: <Plane className="h-4 w-4" />, tooltip: "Flights only" };
    case 352785:
      return {
        icon: <Hotel className="h-4 w-4" />,
        tooltip: "Accommodation only",
      };
    case 352786:
      return {
        icon: (
          <div className="flex items-center gap-2">
            <Plane className="h-4 w-4" />
            <Hotel className="h-4 w-4" />
          </div>
        ),
        tooltip: "Flights and accommodation",
      };
    default:
      return { icon: null, tooltip: "" };
  }
};

export function SessionCard({
  session,
  speakers,
  categories,
}: SessionCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Get category names and language
  const sessionCategories = session.categoryItems
    .map((catId) => {
      for (const category of categories) {
        const item = category.items.find((item) => item.id === catId);
        if (item) return { name: item.name, type: category.title };
      }
      return null;
    })
    .filter(Boolean);

  // Get field
  const field = sessionCategories.find((cat) => cat?.type === "Field")?.name;

  // Get language
  const language = sessionCategories
    .find((cat) => cat?.type === "Language")
    ?.name.toLowerCase();
  const languageFlag = language === "norwegian" ? "🇳🇴" : "🇬🇧";

  // Session length
  const sessionLength = sessionCategories.find(
    (cat) => cat?.type === "Session length"
  )?.name;

  const questions = session.questionAnswers;

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2 justify-between w-full">
          <Badge variant="outline" className="text-xs">
            {field}
          </Badge>
          {/* Session length */}
          <h4 className="text-lg">{sessionLength}</h4>

          <span
            className="text-2xl"
            title={language === "norwegian" ? "Norwegian" : "English"}
          >
            {languageFlag}
          </span>
        </div>
        <CardTitle className="line-clamp-2 mt-4">{session.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="h-full flex flex-col justify-between">
          {/* Description */}
          <div className="">
            {session.description ? (
              <div className={`text-sm ${expanded ? "" : "line-clamp-3"}`}>
                <div
                  dangerouslySetInnerHTML={{ __html: session.description }}
                />
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                No description available
              </p>
            )}

            {session.description && session.description.length > 150 && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 p-0 h-auto text-sm font-medium"
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? (
                  <span className="flex items-center">
                    Show less <ChevronUp className="ml-1 h-4 w-4" />
                  </span>
                ) : (
                  <span className="flex items-center">
                    Show more <ChevronDown className="ml-1 h-4 w-4" />
                  </span>
                )}
              </Button>
            )}
          </div>

          {/* Questions */}
          {questions.length > 0 && (
            <div className="mt-4 mr-16">
              <div className="flex flex-wrap gap-2">
                {questions.map((question) => (
                  <div
                    key={question.questionId}
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm">{question.answerValue}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        {speakers.length > 0 && (
          <div className="mt-4 w-full">
            <div className="flex flex-col gap-2">
              {speakers.map((speaker) => {
                const compensationType = categories
                  .find((cat) => cat.id === 97995)
                  ?.items.find((item) =>
                    speaker.categoryItems.includes(item.id)
                  );

                const { icon, tooltip } = compensationType
                  ? getCompensationIcon(compensationType.id)
                  : { icon: null, tooltip: "" };

                return (
                  <div key={speaker.id} className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={speaker.profilePicture || ""}
                        alt={speaker.fullName}
                      />
                      <AvatarFallback>
                        {speaker.firstName.charAt(0)}
                        {speaker.lastName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col flex-1">
                      <span className="text-sm">{speaker.fullName}</span>
                      <span className="text-xs font-light">
                        {[
                          speaker.questionAnswers.find(
                            (question) => question.questionId === 87799
                          )?.answerValue,
                          speaker.questionAnswers.find(
                            (question) => question.questionId === 97996
                          )?.answerValue,
                        ]
                          .filter(Boolean)
                          .join(" • ")}
                      </span>
                    </div>
                    {icon && (
                      <div className="ml-1" title={tooltip}>
                        {icon}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
