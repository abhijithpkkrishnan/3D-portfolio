import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchInterval?: number;
}

const GlitchText = ({ text, className = '', glitchInterval = 3000 }: GlitchTextProps) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, glitchInterval);

    return () => clearInterval(interval);
  }, [glitchInterval]);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{text}</span>
      
      {isGlitching && (
        <>
          <motion.span
            className="absolute inset-0 text-primary"
            style={{ clipPath: 'inset(20% 0 30% 0)' }}
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 0.1, repeat: 2 }}
          >
            {text}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-secondary"
            style={{ clipPath: 'inset(50% 0 20% 0)' }}
            animate={{ x: [2, -2, 2] }}
            transition={{ duration: 0.1, repeat: 2 }}
          >
            {text}
          </motion.span>
        </>
      )}
    </span>
  );
};

export default GlitchText;
