import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            setTimeout(onComplete, 500);
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  const loadingTexts = [
    'INITIALIZING SYSTEM...',
    'LOADING 3D ASSETS...',
    'CALIBRATING INTERFACE...',
    'ESTABLISHING CONNECTION...',
    'READY TO LAUNCH...',
  ];

  const currentText = loadingTexts[Math.min(Math.floor(progress / 25), loadingTexts.length - 1)];

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[200] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            {/* Logo animation */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', duration: 0.8 }}
            >
              <motion.div
                className="w-24 h-24 mx-auto relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                {/* Outer ring */}
                <motion.div
                  className="absolute inset-0 border-4 border-primary/30 rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                {/* Inner ring */}
                <motion.div
                  className="absolute inset-2 border-2 border-secondary rounded-full"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Core */}
                <motion.div
                  className="absolute inset-4 bg-gradient-to-br from-primary to-secondary rounded-full"
                  animate={{ scale: [0.8, 1, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                
                {/* Center dot */}
                <motion.div
                  className="absolute inset-8 bg-accent rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl md:text-5xl font-display font-bold glow-text mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              ABHIJITH <span className="text-secondary glow-text-secondary">P K</span>
            </motion.h1>
            
            <motion.p
              className="text-primary font-display tracking-[0.3em] mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              PORTFOLIO v2.0
            </motion.p>

            {/* Loading bar */}
            <div className="w-64 mx-auto">
              <div className="h-1 bg-muted rounded-full overflow-hidden mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
              
              <div className="flex justify-between text-xs font-display">
                <motion.span
                  className="text-muted-foreground"
                  key={currentText}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {currentText}
                </motion.span>
                <span className="text-primary">{Math.min(Math.round(progress), 100)}%</span>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-secondary rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div
              className="absolute top-1/3 right-1/3 w-2 h-2 bg-accent rounded-full"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
