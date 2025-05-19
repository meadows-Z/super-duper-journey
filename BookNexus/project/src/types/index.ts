export interface User {
  id: string;
  username: string;
  email: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  status: 'reading' | 'completed' | 'to-read';
  rating?: number;
  startDate?: string;
  finishDate?: string;
  pagesTotal?: number;
  pagesRead?: number;
  notes?: string;
  addedAt: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

export interface BooksContextType {
  books: Book[];
  currentReads: Book[];
  addBook: (book: Omit<Book, 'id' | 'addedAt'>) => void;
  updateBook: (id: string, updates: Partial<Omit<Book, 'id' | 'addedAt'>>) => void;
  deleteBook: (id: string) => void;
  isLoading: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (type: ToastMessage['type'], message: string) => void;
  removeToast: (id: string) => void;
}