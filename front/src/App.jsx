import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import SubmitNews from './pages/SubmitNews';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Content from './pages/Content';
import NoSign from './pages/NoSign';
import './index.css';
import { useAuthContext } from './context/AuthContext';
import AboutUs from './pages/AboutUs';
import Contact from './pages/Contact';
import FAQs from './pages/FAQs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import LocalVoice from './pages/LocalVoice';
import StaticVoice from './pages/StaticVoice';
import AccuracyProbability from './pages/AccuracyProbability';
import CommunityInsights from './pages/CommunityInsights';
import Account from './pages/Account';

function App() {
  const { authUser, isLoading } = useAuthContext();

  // If loading, render a fallback (optional, like a spinner)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = !!authUser; // Check if `authUser` exists to determine authentication status

  return (
    <RecoilRoot>
      <Router>
        <div className="min-h-screen bg-gray-100 font-serif">
          {!isAuthenticated && <Header />} {/* Show Header only if not authenticated */}

          <div className="flex">
            {/* Conditionally render Sidebar only if authenticated and on allowed pages */}
            {isAuthenticated && (
              <>
                <Sidebar /> {/* Sidebar visible only for authenticated users */}
                <div className="flex-1 pl-3 pr-6">
                  <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/landingpage" /> : <NoSign />} />
                    <Route path="/signup" element={isAuthenticated ? <Navigate to="/landingpage" /> : <SignUp />} />
                    <Route path="/signin" element={isAuthenticated ? <Navigate to="/landingpage" /> : <SignIn />} />
                    <Route
                      path="/landingpage"
                      element={isAuthenticated ? <LandingPage /> : <Navigate to="/" />}
                    />
                    <Route
                      path="/submit"
                      element={isAuthenticated ? <SubmitNews /> : <Navigate to="/" />}
                    />
                    <Route
                      path="/content/:id"
                      element={isAuthenticated ? <Content /> : <Navigate to="/" />}
                    />
                    <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faqs" element={<FAQs />} />
                  <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                  <Route path="/sharevoice" element={<LocalVoice />} />
                  <Route path="/staticvoice" element={<StaticVoice/>} />
                  <Route path="/accuracyprobability" element={<AccuracyProbability/>} />
                  <Route path="/communityInsights" element={<CommunityInsights/>} />
                  <Route path="/account" element={<Account/>} />

                  </Routes>
                </div>
              </>
            )}
            {/* If not authenticated, only show routes that don’t require Sidebar */}
            {!isAuthenticated && (
              <div className="flex-1 pl-3 pr-6">
                <Routes>
                  <Route path="/" element={isAuthenticated ? <Navigate to="/landingpage" /> : <NoSign />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/landingpage" element={isAuthenticated ? <LandingPage /> : <Navigate to="/" />} />
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/faqs" element={<FAQs />} />
                  <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                  <Route path="/sharevoice" element={<LocalVoice />} />
                  <Route path="/staticvoice" element={<StaticVoice/>} />
                  <Route path="/accuracyprobability" element={<AccuracyProbability/>} />
                  <Route path="/communityInsights" element={<CommunityInsights/>} />

                </Routes>
              </div>
            )}
          </div>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
