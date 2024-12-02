import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import App from './App.jsx';
import ErrorScreen from './screen/ErrorScreen.jsx';
import Login from './components/auth/Login.jsx';
import AuthLayout from './components/auth/Auth.jsx';
import NewPassword from './components/auth/NewPassword.jsx';
import Register from './components/auth/Register.jsx';
import BookManagement from './components/book/BookManagement.jsx';
import PrivatePages from './components/middlewares/PrivatePages.jsx';
import PublicPages from './components/middlewares/PublicPages.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />} errorElement={<ErrorScreen />}>
      <Route element={<PrivatePages/>} >
        <Route path='/' element={<BookManagement/>}/>
      </Route>
      <Route element={<PublicPages/>} >
        <Route  element={<AuthLayout />} >
          <Route index path='login' element={<Login/>} />
          <Route path='register' element={<Register/>} />
          <Route path='new-password' element={<NewPassword/>} />
        </Route>
      </Route>
    </Route>
  )
);

export default router;