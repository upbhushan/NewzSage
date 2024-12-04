import React from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import SubmitNews from './pages/SubmitNews';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './index.css';

function App() {
  return (
    <RecoilRoot>
      <Router>
        <div className="min-h-screen bg-gray-100 font-serif">
          <Header />
          <div className="flex">
            <Sidebar />
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<Home />} />
                <Route path="/submit" element={<SubmitNews />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </RecoilRoot>
  );
}

export default App;

