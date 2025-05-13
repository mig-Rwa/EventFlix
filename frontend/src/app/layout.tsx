import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from '@/contexts/AuthContext';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EventFlixCyprus - Your Event Management Platform",
  description: "Discover, create, and manage events in Cyprus with ease",
};

import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.png" />
        <link rel="icon" type="image/png" sizes="64x64" href="/images/favicon.png" />
        <link rel="icon" href="/images/favicon.png" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navigation />
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
