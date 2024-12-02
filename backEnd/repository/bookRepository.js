import Book from '../models/bookModel.js';

export const findOne = async (title, author) => {
    return await Book.findOne({ title, author });
}

export const find = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const totalBooks = await Book.countDocuments();
  const totalPages = Math.ceil(totalBooks / limit);

  const books = await Book.find().skip(skip).limit(limit);

  return {
    books,
    currentPage: page,
    totalPages,
    totalBooks,
  };
};

export const createBook = async (title, author) => {
    return await Book.create({ title, author });
}