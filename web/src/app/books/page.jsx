"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '@/lib/appconstants';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortField, setSortField] = useState('title');
    const [sortDirection, setSortDirection] = useState('asc');
    const [genreFilter, setGenreFilter] = useState('');

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get(`${API_URL}/books`);
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const filterBooks = () => {
        return books.filter(book =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (genreFilter === '' || book.genre === genreFilter)
        ).sort((a, b) => {
            if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
            if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const handleGenreFilter = (e) => {
        setGenreFilter(e.target.value);
    };

    const filteredBooks = filterBooks();

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">Books</h1>
            <div className="mb-4">
                <input type="text" placeholder="Search books..." value={searchTerm} onChange={handleSearch} className="border border-gray-300 rounded px-3 py-2 w-full" />
            </div>
            <div className="mb-4">
                <label htmlFor="genre-filter" className="mr-2">Filter by genre:</label>
                <select id="genre-filter" value={genreFilter} onChange={handleGenreFilter} className="border border-gray-300 rounded px-3 py-2">
                    <option value="">All</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Biography">Biography</option>
                    <option value="Poetry">Poetry</option>
                </select>
            </div>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="p-2 cursor-pointer" onClick={() => handleSort('title')}>Title {sortField === 'title' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}</th>
                        <th className="p-2 cursor-pointer" onClick={() => handleSort('author')}>Author {sortField === 'author' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}</th>
                        <th className="p-2 cursor-pointer" onClick={() => handleSort('genre')}>Genre {sortField === 'genre' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}</th>
                        <th className="p-2 cursor-pointer" onClick={() => handleSort('published_date')}>Published Date {sortField === 'published_date' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}</th>
                        <th className="p-2 cursor-pointer" onClick={() => handleSort('rating')}>Rating {sortField === 'rating' && <span>{sortDirection === 'asc' ? '▲' : '▼'}</span>}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBooks.map(book => (
                        <tr key={book.id} className="border-b">
                            <td className="p-2">{book.title}</td>
                            <td className="p-2">{book.author}</td>
                            <td className="p-2">{book.genre}</td>
                            <td className="p-2">{book.published_date}</td>
                            <td className="p-2">{book.rating}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
