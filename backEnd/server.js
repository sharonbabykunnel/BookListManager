import express from 'express';
import auth from "./Routes/authRouter.js";
import books from './Routes/bookRouter.js'
import globalErrorHandler from './Controllers/errorController.js'

const router = express.Router();

router.use("/", auth);
router.use("/books", books);
router.all('*')

router.use(globalErrorHandler)

export default router;
