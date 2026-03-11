import { Routes, Route, useLocation, Link } from 'react-router-dom';
import { AnimatePresence, motion as Motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MouseParticles from './components/MouseParticles';
import GameJourney from './pages/DevJourney';

const NotFound = () => (
  <div className="min-h-screen flex flex-col items-center justify-center text-white">
    <Motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
      className="text-7xl font-black bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent mb-4">404</Motion.h1>
    <p className="text-white/50 mb-8">Page not found</p>
    <Link to="/" className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-semibold hover:scale-105 transition-transform">Back to Home</Link>
  </div>
);

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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      {!hideFooterOnRoutes.includes(location.pathname) && <Footer />}
      <Analytics />
    </div>
  );
}

export default App;
