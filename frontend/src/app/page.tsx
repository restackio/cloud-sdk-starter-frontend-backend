"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [openApiKey, setOpenApiKey] = useState<string>("");
  const [query, setQuery] = useState<string>(
    "what does the document say about ai?"
  );
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [serverStatus, setServerStatus] = useState<string>("unknown");
  const [pingLoading, setPingLoading] = useState<boolean>(false);
  const [apiRootUrl, setApiRootUrl] = useState<string>("");

  useEffect(() => {
    const protocol = window.location.protocol;
    setApiRootUrl(`${protocol}//${process.env.NEXT_PUBLIC_API_HOSTNAME}`);
  }, []);

  const pingServer = async () => {
    setPingLoading(true);
    try {
      const response = await fetch(apiRootUrl);
      const data = await response.json();
      if (data.status === "ok") {
        setServerStatus("ok");
      } else {
        setServerStatus("error");
      }
    } catch (error) {
      console.error("Error pinging server:", error);
      setServerStatus("error");
    } finally {
      setPingLoading(false);
    }
  };

  useEffect(() => {
    if (apiRootUrl) {
      pingServer();
    }
  }, [apiRootUrl]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiResponse = await fetch(`${apiRootUrl}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ api_key: openApiKey, q: query }),
      });

      const data = await apiResponse.json();
      setResponse(data.result);
    } catch (error) {
      console.error("Error fetching data:", error);
      setResponse({ error: "Failed to fetch data from server" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-white">
          Simple API Query Form
        </h1>

        <div className="flex items-center mb-6">
          <button
            onClick={pingServer}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            disabled={pingLoading}
          >
            {pingLoading ? "Pinging..." : "Ping Server"}
          </button>
          <div className="flex items-center ml-4">
            <div
              className={`w-4 h-4 rounded-full ${
                pingLoading || serverStatus !== "ok"
                  ? "bg-red-500"
                  : "bg-green-500"
              }`}
            ></div>
            {serverStatus === "ok" && !pingLoading && (
              <span className="ml-2 text-white text-sm">
                backend server reachable
              </span>
            )}
            {serverStatus !== "ok" && !pingLoading && (
              <span className="ml-2 text-white text-sm">
                backend server unreachable
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="open_api_key"
              className="block text-sm font-medium text-gray-300"
            >
              Open API Key:
            </label>
            <input
              type="text"
              id="open_api_key"
              value={openApiKey}
              placeholder="sk-proj-..."
              onChange={(e) => setOpenApiKey(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
            />
          </div>
          <div>
            <label
              htmlFor="query"
              className="block text-sm font-medium text-gray-300"
            >
              Query:
            </label>
            <input
              type="text"
              id="query"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              loading || serverStatus !== "ok" || !openApiKey
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            }`}
            disabled={
              loading || pingLoading || serverStatus !== "ok" || !openApiKey
            }
          >
            {loading ? "Loading..." : "Send"}
          </button>
        </form>

        {response && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-2 text-white">Response:</h2>
            <pre className="bg-gray-700 p-4 rounded text-white whitespace-pre-wrap break-words">
              {JSON.stringify(response, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
