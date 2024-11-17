import { createBrowserRouter, createRoutesFromElements, RouterProvider,Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Home from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SigupPage from './Pages/SigupPage';
import Contact from './Pages/Contact';
import AboutUs from './Pages/AboutUs';
import Fees from './Pages/Fees';
import Profile from './Pages/Profile';
import UpdateProfile from './Components/UpdateProfile';
import ProtectedRoute from './Components/ProtectedRoutes';
import { AuthProvider } from './Context/AuthProvider';
import NotFoundPage from './Components/NotFoundPage';
import NotificationPage from './Components/Notification';
import MoviePremiereForm from './Components/MoviePremiereForm';
import EventsPage from './Pages/Events';
import ArtistMembershipForm from './Components/ArtistMembershipForm';
import CampingForm from './Components/CampingForm';
import ScriptPrintingForm from './Components/ScriptPrintingForm';
import WelfareForm from './Components/WelfareForm';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} >
        <Route index element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SigupPage />} />
        <Route path="user/fees" element={<Fees />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/editprofile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
        <Route path="/moviepremiereform" element={<MoviePremiereForm />} />
        <Route path="/artistmembershipform" element={<ArtistMembershipForm />} />
        <Route path="/campingform" element={<CampingForm />} />
        <Route path="/scriptprintingform" element={<ScriptPrintingForm />} />
        <Route path="/welfareform" element={<WelfareForm />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
