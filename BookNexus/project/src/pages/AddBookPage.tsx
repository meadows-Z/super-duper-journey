import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useBooks } from '../contexts/BooksContext';
import Layout from '../components/Layout';
import BookForm from '../components/BookForm';
import { Book } from '../types';

const AddBookPage: React.FC = () => {
  const { addBook } = useBooks();
  const navigate = useNavigate();

  const handleSubmit = (bookData: Omit<Book, 'id' | 'addedAt'>) => {
    addBook(bookData);
    navigate('/home');
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-accent-600 hover:text-accent-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-1" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">Add New Book</h1>
          <p className="text-gray-600 mt-1">Fill in the details to add a new book to your collection</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <BookForm onSubmit={handleSubmit} />
        </div>
      </div>
    </Layout>
  );
};

export default AddBookPage;