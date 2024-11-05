// import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-bootstrap';
import Navbar from '../Components/Navbar';

const MainLayout = () => {
  return (
    <div>
      <Navbar/>
      <Outlet/>
      <ToastContainer/>
    </div>
  )
}

export default MainLayout
