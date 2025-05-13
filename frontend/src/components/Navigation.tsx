"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/images/favicon.png" alt="EventFlixCyprus Logo" className="h-7 w-7" />
              <span className="text-2xl font-bold text-black">EventFlixCyprus</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/events"
                className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
              >
                Events
              </Link>
              {user && (
                <>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
                  >
                    Dashboard
                  </Link>
                  {user.role === 'organizer' && (
                    <Link
                      href="/create-event"
                      className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-700"
                    >
                      Create Event
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="ml-3 relative">
                <div>
                  <button
                    type="button"
                    className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center">
                      <span className="text-white font-medium">
                        {user?.firstName?.[0] || ''}
                      </span>
                    </div>
                  </button>
                </div>
                {isMenuOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/tickets"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Your Tickets
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/login"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-black/60 text-white px-4 py-2 rounded-md text-sm font-medium shadow-lg hover:bg-black/80 backdrop-blur-md"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-black"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/events"
              className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
            >
              Events
            </Link>
            {user && (
              <>
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                >
                  Dashboard
                </Link>
                {user.role === 'organizer' && (
                  <Link
                    href="/create-event"
                    className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  >
                    Create Event
                  </Link>
                )}
              </>
            )}
          </div>
          {!user && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                </div>
                <div className="ml-3">
                  <Link
                    href="/signup"
                    className="block px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
} 