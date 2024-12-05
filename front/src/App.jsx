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
          {/* {!isAuthenticated && <Header />} */}
          <div className="flex">
            {/* {isAuthenticated && <Sidebar />} */}
            <div className="flex-1 ">
              <Routes>
              <Route path="/" element={isAuthenticated? <Navigate to= "/landingpage"/>: <NoSign/>} />

                {/* <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated} />} /> */}
                <Route 
                  path="/landingpage" 
                  element={isAuthenticated ? <LandingPage /> : <Navigate to="/" />} 
                />
                <Route 
                  path="/submit" 
                  element={isAuthenticated ? <SubmitNews /> : <Navigate to="/" />} 
                />
                <Route path="/signup" element={isAuthenticated? <Navigate to= "/landingpage"/>: <SignUp/>} />
                <Route path="/signin" element={isAuthenticated? <Navigate to= "/landingpage"/>: <SignIn/>} />
                <Route path="/content" element={  isAuthenticated? <Content />:  <Navigate to= "/"/>     } />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;
