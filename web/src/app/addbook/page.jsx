"use client"

import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '@/lib/appconstants';

export default function AddBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [genre, setGenre] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [rating, setRating] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/books`, {
                title,
                author,
                description,
                genre,
                published_date: publishedDate,
                rating
            });
            setTitle('');
            setAuthor('');
            setDescription('');
            setGenre('');
            setPublishedDate('');
            setRating(0);
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Add Book</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-medium mb-1">Title</label>
                    <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="author" className="block font-medium mb-1">Author</label>
                    <input type="text" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="description" className="block font-medium mb-1">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full"></textarea>
                </div>
                <div>
                    <label htmlFor="genre" className="block font-medium mb-1">Genre</label>
                    <select id="genre" value={genre} onChange={(e) => setGenre(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full">
                        <option value="">Select a genre</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Biography">Biography</option>
                        <option value="Poetry">Poetry</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="published-date" className="block font-medium mb-1">Published Date</label>
                    <input type="date" id="published-date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" />
                </div>
                <div>
                    <label htmlFor="rating" className="block font-medium mb-1">Rating</label>
                    <input type="number" id="rating" min="0" max="5" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} className="border border-gray-300 rounded px-3 py-2 w-full" />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded">Add Book</button>
            </form>
        </div>
    );
}