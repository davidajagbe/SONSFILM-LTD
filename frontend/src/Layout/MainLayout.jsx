import { Outlet } from 'react-router-dom';
import { useContext, useEffect, useState,lazy, Suspense } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContext } from '../Context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/MainLayout.css';

const Navbar = lazy(() => import('../Components/Navbar')); // Dynamic import
const Footer = lazy(() => import('../Components/Footer')); // Dynamic import

const MainLayout = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (menuOpen && window.innerWidth < 769) {
      document.body.classList.add('menu-open');
      const navbar = document.querySelector('.navbar'); 
      if (navbar) { 
        document.body.style.paddingBottom = `${navbar.offsetHeight}px`; 
      }
    } else {
      document.body.classList.remove('menu-open');
      document.body.style.paddingTop = '0px'; 
    }
  }, [menuOpen]);

  const { error, success } = useContext(AuthContext);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success(success);
    }
  }, [error, success]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 769) {
        setMenuOpen(false); // Close the menu and reset padding in desktop view
        document.body.classList.remove('menu-open');
        document.body.style.paddingTop = '0px';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading Navbar...</div>}>
        <Navbar toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </Suspense>
      <main className='container' style={{ minHeight: '80vh' }}>
        <Outlet />
      </main>
      <Suspense fallback={<div>Loading Footer...</div>}>
        <Footer toggleMenu={toggleMenu} menuOpen={menuOpen} />
      </Suspense>
      <ToastContainer position="bottom-right" autoClose={5000} pauseOnHover />
    </>
  );
};

export default MainLayout;