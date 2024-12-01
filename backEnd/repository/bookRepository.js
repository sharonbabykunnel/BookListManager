import Book from '../models/bookModel.js';

export const findOne = async (title, author) => {
    return await Book.findOne({ title, author });
}

export const find = async () => {
    return await Book.find();
}

export const createBook = async (title, author) => {
    return await Book.create({ title, author });
}