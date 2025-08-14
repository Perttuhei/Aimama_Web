import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { Chat } from './pages/Chat';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { LanguageProvider } from './utils/LangProvider';
import MarketingTools from './components/MarketingTools';
import { MarketingMaterials } from './pages/MarketingMaterials';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isMaterialsOpen, setMaterialsOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/chat') {
      setMaterialsOpen(false);
      setIsChatOpen(true);
    } else if (location.pathname === '/marketingmaterials') {
      setIsChatOpen(false);
      setMaterialsOpen(true);
    } else {
      setIsChatOpen(false);
      setMaterialsOpen(false);
    }
  }, [location.pathname]);

  return (
    <LanguageProvider>
      <div className="app-container">
        

        <div className="right-container">
          <Navbar></Navbar>
          <div className="main-content">
            <Sidebar></Sidebar>
            <main>
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/marketingmaterials" element={<MarketingMaterials />}/>
              </Routes>
            </main>
          </div>
        </div>

        {isChatOpen && (
          <div className="left-container">
              <MarketingTools/>
          </div>
        )}

        {isMaterialsOpen && (
          <div className="left-container">
              <MarketingTools/>
          </div>
        )}

      </div>
      <footer className="app-footer">
        <p>&copy; 2025 Aimama. All rights reserved.</p>
      </footer>
    </LanguageProvider>
  );
};

const RootApp: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default RootApp;