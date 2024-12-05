import React, { useState } from 'react';
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
// import Context from './components/Context';
import './index.css';
import { authUser } from './context/AuthContext';
import NoSign from './pages/NoSign';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true );

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  return (
    <RecoilRoot>
      <Router>
        <div className="min-h-screen bg-gray-100 font-serif">
          {!isAuthenticated && <Header />}
          <div className="flex">
            {isAuthenticated && <Sidebar /> }
            <div className="flex-1 pl-3 pr-6">
              <Routes>
                <Route path="/" element={<LandingPage isAuthenticated={isAuthenticated} />} />
                <Route 
                  path="/home" 
                  element={isAuthenticated ? <Home /> : <Navigate to="/signin" />} 
                />
                <Route 
                  path="/submit" 
                  element={isAuthenticated ? <SubmitNews /> : <Navigate to="/signin" />} 
                />
                <Route path="/signup" element={<SignUp onSignUp={handleAuthentication} />} />
                <Route path="/signin" element={<SignIn onSignIn={handleAuthentication} />} />
                <Route path='/content' element={<Content/>}/>
                <Route path='/nosign' element={<NoSign/>}/>
                {/* <Route path='/context' element={<Context/>}/> */}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;

