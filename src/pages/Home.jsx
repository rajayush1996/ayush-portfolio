import { motion as Motion} from 'framer-motion';
import Hero from '../sections/Hero';
import About from '../sections/About';
import Projects from '../sections/Projects';
import Contact from '../sections/Contacts';
import ProjectGallery from '../sections/ProjectGallery';
import Ticker from '../components/Ticker';
import SkillsWheel from '../sections/SkillsWheel';
import SpinningCube from '../components/SpinningCube';
import Awards from '../sections/Awards';
import Testimonials from '../sections/Testimonials';

const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const Home = () => (
  <Motion.div
    {...pageTransition}
    transition={{ duration: 0.6 }}
  >
    <Hero />
    <Ticker />
    <About />
    <SkillsWheel />
    <SpinningCube />
    <Projects />
    <ProjectGallery />
    <Awards />
    <Testimonials />
    <Contact />
  </Motion.div>
);

export default Home;
