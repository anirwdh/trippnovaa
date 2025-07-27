import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserHome from './User/UserHome';
import UserExplore from './User/UserExplore';
import AgencyHome from './Agency/AgencyHome';
import AgencyRegistration from './Agency/AgencyRegistration';
import AgencyLandingPage from './Agency/AgencyLandingPage';
import AgencyPackages from './Agency/AgencyPackages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/userexplore" element={<UserExplore />} />
        <Route path="/agency" element={<AgencyHome />} />
        <Route path="/AgencyRegistration" element={<AgencyRegistration />} />
        <Route path="/AgencyLandingPage" element={<AgencyLandingPage />} />
        <Route path="/AgencyPackages" element={<AgencyPackages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
