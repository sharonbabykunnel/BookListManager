import axios from "axios"
import { Failed, Success } from "../helpers/popup";


const apiRequest = async (method,url,data)=>{
    try {
        const backend = process.env.BACKEND_URL
        const response = await axios({method,url:backend+url,data,withCredentials: true,});
        return response.data
    } catch (error) {
        if(axios.isAxiosError(error)){
            Failed(error.response?.data.message || error.message)
        }else{
            Failed('An unexpected error occurred');
        }
    }
}

export const loginApi = async(values)=>{
    const data = await apiRequest('POST',`/v1/auth/login`,values)
    if(data.success){
        Success(data.message);
        return data;
    }
}

export const registerApi = async(values)=>{
    const data = await apiRequest('POST','/v1/auth/register',values)
    if(data.success){
        Success(data.message);
        return data
    }
}

export const setNewPasswordApi = async (values)=>{
    const data = await apiRequest('PATCH','/v1/auth/password',values)
    if(data.success){
        Success(data.message);
        return data;
    }
}