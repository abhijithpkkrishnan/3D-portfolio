import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import { Award, Cpu, Database, Wrench, Code } from 'lucide-react';
import SkillSphere from '@/components/3d/SkillSphere';

const allSkills = [
  { name: "React.js", color: "#00ffff" },
  { name: "JavaScript", color: "#00ffff" },
  { name: "HTML", color: "#00ffff" },
  { name: "CSS", color: "#00ffff" },
  { name: "Bootstrap", color: "#00ffff" },
  { name: "Tailwind CSS", color: "#00ffff" },
  { name: "Node.js", color: "#ff00ff" },
  { name: "Express.js", color: "#ff00ff" },
  { name: "Python", color: "#ff00ff" },
  { name: "Core Java", color: "#ff00ff" },
  { name: "PHP", color: "#ff00ff" },
  { name: "Laravel", color: "#ff00ff" },
  { name: "MySQL", color: "#ffaa00" },
  { name: "PostgreSQL", color: "#ffaa00" },
  { name: "Oracle SQL", color: "#ffaa00" },
  { name: "GitHub", color: "#00ffff" },
  { name: "Git", color: "#00ffff" },
  { name: "REST APIs", color: "#ff00ff" },
  { name: "VS Code", color: "#00ffff" },
  { name: "WordPress", color: "#00ffff" },
];

const skillCategories = [
  {
    title: "Frontend",
    color: "primary",
    icon: Code,
    skills: ["React.js", "JavaScript (ES6+)", "HTML", "CSS", "Bootstrap", "Tailwind CSS"],
  },
  {
    title: "Backend",
    color: "secondary",
    icon: Cpu,
    skills: ["Node.js", "Express.js", "Python", "Core Java", "PHP", "Laravel"],
  },
  {
    title: "Database",
    color: "accent",
    icon: Database,
    skills: ["MySQL", "PostgreSQL", "Oracle SQL"],
  },
  {
    title: "Tools & Platforms",
    color: "primary",
    icon: Wrench,
    skills: ["GitHub", "Git", "REST APIs", "VS Code", "WordPress", "AI-assisted tools (Cursor, Copilot)"],
  },
];

const SkillOrb = ({ skill, index, categoryColor }: { skill: string; index: number; categoryColor: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-20, 20], [15, -15]);
  const rotateY = useTransform(springX, [-20, 20], [-15, 15]);

  const colorClasses = {
    primary: "border-primary bg-primary/10 hover:bg-primary/30 hover:shadow-[0_0_30px_hsl(180_100%_50%/0.5)]",
    secondary: "border-secondary bg-secondary/10 hover:bg-secondary/30 hover:shadow-[0_0_30px_hsl(280_100%_60%/0.5)]",
    accent: "border-accent bg-accent/10 hover:bg-accent/30 hover:shadow-[0_0_30px_hsl(45_100%_55%/0.5)]",
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / 3);
    y.set((e.clientY - centerY) / 3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative px-4 py-2 rounded-full border-2 cursor-pointer transition-all duration-300 ${colorClasses[categoryColor as keyof typeof colorClasses]}`}
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.15, zIndex: 10 }}
      data-interactive
    >
      <span className="font-display text-sm font-medium">{skill}</span>
      {isHovered && (
        <>
          <motion.div
            className="absolute -inset-1 rounded-full border border-current opacity-50"
            initial={{ scale: 1 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -inset-2 rounded-full border border-current opacity-30"
            initial={{ scale: 1 }}
            animate={{ scale: 1.8, opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
          />
        </>
      )}
    </motion.div>
  );
};

const TiltCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-100, 100], [10, -10]);
  const rotateY = useTransform(springX, [-100, 100], [-10, 10]);

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
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
};

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="min-h-screen py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-sm font-display tracking-[0.3em] text-primary mb-4"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
          >
            EXPERTISE
          </motion.h2>
          <motion.h3 
            className="text-4xl md:text-5xl font-display font-bold glow-text"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Technical Skills
          </motion.h3>
          {hoveredSkill && (
            <motion.p
              className="mt-4 text-lg text-primary font-display"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {hoveredSkill}
            </motion.p>
          )}
        </motion.div>

        {/* 3D Skill Sphere */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <SkillSphere skills={allSkills} onSkillHover={setHoveredSkill} />
          <p className="text-center text-sm text-muted-foreground font-display mt-4">
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              🎮 Hover over the orbs to explore skills
            </motion.span>
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <TiltCard key={category.title}>
              <motion.div
                className="glass-card p-6 glow-border h-full"
                initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -50 : 50, rotateY: categoryIndex % 2 === 0 ? -15 : 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.15 }}
                whileHover={{ 
                  boxShadow: categoryIndex % 2 === 0 
                    ? '0 0 40px hsl(180 100% 50% / 0.3)' 
                    : '0 0 40px hsl(280 100% 60% / 0.3)'
                }}
              >
                <motion.h4 
                  className={`text-xl font-display font-semibold mb-6 text-${category.color} flex items-center gap-3`}
                  whileHover={{ x: 10 }}
                >
                  <motion.div
                    className={`p-2 rounded-lg bg-${category.color}/20`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <category.icon className={`w-5 h-5 text-${category.color}`} />
                  </motion.div>
                  {category.title}
                </motion.h4>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillOrb
                      key={skill}
                      skill={skill}
                      index={skillIndex}
                      categoryColor={category.color}
                    />
                  ))}
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="inline-flex items-center gap-3 glass-card px-6 py-3 cursor-pointer"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 0 30px hsl(45 100% 55% / 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            data-interactive
          >
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Award className="w-5 h-5 text-accent" />
            </motion.span>
            <span className="font-display text-sm">Certified: Java Full Stack Development</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;