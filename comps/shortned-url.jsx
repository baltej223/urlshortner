import React from "react"

export function ShortenedUrl({ url }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2 text-white">Shortened URL:</h2>
      <div className="flex space-x-2">
        <input
          value={url}
          readOnly
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none"
        />
        <button
          onClick={copyToClipboard}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Copy
        </button>
      </div>
    </div>
  )
}

