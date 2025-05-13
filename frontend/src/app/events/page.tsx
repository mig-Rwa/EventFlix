"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { format } from 'date-fns';

const mockEvents = [
  {
    id: 1,
    title: "The Barrel House Ball Room",
    organizer: "Cameron Whitcomb",
    price: 120,
    image: "/images/people-concert-with-smoke-overlay-texture.jpg",
    date: "2025-04-10",
  },
  {
    id: 2,
    title: "Resonant Language Crawdad Sniper Onyx Garden Waterchild Pluff",
    organizer: "AC C",
    price: 30,
    image: "/images/sample3.JPG",
    date: "2025-05-01",
  },
  {
    id: 3,
    title: "The Emo Festival Comes to Glasgow",
    organizer: "Classic Grand",
    price: 50,
    image: "/images/sample2.JPG",
    date: "2025-06-10",
  },
];

export default function EventsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("newest");

  return (
    <>
      <a href="/dashboard" className="fixed top-6 left-6 z-50 bg-black/60 text-white rounded px-4 py-2 shadow-lg hover:bg-black/80 backdrop-blur-md transition">Home</a>
      {/* rest of the page below */}
      <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative h-72 w-full flex items-center justify-center bg-black">
        <Image
          src="/images/hero-bg.jpg"
          alt="Events Hero"
          layout="fill"
          objectFit="cover"
          className="opacity-60"
        />
        <div className="absolute z-10 text-center w-full">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Buy and resell tickets
          </h1>
          <p className="text-xl md:text-2xl text-white drop-shadow-lg">
            EventFlixCyprus helps connect ticket buyers with event ticket resellers.
          </p>
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

      {/* Event Grid */}
      <div className="max-w-5xl mx-auto w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pb-12">
        {mockEvents.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
            <div className="relative h-48 w-full">
              <Image
                src={event.image}
                alt={event.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4">
              <div className="text-orange-600 font-bold text-lg mb-1">${event.price.toFixed(2)}</div>
              <div className="font-semibold text-gray-900 text-base mb-1 truncate">{event.title}</div>
              <div className="text-gray-600 text-sm mb-2">{event.organizer}</div>
              <div className="text-gray-500 text-xs mb-2">
                {format(new Date(event.date), 'dd/MM/yyyy')}
              </div>
              <Link href={`/events/${event.id}`} className="text-black hover:underline text-sm font-medium">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
} 