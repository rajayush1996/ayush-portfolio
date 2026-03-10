import React, { Suspense } from 'react';
import { motion as Motion} from 'framer-motion';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Contact from '../sections/Contacts';
import ProjectGallery from '../sections/ProjectGallery';
import Ticker from '../components/Ticker';
import SkillsWheel from '../sections/SkillsWheel';
const SpinningCube = React.lazy(() => import('../components/SpinningCube'));
import Awards from '../sections/Awards';
import Testimonials from '../sections/Testimonials';

const pageTransition = {
  initial: { opacity: 0, scale: 0.97, y: 30, filter: "blur(6px)" },
  animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 1.02, y: -20, filter: "blur(4px)" },
};

const Home = () => (
  <Motion.div
    {...pageTransition}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <Hero />
    <Ticker />
    <About />
    <SkillsWheel />
    <Suspense fallback={<div className="h-[500px] flex items-center justify-center text-white/30">Loading 3D...</div>}>
      <SpinningCube />
    </Suspense>
    <Projects />
    <ProjectGallery />
    <Awards />
    <Testimonials />
    <Contact />
  </Motion.div>
);

export default Home;
