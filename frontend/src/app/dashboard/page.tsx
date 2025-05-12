"use client";

import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative h-[40vh] w-full flex items-center justify-center bg-black mb-8">
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
            Welcome{user ? `, ${user.firstName}` : ''}!
          </h1>
          <p className="text-lg md:text-xl text-white mb-4 drop-shadow-lg">
            Manage your events, tickets, and profile all in one place.
          </p>
          <Link
            href="/events"
            className="inline-block bg-black hover:bg-gray-800 text-white text-lg font-semibold px-8 py-3 rounded shadow transition"
          >
            Browse Events
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Upcoming Events</h2>
            <p className="text-gray-500">You have no upcoming events. <Link href="/events" className="text-black hover:underline">Browse events</Link>.</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Your Tickets</h2>
            <p className="text-gray-500">No tickets yet. <Link href="/events" className="text-black hover:underline">Get tickets</Link>.</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link href="/events" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Browse Events</Link>
            {user?.role === 'organizer' && (
              <Link href="/create-event" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Create Event</Link>
            )}
            <Link href="/profile" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">View Profile</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
} 