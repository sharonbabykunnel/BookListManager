import axios from "axios"
import { Failed, Success } from "../helpers/popup";

const apiRequest = async (method,url,data)=>{
    try {
        const backend = import.meta.env.VITE_BACKEDN_URL;
        console.log(backend,'checking')
        const response = await axios({method,url:backend+url,data,withCredentials: true,});
        return response.data
    } catch (error) {
        if(axios.isAxiosError(error)){
            Failed(error.response?.data.message || error.message)
        } else {
            console.log(error);
            Failed('An unexpected error occurred');
        }
    }
}

  //Login a user
export const loginApi = async(values)=>{
    const data = await apiRequest('POST',`/v1/auth/login`,values)
    if(data.success){
        Success(data.message);
        return data;
    }
}

  //Register a user
export const registerApi = async (values) => {
    console.log(values,'checking')
    const data = await apiRequest('POST', '/v1/auth/register', values)
    console.log(data)
    if(data.success){
        Success(data.message);
        return data
    }
}

 // Set new password
export const setNewPasswordApi = async (values)=>{
    const data = await apiRequest('PATCH','/v1/auth/password',values)
    if(data.success){
        Success(data.message);
        return data;
    }
}

 // Fetch all books
export const  getAllBooks = async () => {
    const data = await apiRequest('GET','/v1/books',{})
    if(data.success){
        Success(data.message);
        return data;
    }
}
  
  // Create a new book
export const createBook = async (bookData) => {
    const data = await apiRequest("POST", "/v1/books", bookData);
    if (data.success) {
        Success(data.message);
        return data;
    }
}
  
  // Delete a book
export const deleteBook = async (bookId) => {
    const data = await apiRequest("DELETE", `/v1/book/${bookId}`, bookData);
    if (data.success) {
      Success(data.message);
      return data;
    }
  }