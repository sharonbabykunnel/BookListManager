import express from 'express'
import user from '../Controllers/bookController.js'
const rout = express.Router();

rout.get("/books",  user.getUser);
rout.post("/books",  user.getUser);


export default rout;