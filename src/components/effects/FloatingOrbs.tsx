import { motion } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';

const FloatingOrbs = () => {
  const { normalizedX, normalizedY } = useMousePosition();

  const orbs = [
    { size: 300, color: 'primary', x: '10%', y: '20%', delay: 0 },
    { size: 200, color: 'secondary', x: '80%', y: '60%', delay: 0.5 },
    { size: 150, color: 'accent', x: '60%', y: '10%', delay: 1 },
    { size: 250, color: 'primary', x: '20%', y: '70%', delay: 1.5 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {orbs.map((orb, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl opacity-20"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, hsl(var(--${orb.color})) 0%, transparent 70%)`,
          }}
          animate={{
            x: normalizedX * (30 + index * 10),
            y: normalizedY * (30 + index * 10),
            scale: [1, 1.1, 1],
          }}
          transition={{
            x: { type: 'spring', stiffness: 50, damping: 30 },
            y: { type: 'spring', stiffness: 50, damping: 30 },
            scale: { duration: 4, repeat: Infinity, delay: orb.delay },
          }}
        />
      ))}
    </div>
  );
};

export default FloatingOrbs;
