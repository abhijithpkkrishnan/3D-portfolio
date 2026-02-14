import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Calendar, ChevronRight, Zap } from 'lucide-react';
import { useState, useRef } from 'react';

const experiences = [
  {
    type: "work",
    title: "Full Stack Software Developer Trainee",
    company: "Star Knowledge Ventures",
    period: "Nov 2024 – Dec 2025",
    description: [
      "Developed and maintained responsive web applications using React.js, HTML, CSS, Bootstrap, PHP, and WordPress, ensuring cross-browser compatibility and optimal user experience.",
      "Designed and implemented RESTful APIs using Node.js/Express and PHP, enabling secure authentication, data handling, and business logic execution.",
      "Utilized Git-based version control and AI-assisted development tools for refactoring, testing support, and documentation.",
      "Integrated third-party APIs and implemented backend logic for user authentication, data processing, and form handling in PHP.",
    ],
    skills: ["PHP", "React.js", "Node.js", "HTML", "CSS", "Bootstrap"],
  },
  {
    type: "course",
    title: "Java Full Stack Intern",
    company: "Jspiders",
    period: "Jun 2024 – Nov 2024",
    description: [
      "Gained hands-on experience in Core Java including OOP concepts, exception handling, multithreading, and collections framework.",
      "Practiced writing complex SQL queries in Oracle SQL, including joins, subqueries, and functions for efficient data manipulation.",
      "Built interactive web interfaces using HTML, CSS, and JavaScript, focusing on DOM manipulation and event handling.",
    ],
    skills: ["Core Java", "HTML", "CSS", "Javascript", "Oracle SQL"],
  },
];

const education = [
  {
    degree: "Bachelor's Degree",
    institution: "APJ Abdul Kalam University",
    period: "Jun 2020 - Jul 2024",
    grade: "CGPA: 6.9",
  },
  {
    degree: "Higher Secondary (XII)",
    institution: "Govt HSS Kannadi",
    period: "Jun 2019 - Jul 2020",
    grade: "CGPA: 8.9",
  },
];

const Experience = () => {
  const [activeExp, setActiveExp] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} id="experience" className="min-h-screen py-20 px-4 relative overflow-hidden">
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
            <Zap className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-display text-accent">Professional Timeline</span>
          </motion.div>
          <motion.h2 
            className="text-sm font-display tracking-[0.3em] text-primary mb-4"
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            whileInView={{ opacity: 1, letterSpacing: '0.3em' }}
            viewport={{ once: true }}
          >
            JOURNEY
          </motion.h2>
          <motion.h3 
            className="text-4xl md:text-5xl font-display font-bold glow-text"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Experience & Education
          </motion.h3>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-muted/30 transform md:-translate-x-1/2">
            <motion.div
              className="w-full bg-gradient-to-b from-primary via-secondary to-accent"
              style={{ height: lineHeight }}
            />
          </div>

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              className={`relative flex flex-col md:flex-row gap-8 mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              {/* Timeline dot with pulse */}
              <motion.div
                className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-background border-4 border-primary transform -translate-x-1/2 z-10"
                whileHover={{ scale: 1.5 }}
                style={{ top: '24px' }}
              >
                <motion.div 
                  className="absolute inset-0 rounded-full bg-primary"
                  animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute inset-0 rounded-full bg-primary"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                />
              </motion.div>

              {/* Content */}
              <div className={`md:w-1/2 pl-10 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                <motion.div
                  className="glass-card p-6 glow-border cursor-pointer group relative overflow-hidden"
                  whileHover={{ 
                    scale: 1.03, 
                    y: -10,
                    boxShadow: exp.type === 'work' 
                      ? '0 0 40px hsl(180 100% 50% / 0.3)' 
                      : '0 0 40px hsl(280 100% 60% / 0.3)'
                  }}
                  onClick={() => setActiveExp(activeExp === index ? -1 : index)}
                >
                  {/* Animated background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5"
                    animate={{ 
                      background: activeExp === index 
                        ? 'linear-gradient(135deg, hsl(180 100% 50% / 0.1), hsl(280 100% 60% / 0.1))'
                        : 'linear-gradient(135deg, hsl(180 100% 50% / 0.05), hsl(280 100% 60% / 0.05))'
                    }}
                  />

                  <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''} relative z-10`}>
                    <motion.div
                      animate={{ rotate: activeExp === index ? 360 : 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {exp.type === 'work' ? (
                        <Briefcase className="w-5 h-5 text-primary" />
                      ) : (
                        <GraduationCap className="w-5 h-5 text-secondary" />
                      )}
                    </motion.div>
                    <span className="text-xs font-display tracking-wider text-muted-foreground uppercase">
                      {exp.type === 'work' ? 'Work' : 'Training'}
                    </span>
                  </div>

                  <motion.h4 
                    className="text-xl font-display font-bold text-foreground mb-1 relative z-10"
                    layout
                  >
                    {exp.title}
                  </motion.h4>
                  <motion.p 
                    className="text-primary font-semibold mb-2 relative z-10"
                    animate={{ color: activeExp === index ? 'hsl(180 100% 50%)' : 'hsl(180 100% 50% / 0.8)' }}
                  >
                    {exp.company}
                  </motion.p>
                  
                  <div className={`flex items-center gap-2 text-sm text-muted-foreground mb-4 ${index % 2 === 0 ? 'md:justify-end' : ''} relative z-10`}>
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ 
                      height: activeExp === index ? 'auto' : 0, 
                      opacity: activeExp === index ? 1 : 0 
                    }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden relative z-10"
                  >
                    <ul className={`space-y-3 mb-4 text-sm text-muted-foreground ${index % 2 === 0 ? 'md:text-right' : ''}`}>
                      {exp.description.map((item, i) => (
                        <motion.li 
                          key={i} 
                          className={`flex items-start gap-2 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                          initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                          animate={{ opacity: activeExp === index ? 1 : 0, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                          >
                            <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          </motion.div>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>

                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      {exp.skills.map((skill, i) => (
                        <motion.span 
                          key={skill} 
                          className="px-3 py-1 text-xs font-display bg-primary/20 text-primary rounded-full"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: activeExp === index ? 1 : 0, scale: activeExp === index ? 1 : 0 }}
                          transition={{ delay: 0.3 + i * 0.05 }}
                          whileHover={{ scale: 1.1 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div 
                    className="mt-4 text-xs text-primary group-hover:text-accent transition-colors flex items-center gap-1 relative z-10"
                    style={{ justifyContent: index % 2 === 0 ? 'flex-end' : 'flex-start' }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    {activeExp === index ? '▲ Click to collapse' : '▼ Click to expand'}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h4 
            className="text-2xl font-display font-bold text-center mb-8 glow-text-secondary flex items-center justify-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <GraduationCap className="w-8 h-8 text-secondary" />
            </motion.div>
            Education
          </motion.h4>

          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                className="glass-card p-6 border-secondary/30 hover:border-secondary/60 transition-all group relative overflow-hidden"
                initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, type: "spring" }}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: '0 0 40px hsl(280 100% 60% / 0.3)'
                }}
                data-interactive
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-accent/5"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                />
                <h5 className="text-lg font-display font-bold text-secondary relative z-10">{edu.degree}</h5>
                <p className="text-foreground font-medium relative z-10">{edu.institution}</p>
                <p className="text-sm text-muted-foreground relative z-10">{edu.period}</p>
                <motion.div 
                  className="mt-3 inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-display relative z-10"
                  whileHover={{ scale: 1.1 }}
                >
                  {edu.grade}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;