import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { removeCredentials } from '../../utils/userSlice';
import { decodeJwt as jwtDecode } from 'jose';

const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

const PrivatePages = () => {
  const token = localStorage.getItem('accessToken');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
      dispatch(removeCredentials());
      localStorage.removeItem('accessToken');
    }
  }, [token, dispatch]);

  // If token is invalid, redirect to login
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/login" replace />;
  }

  // If token is valid and user exists, render child routes
  return <Outlet />;
};

export default PrivatePages;