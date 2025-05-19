import React, { useState } from 'react';
import { X, Edit2, Trash2, Calendar, Book as BookIcon, Clock, Star } from 'lucide-react';
import { Book } from '../types';
import BookForm from './BookForm';
import { useBooks } from '../contexts/BooksContext';

interface BookDetailProps {
  book: Book;
  onClose: () => void;
}

const BookDetail: React.FC<BookDetailProps> = ({ book, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateBook, deleteBook } = useBooks();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      deleteBook(book.id);
      onClose();
    }
  };

  const handleSave = (updatedBook: Omit<Book, 'id' | 'addedAt'>) => {
    updateBook(book.id, updatedBook);
    setIsEditing(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  const getProgressPercentage = () => {
    if (!book.pagesTotal || !book.pagesRead) return 0;
    return Math.min(Math.round((book.pagesRead / book.pagesTotal) * 100), 100);
  };

  if (isEditing) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div 
          className="modal-content p-6 max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Edit Book</h2>
            <button 
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsEditing(false)}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <BookForm
            initialData={{
              title: book.title,
              author: book.author,
              coverImage: book.coverImage,
              status: book.status,
              rating: book.rating,
              startDate: book.startDate,
              finishDate: book.finishDate,
              pagesTotal: book.pagesTotal,
              pagesRead: book.pagesRead,
              notes: book.notes,
            }}
            onSubmit={handleSave}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="md:flex">
          <div className="md:w-1/3 bg-gray-100 p-6 flex flex-col items-center">
            <div className="relative w-48 h-72 shadow-lg rounded overflow-hidden mb-4">
              {book.coverImage ? (
                <img 
                  src={book.coverImage} 
                  alt={`${book.title} cover`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <BookIcon className="w-16 h-16 text-gray-400" />
                </div>
              )}
            </div>
            <div className="text-center">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-2
                ${book.status === 'reading' ? 'bg-primary-600' : 
                  book.status === 'completed' ? 'bg-success-500' : 'bg-accent-500'}`}>
                {book.status === 'reading' ? 'Currently Reading' : 
                  book.status === 'completed' ? 'Completed' : 'To Read'}
              </span>
              {book.rating && (
                <div className="flex items-center justify-center mt-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={`w-5 h-5 ${
                        index < book.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
                <p className="text-lg text-gray-600 mt-1">by {book.author}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="w-5 h-5 text-gray-500" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
                <button 
                  className="p-2 rounded-full hover:bg-gray-100"
                  onClick={onClose}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-primary-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Started</p>
                  <p className="text-gray-700">{formatDate(book.startDate)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-primary-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Finished</p>
                  <p className="text-gray-700">{formatDate(book.finishDate)}</p>
                </div>
              </div>
              <div className="flex items-center">
                <BookIcon className="w-5 h-5 text-primary-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Pages</p>
                  <p className="text-gray-700">{book.pagesTotal || 'Unknown'}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-primary-600 mr-2" />
                <div>
                  <p className="text-sm text-gray-500">Added on</p>
                  <p className="text-gray-700">{formatDate(book.addedAt)}</p>
                </div>
              </div>
            </div>
            
            {(book.pagesRead && book.pagesTotal) ? (
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <p className="text-sm text-gray-600">Progress</p>
                  <p className="text-sm text-gray-600">{getProgressPercentage()}%</p>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-primary-600 h-2.5 rounded-full" 
                    style={{ width: `${getProgressPercentage()}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {book.pagesRead} of {book.pagesTotal} pages read
                </p>
              </div>
            ) : null}
            
            {book.notes && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Notes</h3>
                <p className="text-gray-700 whitespace-pre-line">{book.notes}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;