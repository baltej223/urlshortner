'use client'
import React, { useState } from 'react'
import { UrlForm } from '../comps/url-form'
import { ShortenedUrl } from '../comps/shortned-url'

export default function UrlShortener() {
  const [shortenedUrl, setShortenedUrl] = useState(null)

  const handleShorten = async (longUrl) => {
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: longUrl }),
    })
    const data = await response.json()
    setShortenedUrl(data.key)
    console.log("Responce recived with key: ",data.key, "and JSON:", data);
  }

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="bg-gray-500 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 text-white">URL Shortener</h1>
        <UrlForm onShorten={handleShorten} />
        {shortenedUrl && <ShortenedUrl url={`${window.location.href}${shortenedUrl}`} />}
      </div>
    </div>
  )
}
