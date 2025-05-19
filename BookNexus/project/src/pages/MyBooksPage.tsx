import React, { useState } from 'react';
import { useBooks } from '../contexts/BooksContext';
import { Book } from '../types';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';
import BookDetail from '../components/BookDetail';

const MyBooksPage: React.FC = () => {
  const { books, isLoading } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [filter, setFilter] = useState<'all' | 'reading' | 'to-read' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = books
    .filter(book => filter === 'all' || book.status === filter)
    .filter(book => 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getStatusCount = (status: 'reading' | 'to-read' | 'completed') => {
    return books.filter(book => book.status === status).length;
  };

  const statusFilters = [
    { id: 'all', label: 'All Books', count: books.length },
    { id: 'reading', label: 'Currently Reading', count: getStatusCount('reading') },
    { id: 'to-read', label: 'To Read', count: getStatusCount('to-read') },
    { id: 'completed', label: 'Completed', count: getStatusCount('completed') },
  ];

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">My Books</h1>
        <p className="text-gray-600 mt-1">Explore your complete book collection</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-800">Filters</h2>
            </div>
            <div className="p-4">
              <input
                type="text"
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input mb-4"
              />
              
              <div className="space-y-2">
                {statusFilters.map((statusFilter) => (
                  <button
                    key={statusFilter.id}
                    onClick={() => setFilter(statusFilter.id as any)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                      filter === statusFilter.id
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{statusFilter.label}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        filter === statusFilter.id
                          ? 'bg-primary-100 text-primary-800'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {statusFilter.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onClick={() => setSelectedBook(book)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center">
              <div className="bg-gray-100 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-4">
                <svg className="h-10 w-10 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No books found</h2>
              <p className="text-gray-600">
                {searchQuery 
                  ? `No books match the search "${searchQuery}"`
                  : filter !== 'all' 
                    ? `You don't have any books marked as "${filter}"`
                    : "Your book collection is empty"
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedBook && (
        <BookDetail 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      )}
    </Layout>
  );
};

export default MyBooksPage;