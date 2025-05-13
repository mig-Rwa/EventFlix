'use client';

import { useState } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Image from "next/image";
import { format } from 'date-fns';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  // TODO: Replace with actual featured events from API
  const featuredEvents = [
    {
      id: 1,
      title: 'Summer Music Festival',
      date: '2024-07-15',
      location: 'Central Park, NY',
      image: '/images/event1.jpg',
      price: '$99',
    },
    {
      id: 2,
      title: 'Tech Conference 2024',
      date: '2024-08-20',
      location: 'Convention Center, SF',
      image: '/images/event2.jpg',
      price: '$299',
    },
    {
      id: 3,
      title: 'Food & Wine Expo',
      date: '2024-09-10',
      location: 'Exhibition Hall, LA',
      image: '/images/event3.jpg',
      price: '$75',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center text-white h-[500px] bg-gray-50"
        style={{
          backgroundImage: "url('/images/concert-crowd.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Image
          src="/images/concert-crowd.jpg"
          alt="Concert Crowd Hero"
          layout="fill"
          objectFit="cover"
          className="opacity-70"
          priority
        />
        <div className="absolute z-10 text-center w-full px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Ticketing for events
          </h1>
          <p className="text-xl md:text-2xl text-black mb-8 drop-shadow-lg">
            Made <span className="italic">for</span> event creators, <span className="italic">by</span> event creators.
          </p>
          <Link
            href="/events"
            className="inline-block bg-black/60 text-white text-lg font-semibold px-8 py-3 rounded shadow-lg transition hover:bg-black/80 backdrop-blur-md"
          >
            Browse Events
          </Link>
        </div>
      </section>

      {/* Tagline, Search Bar, and Scroll Indicator */}
      <div className="flex flex-col items-center justify-center py-8 bg-gray-50">
        {/* Tagline */}
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-black mb-3">Discover, Attend, and Experience Unforgettable Events!</h2>
        {/* Search Bar */}
        <form className="w-full max-w-md flex mb-6" onSubmit={e => { e.preventDefault(); }}>
          <input
            type="text"
            placeholder="Search for events, artists, or venues..."
            className="flex-1 px-4 py-3 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button type="submit" className="px-6 py-3 bg-black text-white rounded-r-md font-semibold hover:bg-gray-900 transition">Search</button>
        </form>
        {/* Animated Scroll Down Indicator */}
        <div className="flex flex-col items-center mt-2">
          <span className="animate-bounce text-4xl text-black/40">&#8595;</span>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Events</h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group"
            >
              <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black">
                    {event.title}
                  </h3>
                  <div className="mt-2 text-gray-500">
                    <p>{format(new Date(event.date), 'dd/MM/yyyy')}</p>
                    <p>{event.location}</p>
                  </div>
                  <div className="mt-4">
                    <span className="text-lg font-bold text-black">
                      {event.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {['Music', 'Sports', 'Arts', 'Food', 'Business', 'Technology'].map(
              (category) => (
                <Link
                  key={category}
                  href={`/events?category=${category.toLowerCase()}`}
                  className="bg-white rounded-lg shadow p-6 text-center hover:shadow-md transition-shadow duration-300"
                >
                  <h3 className="text-lg font-medium text-gray-900">
                    {category}
                  </h3>
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
}
