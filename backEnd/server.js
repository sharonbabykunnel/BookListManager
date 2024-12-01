import express from 'express';
import auth from "./Routes/authRouter.js";
import books from './Routes/bookRouter.js'
import globalErrorHandler from './Controllers/errorController.js'

const router = express.Router();

router.use("/v1/auth", auth);
router.use("/v1/books", books);
router.all('*')

router.use(globalErrorHandler)

export default router;
