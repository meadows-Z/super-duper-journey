import React from 'react';
import { Book as BookIcon, Star } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onClick }) => {
  return (
    <div 
      className="book-card cursor-pointer"
      onClick={onClick}
    >
      <div className="book-cover">
        {book.coverImage ? (
          <img 
            src={book.coverImage} 
            alt={`${book.title} cover`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <BookIcon className="w-12 h-12 text-gray-400" />
          </div>
        )}
        <div className="absolute top-0 right-0 m-2">
          {book.status === 'reading' && (
            <span className="bg-primary-600 text-white text-xs py-1 px-2 rounded-full">
              Reading
            </span>
          )}
          {book.status === 'completed' && (
            <span className="bg-success-500 text-white text-xs py-1 px-2 rounded-full">
              Completed
            </span>
          )}
          {book.status === 'to-read' && (
            <span className="bg-accent-500 text-white text-xs py-1 px-2 rounded-full">
              To Read
            </span>
          )}
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-900 truncate" title={book.title}>
          {book.title}
        </h3>
        <p className="text-sm text-gray-600 mt-1" title={book.author}>
          {book.author}
        </p>
        {book.rating && (
          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={`w-4 h-4 ${
                  index < book.rating! ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;