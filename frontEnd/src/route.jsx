import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.jsx';
import ErrorScreen from './screen/ErrorScreen.jsx';
import Login from './components/auth/Login.jsx';
import AuthLayout from './components/auth/Auth.jsx';
import NewPassword from './components/auth/NewPassword.jsx';
import Register from './components/auth/Register.jsx';
import BookManagement from './components/book/BookManagement.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorScreen />}>
      <Route path='/auth' element={<AuthLayout />} >
        <Route path='login' element={<Login/>} />
        <Route path='register' element={<Register/>} />
        <Route path='new-password' element={<NewPassword/>} />
      </Route>
      <Route path='/checking' element={<div>checking</div>} />
      <Route index element={<BookManagement/>}/>
    </Route>
  )
);

export default router;