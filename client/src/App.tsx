import React, { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainPage } from './pages/MainPage/MainPage';
import { MyCardsPage } from './pages/MyCardsPage/MyCardsPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { AppDispatch } from './redux/store';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/features/auth/authSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RegistrationPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/main',
    element: <MainPage />
  },
  {
    path: 'myCards',
    element: <MyCardsPage />
  }
])

const App:React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])
  
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;