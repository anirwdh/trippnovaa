import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import AuthInitializer from './Components/AuthInitializer';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import UserHome from './User/UserHome';
import UserExplore from './User/UserExplore';
import UserdetailBooking from './User/UserdetailBooking';
import Privacy from './Components/Privacy';
import Security from './Components/Security';
import Terms from './Components/Terms';
import AgencyHome from './Agency/AgencyHome';
import AgencyRegistration from './Agency/AgencyRegistration';
import AgencyLandingPage from './Agency/AgencyLandingPage';
import AgencyPackages from './Agency/AgencyPackages';
import Adminlanding from './Admin/Adminlanding';
import UserManagement from './Admin/UserManagement';
import BookingManagement from './Admin/BookingManagement';
import Inquiries from './Admin/Inquiries';
import BlogUpload from './Admin/BlogUpload';
import Blog from './Components/Blog';
import About from './Components/About';
import Contact from './Components/Contact';

function App() {
  return (
    <Provider store={store}>
      <AuthInitializer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserHome />} />
            <Route path="/userexplore" element={<UserExplore />} />
            <Route path="/userdetailbooking" element={<UserdetailBooking />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/security" element={<Security />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/agency" element={<AgencyHome />} />
            <Route path="/AgencyRegistration" element={<AgencyRegistration />} />
            <Route path="/AgencyLandingPage" element={<AgencyLandingPage />} />
            <Route path="/AgencyPackages" element={<AgencyPackages />} />
            <Route path="/loginadmin" element={
              <AdminAuthProvider>
                <Adminlanding />
              </AdminAuthProvider>
            } />
            <Route path="/adminlanding" element={
              <AdminAuthProvider>
                <Adminlanding />
              </AdminAuthProvider>
            } />
            <Route path="/usermanagement" element={
              <AdminAuthProvider>
                <UserManagement />
              </AdminAuthProvider>
            } />
            <Route path="/bookingmanagement" element={
              <AdminAuthProvider>
                <BookingManagement />
              </AdminAuthProvider>
            } />
            <Route path="/inquiries" element={
              <AdminAuthProvider>
                <Inquiries />
              </AdminAuthProvider>
            } />
            <Route path="/blogupload" element={
              <AdminAuthProvider>
                <BlogUpload />
              </AdminAuthProvider>
            } />
            <Route path="/blog" element={<Blog />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>
      </AuthInitializer>
    </Provider>
  );
}

export default App;
