// src/service/auth.service.js
import User from "./../repository/userRepository.js";
import jwt from "./../utils/jwt.js";
import {
  NotFoundError,
  AuthenticationError,
  ConflictError,
} from "./../utils/errors/index.js";

export const login = async (email, password) => {
  // Find user
  const user = await User.findByEmail(email);
  if (!user) {
    throw new NotFoundError("User not found");
  }

  // Verify password
  const isPasswordValid = await User.verifyPassword(password, user.password);
  if (!isPasswordValid) {
    throw new AuthenticationError("Incorrect password");
  }

  // Generate token
  const accessToken = jwt(user._id);

  return {
    user: {
      uid: user._id,
      name: user.name,
      email: user.email,
    },
    accessToken,
  };
};

export const register = async (name, email, password) => {
  // Check if user already exists
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    throw new ConflictError("User already exists");
  }

  // Create user
  const user = await User.createUser(email, password, name);
  if (!user) {
    throw new Error("Failed to create user");
  }

  // Generate token
  const accessToken = jwt(user._id);

  return {
    user: {
      uid: user._id,
      name: user.name,
      email: email,
    },
    accessToken,
  };
};
