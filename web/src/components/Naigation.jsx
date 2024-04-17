import Link from 'next/link';

export default function Navigation() {
    return (
        <nav className="bg-gradient-to-r from-lime-400 to-lime-500 py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white font-bold text-2xl">
                    <Link href="/">
                        Book Library
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link href="/books" className="bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-2 rounded-sm text-gray-300 hover:text-white">
                        Books
                    </Link>
                    <Link href="/addbook" className="bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-2 rounded-sm text-gray-300 hover:text-white">
                        Add Book
                    </Link>
                    <Link href="/dict" className="bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-2 rounded-sm text-gray-300 hover:text-white">
                        Dictionary
                    </Link>
                </div>
            </div>
        </nav>
    );
}