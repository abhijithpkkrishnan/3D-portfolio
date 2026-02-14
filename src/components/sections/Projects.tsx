import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Code2, Heart, Shield, Globe, TrendingUp, MousePointer, Gamepad2 } from 'lucide-react';
import { useState, useRef } from 'react';
import ProjectPortal from '@/components/3d/ProjectPortal';

const projects = [
  {
    title: "AI Sentiment Analysis Web Application",
    subtitle: "React.js & Node.js / Express",
    description: "Full-stack web application to analyze and classify user text into positive, negative, or neutral sentiment using an NLP-based AI model. Designed RESTful APIs for sentiment processing and data management, responsive UI for real-time interaction, database storage for analysis history. Managed source code with GitHub and followed modular, scalable development practices.",
    tech: ["React.js", "Node.js", "Express.js", "NLP", "REST APIs", "GitHub"],
    icon: Code2,
    color: "#00ffff",
    emoji: "🤖",
  },
  {
    title: "Hospital Web Portal",
    subtitle: "React.js & Node.js",
    description: "Full-stack hospital web portal enabling patients to securely access invoices and medical prescriptions online. Designed RESTful APIs for data retrieval, responsive UI for seamless navigation. Integrated database-driven data handling, authentication workflows, and optimized API performance. Managed source code using Git and followed modular development practices.",
    tech: ["React.js", "Node.js", "Express.js", "REST APIs", "Authentication", "Database"],
    icon: Heart,
    color: "#ff00ff",
    emoji: "🏥",
  },
  {
    title: "Cyberbullying Detection using BERT",
    subtitle: "NLP with BERT",
    description: "Innovative solution leveraging BERT (Bidirectional Encoder Representations from Transformers), a state-of-the-art natural language processing model, to detect instances of cyberbullying in English.",
    tech: ["Python", "BERT", "NLP", "Machine Learning"],
    icon: Shield,
    color: "#ffaa00",
    emoji: "🛡️",
  },
  {
    title: "Fitness Website",
    subtitle: "WordPress Development",
    description: "Developed a responsive fitness website by customizing themes and plugins, integrating social media links, and optimizing performance, SEO, and user experience.",
    tech: ["WordPress", "PHP", "CSS", "SEO"],
    icon: Globe,
    color: "#00ffff",
    emoji: "🏋️",
  },
  {
    title: "Casino API Development",
    subtitle: "Backend REST APIs",
    description: "Developed RESTful APIs for a Casino project using PHP to handle user login, game logic, and transactions with secure token-based authentication.",
    tech: ["PHP", "REST API", "Authentication", "Security"],
    icon: Code2,
    color: "#ff00ff",
    emoji: "🎰",
  },
  {
    title: "Arabic Stock Trading Website",
    subtitle: "Rabee Securities Platform",
    description: "Developed an Arabic stock trading website for Rabee Securities using WordPress, integrating dynamic market data and investor resources.",
    tech: ["WordPress", "PHP", "RTL Support", "Finance"],
    icon: TrendingUp,
    color: "#ffaa00",
    emoji: "📈",
  },
];

const ProjectCard = ({ project, index, isSelected, onSelect }: { 
  project: typeof projects[0]; 
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-100, 100], [15, -15]);
  const rotateY = useTransform(springX, [-100, 100], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="glass-card p-6 cursor-pointer relative overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        borderColor: isSelected ? project.color : undefined,
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: `0 0 40px ${project.color}40`,
      }}
      data-interactive
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at ${50 + springX.get() / 5}% ${50 + springY.get() / 5}%, ${project.color} 0%, transparent 50%)`,
        }}
      />

      {/* Glow effect on selection */}
      {isSelected && (
        <motion.div
          className="absolute inset-0 border-2 rounded-xl"
          style={{ borderColor: project.color }}
          animate={{
            boxShadow: [
              `0 0 20px ${project.color}40`,
              `0 0 40px ${project.color}60`,
              `0 0 20px ${project.color}40`,
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <div className="relative z-10">
        <motion.div 
          className="text-5xl mb-4"
          animate={isSelected ? { 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
          } : {}}
          transition={{ duration: 0.5 }}
        >
          {project.emoji}
        </motion.div>
        
        <h4 className="text-lg font-display font-bold mb-1">{project.title}</h4>
        <p className="text-sm mb-3" style={{ color: project.color }}>{project.subtitle}</p>
        <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {project.tech.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs font-display rounded-full"
              style={{ 
                backgroundColor: `${project.color}20`,
                color: project.color,
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  return (
    <section id="projects" className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Gamepad2 className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-display text-accent">Interactive 3D Gallery</span>
          </motion.div>
          
          <motion.h2 
            className="text-sm font-display tracking-[0.3em] text-primary mb-4"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
          >
            PORTFOLIO
          </motion.h2>
          <motion.h3 
            className="text-4xl md:text-5xl font-display font-bold glow-text"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Featured Projects
          </motion.h3>
        </motion.div>

        {/* 3D Project Portal */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <ProjectPortal 
            projects={projects.map(p => ({ title: p.title, color: p.color, emoji: p.emoji }))}
            onProjectClick={setSelectedProject}
          />
          <p className="text-center text-sm text-muted-foreground font-display mt-4">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <MousePointer className="w-4 h-4 inline mr-2" />
              Click on 3D cards to select • Hover to interact
            </motion.span>
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              isSelected={selectedProject === index}
              onSelect={() => setSelectedProject(selectedProject === index ? null : index)}
            />
          ))}
        </div>

        {/* Selected Project Details */}
        {selectedProject !== null && (
          <motion.div
            className="mt-8 glass-card p-8 glow-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ borderColor: projects[selectedProject].color }}
          >
            <div className="flex items-start gap-6">
              <motion.div 
                className="text-6xl"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {projects[selectedProject].emoji}
              </motion.div>
              <div className="flex-1">
                <h4 className="text-2xl font-display font-bold mb-2">
                  {projects[selectedProject].title}
                </h4>
                <p className="text-lg mb-4" style={{ color: projects[selectedProject].color }}>
                  {projects[selectedProject].subtitle}
                </p>
                <p className="text-muted-foreground mb-6">
                  {projects[selectedProject].description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {projects[selectedProject].tech.map((tech, i) => (
                    <motion.span
                      key={tech}
                      className="px-4 py-2 text-sm font-display rounded-full"
                      style={{ 
                        backgroundColor: `${projects[selectedProject].color}20`,
                        color: projects[selectedProject].color,
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;