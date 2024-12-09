import express from 'express';
import auth from "./Routes/authRouter.js";
import books from './Routes/bookRouter.js'
import globalErrorHandler from './Controllers/errorController.js'

const router = express.Router();

router.use("/v1/auth", auth);
router.use("/v1/books", books);

router.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

router.use(globalErrorHandler)

export default router;