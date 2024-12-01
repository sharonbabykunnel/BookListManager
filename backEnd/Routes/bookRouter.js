import express from 'express'
import * as books from '../Controllers/bookController.js'
const rout = express.Router();

rout.get("/",  books.getBooks);
rout.post("/", books.postBooks);


export default rout;