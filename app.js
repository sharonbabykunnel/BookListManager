import dotenv from 'dotenv'
dotenv.config();
console.log("DB_URL:", process.env.DB_URL,'sdf');
import express from 'express'
import cors from 'cors'
import routes from './backEnd/server.js'
import cookieParser from 'cookie-parser'
import db from './backEnd/config/database.js'

db()
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS", "PUT"],
  })
);
app.options('*', cors());
app.use('/api', routes);

app.listen(process.env.PORT, () => {
  console.log("server is running...");
});