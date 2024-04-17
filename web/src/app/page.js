"use client";

import { CLASSMATE_API } from "@/lib/appconstants";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch(CLASSMATE_API)
      .then((response) => response.json())
      .then((data) => {
        const quote = Object.keys(data)[0];
        const author = data[quote];
        setQuote(quote);
        setAuthor(author);
      })
      .catch((error) => console.error("Error fetching quote:", error));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-32">
        {author && (
          <div className="flex  justify-center items-center">
            <div className="flex flex-col items-end">
              <span>{quote}</span>
              <span>~{author}</span>
            </div>
          </div>
        )}
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Book Library</h1>
          <p className="text-lg mb-8">
            Discover a world of books at your fingertips.
          </p>
          <Link
            href="/books"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md"
          >
            Explore Books
          </Link>
        </div>
      </section>

      <section className="bg-gradient-to-r from-violet-200 to-pink-200 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-md p-6">
              <h3 className="text-xl font-bold mb-4">Browse Books</h3>
              <p>Easily browse and search our extensive collection of books.</p>
            </div>
            <div className="bg-gray-100 rounded-md p-6">
              <h3 className="text-xl font-bold mb-4">Add New Books</h3>
              <p>
                Contribute to the library by adding new books to the collection.
              </p>
            </div>
            <div className="bg-gray-100 rounded-md p-6">
              <h3 className="text-xl font-bold mb-4">Ratings and Reviews</h3>
              <p>
                See what others think about the books and leave your own
                reviews.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-violet-300 to-pink-200 text-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-md p-6">
              <p className="mb-4">
                &ldquo;This is the best book library I&apos;ve ever used. The
                selection is incredible and the user experience is
                top-notch.&rdquo;
              </p>
              <p className="font-bold">- John Doe</p>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-md p-6">
              <p className="mb-4">
                &ldquo;I&apos;ve been using Book Library for years and it has
                been an invaluable resource for my research and personal
                reading. Highly recommended!&rdquo;
              </p>
              <p className="font-bold">- Jane Smith</p>
            </div>
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-md p-6">
              <p className="mb-4">
                &ldquo;Book Library has transformed the way I discover new
                books. The search and filtering tools make it so easy to find
                exactly what I&apos;m looking for.&rdquo;
              </p>
              <p className="font-bold">- Michael Johnson</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gradient-to-r from-lime-400 to-lime-500 text-white py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <p>&copy; 2023 Book Library. All rights reserved.</p>
          <div className="space-x-4">
            <Link href="/about" className="hover:text-gray-400">
              About
            </Link>
            <Link className="hover:text-gray-400" href="/contact">
              Contact
            </Link>
            <Link className="hover:text-gray-400" href="/privacy">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
