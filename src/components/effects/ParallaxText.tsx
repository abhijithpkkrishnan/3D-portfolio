import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

interface ParallaxTextProps {
  children: string;
  baseVelocity?: number;
  className?: string;
}

const ParallaxText = ({ children, baseVelocity = 100, className = '' }: ParallaxTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -baseVelocity]);
  const smoothX = useSpring(x, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="overflow-hidden py-4">
      <motion.div
        className={`flex whitespace-nowrap ${className}`}
        style={{ x: smoothX }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-4">
            {children}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default ParallaxText;
