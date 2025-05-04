import { getAll, SessionizeAll } from "sessionize_api";

export async function fetchSessionizeData(
  sessionKey: string
): Promise<SessionizeAll> {
  if (!sessionKey) {
    throw new Error("Session key is required");
  }

  const response = await getAll(sessionKey);
  return response;
}
