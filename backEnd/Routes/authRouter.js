import express from 'express'
import auth from './../Controllers/authController.js'
const rout = express.Router();

rout.post("/login", auth.signin);
rout.post("/register", auth.signup);
rout.post("/logout", auth.logout);

export default rout
