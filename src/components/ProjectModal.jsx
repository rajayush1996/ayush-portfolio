import { createPortal } from 'react-dom';
import { motion as Motion, AnimatePresence } from 'framer-motion';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return createPortal(
    <AnimatePresence>
      <Motion.div
        className="fixed inset-0 bg-black/70 backdrop-blur z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <Motion.div
          className="bg-[#1e293b] rounded-2xl p-6 text-white max-w-lg w-full shadow-xl relative"
          onClick={(e) => e.stopPropagation()}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/60 hover:text-white"
          >
            ✕
          </button>
          <img
            src={project.imgSrc}
            alt={project.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h3 className="text-2xl font-bold">{project.title}</h3>
          <p className="text-white/80 mt-2">{project.description}</p>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.tech.map((t, i) => (
              <span key={i} className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs">
                {t}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              className="mt-4 inline-block text-yellow-400 hover:underline"
            >
              🔗 Visit Project
            </a>
          )}
        </Motion.div>
      </Motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
