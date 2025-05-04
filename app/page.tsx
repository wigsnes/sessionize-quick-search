import { fetchSessionizeData } from "@/lib/api";
import { SessionContainer } from "@/components/session-container";
import { redirect } from "next/navigation";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SessionsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const sessionKey = params.sessionKey;

  if (!sessionKey || typeof sessionKey !== "string") {
    redirect("/setup");
  }

  try {
    const data = await fetchSessionizeData(sessionKey);

    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Conference Sessions</h1>
        <SessionContainer initialData={data} />
      </div>
    );
  } catch {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-red-600">Error</h1>
        <p className="text-lg">
          Invalid session key. Please check your URL and try again.
        </p>
      </div>
    );
  }
}
