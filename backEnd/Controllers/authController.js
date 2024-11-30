import asyncHandler from './../middleware/asyncHandler.js';
import * as authService from './../service/auth.service.js';

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const {user, accessToken} = await authService.login(email, password);
  res.status(200).json({ user, accessToken, success:true, message:'Logined successfully.' });
});

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const { user, accessToken } = await authService.register(name, email, password)
  res.status(201).json({ user, accessToken });
});

const logout = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User logged out", success: true });
});



export default {
  login,
  register,
  logout,
};
