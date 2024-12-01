import * as Books from '../repository/bookRepository.js';
import { ConflictError } from '../utils/errorHandler.js';

export const createBook = async (title, author) => {
    const checkTheBook = await Books.findOne(title, author);
    if (checkTheBook) {
        throw new ConflictError('Book is all ready added')
    }
    console.log(checkTheBook,'wer')

    const newBook = await Books.createBook(title, author);
    console.log(newBook)
    return newBook;
}

export const getBooks = async () => {
    const books = await Books.find();
    return books
}