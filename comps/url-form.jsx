import React from "react";
import { useState } from "react";

export function UrlForm({ onShorten }) {
  const [url, setUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onShorten(url);
      setUrl("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gr rounded-lg">
      <input
        type="url"
        placeholder="Enter a long URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Shorten URL
      </button>
    </form>
  );
}
