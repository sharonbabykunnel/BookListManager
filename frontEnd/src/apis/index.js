import axios from "axios";
import { Failed, Success } from "../helpers/popup";
import { Navigate } from "react-router-dom";
import { removeCredentials } from "../utils/userSlice";
import appStore from "../utils/appStore";

const apiRequest = async (method, url, data, headers = {}) => {
  try {
    const backend = import.meta.env.VITE_BACKEDN_URL;
    const token = localStorage.getItem("accessToken");

    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }

    const response = await axios({ method, url: backend + '/api' + url, data, headers: { ...headers }, });

    return response.data;
  } catch (error) {

      if (axios.isAxiosError(error)) {
          if (error.response?.data?.tokenExpired) {
            localStorage.removeItem("accessToken");
            appStore.dispatch(removeCredentials());

            Failed("Session expired. Please log in again.");

            window.location.href = "/login";
            return
        }

        Failed(error.response?.data.message || error.message);
    } else {
      Failed("An unexpected error occurred");
    }

  }
};

//Login a user
export const loginApi = async (values) => {
  const data = await apiRequest("POST", `/v1/auth/login`, values);
    if (data.success) {
    localStorage.setItem("accessToken", data.accessToken);
    Success(data.message);
    return data;
  }
};

export const logoutApi = async () => {
  const data = await apiRequest("POST", `/v1/auth/logout`, {});
  localStorage.removeItem("accessToken");
  if (data.success) {
    Success(data.message);
    return data;
  }
};

//Register a user
export const registerApi = async (values) => {
  const data = await apiRequest("POST", "/v1/auth/register", values);
  if (data.success) {
    localStorage.setItem("accessToken", data.accessToken);
    Success(data.message);
    return data;
  }
};

// Set new password
export const setNewPasswordApi = async (values) => {
  const data = await apiRequest("PATCH", "/v1/auth/password", values);
  if (data.success) {
    Success(data.message);
    return data;
  }
};

// Fetch all books
export const getAllBooks = async (page = 1, limit = 10) => {
    const data = await apiRequest( "GET", `/v1/books?page=${page}&limit=${limit}`, {},{} );

  if (data.success) {
    return data;
  }
};

// Create a new book
export const createBook = async (bookData) => {
  const data = await apiRequest("POST", "/v1/books", bookData, {});
  if (data.success) {
    Success(data.message);
    return data;
  }
};

// Delete a book
export const deleteBook = async (bookId) => {
  const data = await apiRequest( "DELETE", `/v1/book/${bookId}`, bookData, {} );
  if (data.success) {
    Success(data.message);
    return data;
  }
};
