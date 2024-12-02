import React, { useState } from 'react';
import BookList from './BookList'
import BookForm from './BookForm'
import {  
  Typography, 
  Button, 
  Tooltip 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import BookIcon from '@mui/icons-material/Book';
import { logoutApi } from '../../apis';
import { removeCredentials } from '../../utils/userSlice';


const BookManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logoutApi();
    if (result) {
      dispatch(removeCredentials());
      navigate('/login');
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="bg-white shadow-md p-6 pt-0 rounded-md">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <BookIcon className="text-primary" />
            <Typography variant="h4" className="font-bold">
              Book Management App
            </Typography>
          </div>
          <Tooltip title="Logout">
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              startIcon={<LogoutIcon />}
            >
              Logout
            </Button>
          </Tooltip>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
          {/* Book Form */}
          <div className="col-span-12 md:col-span-5">
            <BookForm />
          </div>
          {/* Book List */}
          <div className="col-span-12 md:col-span-7">
            <BookList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookManagement;
