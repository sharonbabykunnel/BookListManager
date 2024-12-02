import * as Books from '../repository/bookRepository.js';
import { ConflictError } from '../utils/errorHandler.js';

export const createBook = async (title, author) => {
    //checking the book is allready precent in the database
    const checkTheBook = await Books.findOne(title, author);
    if (checkTheBook) {
        throw new ConflictError('Book is all ready added')
    }
    // creating new book
    const newBook = await Books.createBook(title, author);
    return newBook;
}

export const getBooks = async (page = 1, limit = 10) => {
    //get 10 books based on the page
  const result = await Books.find(page, limit);
  return result;
};