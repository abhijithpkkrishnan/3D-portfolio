import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, ChevronDown, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import MagneticButton from '@/components/effects/MagneticButton';
import TypewriterText from '@/components/effects/TypewriterText';
import GlitchText from '@/components/effects/GlitchText';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Name is visible immediately (no delay) so it appears first when the page loads
  const nameVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section ref={containerRef} id="hero" className="min-h-screen flex items-center justify-center relative px-4 overflow-hidden">
      <motion.div 
        className="text-center z-10 gpu-accelerated"
        style={{ y, opacity, scale }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Animated badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-6"
          >
            <Sparkles className="w-4 h-4 text-accent animate-pulse" />
            <span className="text-sm font-display text-accent">Available for hire</span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-lg md:text-xl text-primary font-display tracking-[0.3em] mb-4"
          >
            <TypewriterText text="FULL STACK DEVELOPER" speed={80} />
          </motion.h2>
          
          <motion.h1
            variants={nameVariants}
            initial="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 break-words"
          >
            <span className="inline-flex flex-wrap justify-center gap-x-[0.25em] gap-y-0 items-baseline">
              <GlitchText text="ABHIJITH" className="glow-text" />
              <span className="text-secondary glow-text-secondary whitespace-nowrap">P{"\u00A0"}K</span>
            </span>
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-body px-1 min-w-0"
          >
            Crafting digital experiences with{' '}
            <motion.span 
              className="text-primary"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              PHP
            </motion.span>
            ,{' '}
            <motion.span 
              className="text-secondary"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            >
              WordPress
            </motion.span>
            ,{' '}
            <motion.span 
              className="text-accent"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              Node.js
            </motion.span>
            {' '}& Modern Web Technologies
          </motion.p>
        </motion.div>

        <motion.div
          className="flex items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          {[
            { icon: Phone, href: "tel:+917594844227", label: "Call", color: "primary" },
            { icon: Mail, href: "mailto:abhijithpkkrishnan@gmail.com", label: "Email", color: "secondary" },
            { icon: Linkedin, href: "https://www.linkedin.com/in/abhijith-pk-ba0848213/", label: "LinkedIn", color: "primary" },
            { icon: Github, href: "https://github.com/abhijithpkkrishnan", label: "GitHub", color: "accent" },
          ].map((item, index) => (
            <MagneticButton key={item.label} strength={20}>
              <motion.a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 glass-card glow-border transition-all duration-300 group relative overflow-hidden block"
                initial={{ opacity: 0, y: 20, rotate: -10 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ boxShadow: '0 0 30px hsl(180 100% 50% / 0.5)' }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <item.icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors relative z-10" />
              </motion.a>
            </MagneticButton>
          ))}
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          className="relative cursor-pointer"
          onClick={() => scrollToSection('skills')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="w-8 h-14 border-2 border-primary rounded-full mx-auto relative"
            animate={{ borderColor: ['hsl(180 100% 50%)', 'hsl(280 100% 60%)', 'hsl(180 100% 50%)'] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-2 h-2 bg-primary rounded-full absolute left-1/2 top-2 -translate-x-1/2"
              animate={{ y: [0, 20, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <motion.p
            className="text-xs text-muted-foreground mt-2 font-display tracking-wider"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            SCROLL DOWN
          </motion.p>
        </motion.div>
      </motion.div>

      {/* Animated corner decorations */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 border-l-2 border-t-2 border-primary/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      <motion.div
        className="absolute top-20 right-10 w-20 h-20 border-r-2 border-t-2 border-secondary/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-20 h-20 border-l-2 border-b-2 border-accent/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-20 h-20 border-r-2 border-b-2 border-primary/30"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      />

      {/* Decorative line */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      />
    </section>
  );
};

export default Hero;