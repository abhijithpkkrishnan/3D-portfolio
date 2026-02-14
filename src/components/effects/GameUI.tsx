import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, Target, Award, Gamepad2 } from 'lucide-react';

interface GameUIProps {
  activeSection: string;
}

const GameUI = ({ activeSection }: GameUIProps) => {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const sections = ['hero', 'skills', 'experience', 'projects', 'contact'];
  const sectionIndex = sections.indexOf(activeSection);

  useEffect(() => {
    const newLevel = sectionIndex + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      setShowLevelUp(true);
      setScore((prev) => prev + 100);
      setTimeout(() => setShowLevelUp(false), 2000);
    }
  }, [sectionIndex, level]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScore((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Top HUD */}
      <motion.div
        className="fixed top-20 left-4 z-50 hidden lg:flex flex-col gap-3"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        {/* Level indicator */}
        <motion.div
          className="glass-card px-4 py-2 flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <Gamepad2 className="w-5 h-5 text-primary" />
          <div>
            <p className="text-xs text-muted-foreground font-display">LEVEL</p>
            <p className="text-lg font-display font-bold text-primary">{level}</p>
          </div>
        </motion.div>

        {/* Score */}
        <motion.div
          className="glass-card px-4 py-2 flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
        >
          <Target className="w-5 h-5 text-accent" />
          <div>
            <p className="text-xs text-muted-foreground font-display">SCORE</p>
            <motion.p
              className="text-lg font-display font-bold text-accent"
              key={score}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
            >
              {score.toString().padStart(6, '0')}
            </motion.p>
          </div>
        </motion.div>

        {/* XP Bar */}
        <motion.div
          className="glass-card px-4 py-2"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-4 h-4 text-secondary" />
            <p className="text-xs text-muted-foreground font-display">XP</p>
          </div>
          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${(sectionIndex / (sections.length - 1)) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Progress dots - Right side */}
      <motion.div
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2 }}
      >
        {sections.map((section, i) => (
          <motion.div
            key={section}
            className="relative"
            whileHover={{ scale: 1.2 }}
          >
            <motion.div
              className={`w-3 h-3 rounded-full border-2 cursor-pointer ${
                i <= sectionIndex
                  ? 'bg-primary border-primary'
                  : 'bg-transparent border-muted-foreground'
              }`}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
              animate={{
                boxShadow: i === sectionIndex ? '0 0 15px hsl(180 100% 50%)' : 'none',
              }}
            />
            {i < sections.length - 1 && (
              <div className={`absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-4 ${
                i < sectionIndex ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* Level up notification */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] pointer-events-none"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
          >
            <div className="glass-card px-8 py-6 text-center glow-border">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.5 }}
              >
                <Award className="w-16 h-16 text-accent mx-auto mb-4" />
              </motion.div>
              <motion.p
                className="text-2xl font-display font-bold glow-text"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.3, repeat: 3 }}
              >
                LEVEL UP!
              </motion.p>
              <p className="text-primary font-display">Level {level}</p>
              <p className="text-sm text-muted-foreground mt-2">+100 XP</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner decorations */}
      <div className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-40">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M 0 30 L 0 0 L 30 0"
            fill="none"
            stroke="hsl(180 100% 50%)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          />
          <motion.path
            d="M 0 50 L 0 0 L 50 0"
            fill="none"
            stroke="hsl(180 100% 50% / 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
          />
        </svg>
      </div>

      <div className="fixed top-0 right-0 w-32 h-32 pointer-events-none z-40 rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M 0 30 L 0 0 L 30 0"
            fill="none"
            stroke="hsl(280 100% 60%)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
          />
        </svg>
      </div>

      <div className="fixed bottom-0 left-0 w-32 h-32 pointer-events-none z-40 -rotate-90">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M 0 30 L 0 0 L 30 0"
            fill="none"
            stroke="hsl(45 100% 55%)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          />
        </svg>
      </div>

      <div className="fixed bottom-0 right-0 w-32 h-32 pointer-events-none z-40 rotate-180">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <motion.path
            d="M 0 30 L 0 0 L 30 0"
            fill="none"
            stroke="hsl(180 100% 50%)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 1, duration: 1 }}
          />
        </svg>
      </div>
    </>
  );
};

export default GameUI;
