import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MouseParticles from './components/MouseParticles';
import GameJourney from './pages/DevJourney';

function App() {
  const location = useLocation();
  const hideFooterOnRoutes = ['/journey'];
  return (
    <div className="bg-[#0f172a]">
      <MouseParticles />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/journey" element={<GameJourney />} />
          {/* More routes can go here */}
        </Routes>
      </AnimatePresence>
      {!hideFooterOnRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
