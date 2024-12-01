import express from 'express'
import auth from './../Controllers/authController.js'
const rout = express.Router();

rout.post("/login", auth.login);
rout.post("/register", auth.register);
rout.post("/logout", auth.logout);
rout.patch("/password", auth.setPassword);

export default rout
