import React, { useState } from 'react';
import { Book } from '../types';

type BookFormData = Omit<Book, 'id' | 'addedAt'>;

interface BookFormProps {
  initialData?: Partial<BookFormData>;
  onSubmit: (data: BookFormData) => void;
  onCancel?: () => void;
}

const BookForm: React.FC<BookFormProps> = ({ 
  initialData = {}, 
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState<BookFormData>({
    title: initialData.title || '',
    author: initialData.author || '',
    coverImage: initialData.coverImage || '',
    status: initialData.status || 'to-read',
    rating: initialData.rating,
    startDate: initialData.startDate || '',
    finishDate: initialData.finishDate || '',
    pagesTotal: initialData.pagesTotal,
    pagesRead: initialData.pagesRead || 0,
    notes: initialData.notes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numberValue = value === '' ? undefined : Number(value);
    setFormData(prev => ({
      ...prev,
      [name]: numberValue
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    // Validate URL format if coverImage is provided
    if (formData.coverImage && !/^https?:\/\/.+/.test(formData.coverImage)) {
      newErrors.coverImage = 'Cover image must be a valid URL';
    }
    
    // Validate pagesRead against pagesTotal
    if (formData.pagesRead && formData.pagesTotal && formData.pagesRead > formData.pagesTotal) {
      newErrors.pagesRead = 'Pages read cannot be greater than total pages';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`input mt-1 ${errors.title ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              required
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700">
              Author *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`input mt-1 ${errors.author ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
              required
            />
            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author}</p>}
          </div>
          
          <div>
            <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700">
              Cover Image URL
            </label>
            <input
              type="text"
              id="coverImage"
              name="coverImage"
              value={formData.coverImage}
              onChange={handleChange}
              placeholder="https://example.com/book-cover.jpg"
              className={`input mt-1 ${errors.coverImage ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
            />
            {errors.coverImage && <p className="text-red-500 text-sm mt-1">{errors.coverImage}</p>}
          </div>
          
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="input mt-1"
            >
              <option value="to-read">To Read</option>
              <option value="reading">Currently Reading</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Rating (1-5)
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              value={formData.rating || ''}
              onChange={handleNumberChange}
              className="input mt-1"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="input mt-1"
            />
          </div>
          
          <div>
            <label htmlFor="finishDate" className="block text-sm font-medium text-gray-700">
              Finish Date
            </label>
            <input
              type="date"
              id="finishDate"
              name="finishDate"
              value={formData.finishDate}
              onChange={handleChange}
              className="input mt-1"
            />
          </div>
          
          <div>
            <label htmlFor="pagesTotal" className="block text-sm font-medium text-gray-700">
              Total Pages
            </label>
            <input
              type="number"
              id="pagesTotal"
              name="pagesTotal"
              min="1"
              value={formData.pagesTotal || ''}
              onChange={handleNumberChange}
              className="input mt-1"
            />
          </div>
          
          <div>
            <label htmlFor="pagesRead" className="block text-sm font-medium text-gray-700">
              Pages Read
            </label>
            <input
              type="number"
              id="pagesRead"
              name="pagesRead"
              min="0"
              value={formData.pagesRead || ''}
              onChange={handleNumberChange}
              className={`input mt-1 ${errors.pagesRead ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}`}
            />
            {errors.pagesRead && <p className="text-red-500 text-sm mt-1">{errors.pagesRead}</p>}
          </div>
        </div>
      </div>
      
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={formData.notes}
          onChange={handleChange}
          className="input mt-1"
          placeholder="Your thoughts about this book..."
        />
      </div>
      
      <div className="flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn-primary"
        >
          Save Book
        </button>
      </div>
    </form>
  );
};

export default BookForm;