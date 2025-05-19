import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Book, BooksContextType } from '../types';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const BooksContext = createContext<BooksContextType>({
  books: [],
  currentReads: [],
  addBook: () => {},
  updateBook: () => {},
  deleteBook: () => {},
  isLoading: false,
});

export const useBooks = () => useContext(BooksContext);

export const BooksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { showToast } = useToast();

  // Load books from local storage on initial load
  useEffect(() => {
    if (user) {
      const storedBooks = localStorage.getItem(`booktracker_books_${user.id}`);
      if (storedBooks) {
        setBooks(JSON.parse(storedBooks));
      }
    }
    setIsLoading(false);
  }, [user]);

  // Save books to local storage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`booktracker_books_${user.id}`, JSON.stringify(books));
    }
  }, [books, user]);

  // Filter for books currently being read
  const currentReads = books.filter(book => book.status === 'reading');

  const addBook = (bookData: Omit<Book, 'id' | 'addedAt'>) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString(),
      addedAt: new Date().toISOString(),
    };
    
    setBooks(prevBooks => [...prevBooks, newBook]);
    showToast('success', `${newBook.title} has been added to your collection`);
  };

  const updateBook = (id: string, updates: Partial<Omit<Book, 'id' | 'addedAt'>>) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === id ? { ...book, ...updates } : book
      )
    );
    showToast('success', 'Book updated successfully');
  };

  const deleteBook = (id: string) => {
    const bookTitle = books.find(book => book.id === id)?.title;
    setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
    showToast('info', `${bookTitle || 'Book'} has been removed from your collection`);
  };

  return (
    <BooksContext.Provider value={{
      books,
      currentReads,
      addBook,
      updateBook,
      deleteBook,
      isLoading,
    }}>
      {children}
    </BooksContext.Provider>
  );
};