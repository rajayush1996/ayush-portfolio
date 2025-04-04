import { motion as Motion } from 'framer-motion';

const ProjectCard = ({ title, description, imgSrc, tech = [], link }) => {
  return (
    <Motion.div
      className="bg-[#1e293b] rounded-2xl shadow-lg p-4 hover:shadow-xl transition-transform"
      whileHover={{ rotateX: 5, rotateY: -5 }}
    >
      <img src={imgSrc} alt={title} className="rounded-lg w-full h-40 object-cover" />
      <h3 className="mt-4 text-xl font-bold text-white">{title}</h3>
      <p className="text-sm text-white/80 mt-1">{description}</p>

      <div className="flex flex-wrap gap-2 mt-3">
        {tech.map((t, i) => (
          <span key={i} className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded text-xs">
            {t}
          </span>
        ))}
      </div>

      {link && (
        <a
          href={link}
          target="_blank"
          className="inline-block mt-3 text-sm text-yellow-300 hover:underline"
        >
          🔗 View Project
        </a>
      )}
    </Motion.div>
  );
};

export default ProjectCard;
