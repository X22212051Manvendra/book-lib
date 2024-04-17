"use client"

import { useState, useEffect } from 'react';

export default function DictionaryPage() {
    const [data, setData] = useState([]);
    const [word, setWord] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
                if (!response.ok) {
                    throw new Error(`No such word ${word}, Please try again`);
                }
                const json = await response.json();
                setData(json);
                setError(null);
            } catch (err) {
                setError(err.message);
            }
        };
        fetchData();
    }, [word]);

    const handleWordChange = (event) => {
        setWord(event.target.value);
    };

    return (
        <div className="container mx-auto my-10">
            <div className="mb-6">
                <label htmlFor="word-input" className="block font-bold mb-2">
                    Enter a word:
                </label>
                <input
                    id="word-input"
                    type="text"
                    value={word}
                    onChange={handleWordChange}
                    className="border border-gray-300 rounded px-3 py-2 w-full"
                />
            </div>
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}
            {Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                    <div key={index} className="mb-10">
                        <h2 className="text-2xl font-bold mb-4">Word: {item.word}</h2>
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 bg-gray-200 border">Audio</th>
                                    <th className="px-4 py-2 bg-gray-200 border">Meanings</th>
                                    <th className="px-4 py-2 bg-gray-200 border">Part of Speech</th>
                                    <th className="px-4 py-2 bg-gray-200 border">Synonyms</th>
                                </tr>
                            </thead>
                            <tbody>
                                {item.meanings?.map((meaning, i) => (
                                    <tr key={i}>
                                        <td className="px-4 py-2 border">
                                            {item.phonetics?.map((phonetic, j) => (
                                                <audio key={j} controls>
                                                    <source src={phonetic.audio} type="audio/mpeg" />
                                                </audio>
                                            ))}
                                        </td>
                                        <td className="px-4 py-2 border">
                                            {meaning.definitions.map((definition, k) => (
                                                <div key={k}>
                                                    <p>{definition.definition}</p>
                                                    {definition.example && <p><span className='font-bold'>Example: </span> {definition.example || '-'}</p>}
                                                </div>
                                            ))}
                                        </td>
                                        <td className="px-4 py-2 border">{meaning.partOfSpeech}</td>
                                        <td className="px-4 py-2 border">
                                            {meaning.synonyms?.join(', ') || '-'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                <div className="text-center">Loading...</div>
            )}
        </div>
    );
}