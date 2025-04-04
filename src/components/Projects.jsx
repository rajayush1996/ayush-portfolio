import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { motion as Motion } from 'framer-motion';
import ProjectModal from './ProjectModal';

const projects = [
  {
    title: 'SmartAssist - AI Contact Center',
    description: 'Automated tasks, routed queries, and improved customer service experience.',
    imgSrc: '/assets/projects/smartassist.png',
    tech: ['Node.js', 'React', 'MongoDB', 'AWS'],
    link: 'https://smartassist.kore.ai/',
  },
  {
    title: 'MCapital Loan App',
    description: 'Built full loan portal with Razorpay, KYC, OCR, etc.',
    imgSrc: '/assets/projects/mcapital.gif',
    tech: ['Angular', 'Node.js', 'Karza OCR', 'Razorpay'],
    link: 'https://www.mcapital.co.in/',
  },
  // Add more here
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  return (
    <section id="projects" className="py-28 px-6 bg-[#0f172a] text-white">
      <Motion.h2
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 to-pink-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* 🚀 Projects */}
      </Motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((proj, i) => (
          <Motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <ProjectCard {...proj} />
          </Motion.div>
        ))}
      </div>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};

export default Projects;
