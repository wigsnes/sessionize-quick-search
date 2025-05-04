"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SetupPage() {
  const router = useRouter();
  const [sessionKey, setSessionKey] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/?sessionKey=${sessionKey}`);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Setup Sessionize Search</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label
            htmlFor="sessionKey"
            className="block text-sm font-medium mb-2"
          >
            Sessionize Session Key
          </label>
          <input
            type="text"
            id="sessionKey"
            value={sessionKey}
            onChange={(e) => setSessionKey(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter your Sessionize session key"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Start Searching
        </button>
      </form>
    </div>
  );
}
