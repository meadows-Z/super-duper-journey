import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useBooks } from '../contexts/BooksContext';
import { Book } from '../types';
import Layout from '../components/Layout';
import BookCard from '../components/BookCard';
import BookDetail from '../components/BookDetail';

const HomePage: React.FC = () => {
  const { currentReads, isLoading } = useBooks();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const navigate = useNavigate();

  const handleAddBook = () => {
    navigate('/add-book');
  };

  return (
    <Layout>
      <section className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Current Reads</h1>
            <p className="text-gray-600 mt-1">Books you're currently reading</p>
          </div>
          <button 
            className="btn-primary mt-4 sm:mt-0 flex items-center"
            onClick={handleAddBook}
          >
            <Plus className="w-5 h-5 mr-1" />
            Add New Book
          </button>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : currentReads.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {currentReads.map(book => (
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No books added yet!</h2>
            <p className="text-gray-600 mb-4">
              Start tracking your reading journey by adding your first book.
            </p>
            <button 
              className="btn-primary"
              onClick={handleAddBook}
            >
              Add Your First Book
            </button>
          </div>
        )}
      </section>

      {selectedBook && (
        <BookDetail 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)} 
        />
      )}
    </Layout>
  );
};

export default HomePage;