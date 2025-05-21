"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { format } from 'date-fns';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
const STATIC_URL = process.env.NEXT_PUBLIC_STATIC_URL;

function getImageUrl(imageUrl: string) {
  if (!imageUrl) return '/default-image.png';
  if (imageUrl.startsWith('http')) return imageUrl;
  // Use STATIC_URL for all images, always strip /api if present
  return `${STATIC_URL}${imageUrl.replace(/^\/api/, '')}`;
}


export default function EventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(`${API_URL}/events`);
        const data = await res.json();
        console.log("Fetched events data:", data);
        if (data && Array.isArray(data.events)) {
          setEvents(data.events);
        } else if (Array.isArray(data)) {
          setEvents(data);
        } else {
          setEvents([]);
        }
      } catch (err) {
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return (
    <>
      <a href="/dashboard" className="fixed top-6 left-6 z-50 bg-black/60 text-white rounded px-4 py-2 shadow-lg hover:bg-black/80 backdrop-blur-md transition">Home</a>
      {/* rest of the page below */}
      <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative h-72 w-full flex items-center justify-center bg-black">
        <Image
          src="/images/concert-crowd.jpg"
          alt="Concert Crowd Hero"
          layout="fill"
          objectFit="cover"
          className="opacity-70"
          priority
        />
        <div className="absolute z-10 text-center w-full px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            Discover Events
          </h1>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="max-w-5xl mx-auto w-full px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-1 gap-2">
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border rounded focus:outline-none"
          />
          <input
            type="text"
            placeholder="Location"
            className="w-full md:w-48 px-4 py-2 border rounded focus:outline-none"
          />
        </div>
        <div className="flex gap-2">
          <button className="border px-4 py-2 rounded bg-white">Category*</button>
          <button className="border px-4 py-2 rounded bg-white">Price</button>
        </div>
        <div className="flex items-center gap-2">
          <span>Sort by:</span>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="newest">Newest</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Events List */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading ? (
          <div>Loading events...</div>
        ) : events.length === 0 ? (
          <div>No events found.</div>
        ) : (
          events.map((event) => (
            <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Image
                src={getImageUrl(event.imageUrl)}
                alt={event.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="font-semibold text-gray-900 text-base mb-1 truncate">{event.title}</div>
                <div className="text-gray-600 text-sm mb-2">{event.location?.address || event.location}</div>
                <div className="text-gray-500 text-xs mb-2">
                  {format(new Date(event.date), 'dd/MM/yyyy')}
                </div>
                <Link href={`/events/${event._id}`} className="text-black hover:underline text-sm font-medium">
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
}