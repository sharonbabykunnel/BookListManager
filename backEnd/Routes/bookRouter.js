import express from 'express'
import * as books from '../Controllers/bookController.js'
import checkAccessToken from '../middleware/authMiddleware.js';
const rout = express.Router();

rout.get("/", checkAccessToken, books.getBooks);
rout.post("/", checkAccessToken, books.postBooks);


export default rout;