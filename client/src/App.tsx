import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainPage } from './pages/MainPage/MainPage';
import { MyCardsPage } from './pages/MyCardsPage/MyCardsPage';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
