import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PublicPages = () => {
    const user = useSelector((state)=>state.user);
    if(user){
        return <Navigate to='/' replace />
    }else{
        return <Outlet/>
    }
}

export default PublicPages
