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
import EventForm from './Components/EventForm';
import TermsAndConditions from './Components/TermsAndCondition';
import AdminDashboard from './Pages/adminDashboard';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />} >
        <Route path="/signup" element={<SigupPage />} /> {/* Render SignupPage by default */}
        <Route index element={<ProtectedRoute redirectTo="/signup"><Home /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute redirectTo="/signup"><AboutUs /></ProtectedRoute>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<ProtectedRoute redirectTo="/signup"><EventsPage /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user/fees" element={<ProtectedRoute><Fees /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/editprofile" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><NotificationPage /></ProtectedRoute>} />
        <Route path="/moviepremiereform" element={<ProtectedRoute activateRedirectTo="/user/fees"><MoviePremiereForm /></ProtectedRoute>} />
        <Route path="/artistmembershipform" element={<ProtectedRoute activateRedirectTo="/user/fees"><ArtistMembershipForm /></ProtectedRoute>} />
        <Route path="/campingform" element={<ProtectedRoute activateRedirectTo="/user/fees"><CampingForm /></ProtectedRoute>} />
        <Route path="/scriptprintingform" element={<ProtectedRoute activateRedirectTo="/user/fees"><ScriptPrintingForm /></ProtectedRoute>} />
        <Route path="/welfareform" element={<ProtectedRoute activateRedirectTo="/user/fees"><WelfareForm /></ProtectedRoute>} />
        <Route path="/eventform" element={<EventForm />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/admin" element={<AdminDashboard />} />
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
