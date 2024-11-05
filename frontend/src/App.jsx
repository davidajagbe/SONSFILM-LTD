import React from 'react'
import { createBrowserRouter,createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Home from './Pages/HomePage';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} >
        <Route index element={<Home />} />
      </Route>
    )
  );
  return (
    <RouterProvider router={router} />
  )
}

export default App
