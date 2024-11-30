import express from 'express';
import auth from "./Routes/authRouter.js";
import books from './Routes/bookRouter.js'


const router = express.Router();

router.use("/", auth);
router.use("/books", books);

export default router;
