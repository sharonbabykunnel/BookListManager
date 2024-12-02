import asyncHandler from "../middleware/asyncHandler.js";
import * as bookService from '../service/book.service.js';

export const getBooks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const result = await bookService.getBooks(page, limit);

  res.status(200).json({
    message: "Success",
    success: true,
    ...result,
  });
});

export const postBooks = asyncHandler(async (req, res) => {
    const { title, author } = req.body;
    console.log(title, author, 'cheking')
    const book = await bookService.createBook(title, author);
    console.log('book',book)
    res.status(200).json({ message: 'Book added successfully', success: true, book })
});