import { motion, useSpring } from 'framer-motion';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useState, useEffect } from 'react';

// Snappier spring: higher stiffness = faster follow, moderate damping = smooth without lag
const CURSOR_SPRING = { damping: 28, stiffness: 700 };
const TRAIL_SPRING = { damping: 25, stiffness: 500 };

const CustomCursor = () => {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const cursorX = useSpring(0, CURSOR_SPRING);
  const cursorY = useSpring(0, CURSOR_SPRING);
  const trailX = useSpring(0, TRAIL_SPRING);
  const trailY = useSpring(0, TRAIL_SPRING);

  useEffect(() => {
    const size = 16;
    cursorX.set(x - size);
    cursorY.set(y - size);
    trailX.set(x - 4);
    trailY.set(y - 4);
  }, [x, y, cursorX, cursorY, trailX, trailY]);

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [data-interactive]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="w-full h-full rounded-full border-2 border-primary"
          animate={{
            scale: isHovering ? 1.5 : isClicking ? 0.8 : 1,
            backgroundColor: isHovering ? 'hsl(180 100% 50% / 0.2)' : 'transparent',
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Trailing dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[9998] hidden md:block"
        style={{
          x: trailX,
          y: trailY,
        }}
      >
        <div className="w-full h-full rounded-full bg-primary" />
      </motion.div>
    </>
  );
};

export default CustomCursor;
