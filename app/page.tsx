import { fetchSessionizeData } from "@/lib/api";
import { SessionContainer } from "@/components/session-container";
import { redirect } from "next/navigation";

export default async function SessionsPage({
  searchParams,
}: {
  searchParams: { sessionKey?: string };
}) {
  const sessionKey = searchParams.sessionKey;

  if (!sessionKey) {
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
