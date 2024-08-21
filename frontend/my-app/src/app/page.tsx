"use client";
import React from "react";
import { useState } from "react";

export default function Home() {
  const [openApiKey, setOpenApiKey] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const apiResponse = await fetch(
        "https://your-external-server.com/api/endpoint",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ openApiKey, query }),
        }
      );

      const data = await apiResponse.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse({ error: "Failed to fetch data from server" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Simple API Query Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="open_api_key"
              className="block text-sm font-medium text-gray-700"
            >
              Open API Key:
            </label>
            <input
              type="text"
              id="open_api_key"
              value={openApiKey}
              onChange={(e) => setOpenApiKey(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="query"
              className="block text-sm font-medium text-gray-700"
            >
              Query:
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Send
          </button>
        </form>

        {response && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2">Response:</h2>
            <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
