import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { removeCredentials } from '../../utils/userSlice';
import {decodeJwt as jwtDecode} from 'jose';

const isTokenExpired = (token) => {
    if (!token) return true;

  try {
      console.log('time')
    const decoded = jwtDecode(token);
    console.log(decoded,'time')
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.log(error)
    return true;
  }
};

const PrivatePages = () => {
  const token = localStorage.getItem('accessToken');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
console.log(user,token)
  // If there's no token or token is expired, redirect to login
  if (!token || isTokenExpired(token)) {
    console.log(isTokenExpired(token))
    dispatch(removeCredentials());
    localStorage.removeItem('accessToken');
    return <Navigate to="/login" replace />;
  }

  // If token is valid and user exists, render child routes
  return <Outlet />;
};

export default PrivatePages;