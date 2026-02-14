import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useState, useEffect } from 'react';
import { Text, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

const MOBILE_BREAKPOINT = 768;
// Spread so scaled cards don’t overlap; card base ~3.4×2.3, desktop scale 1.25
const POSITIONS_DESKTOP: [number, number, number][] = [
  [-2.8, 1.2, 0],
  [2.8, 1.2, 0],
  [-2.8, -1.8, 0],
  [2.8, -1.8, 0],
];
// More space between cards; spread fits in viewport with wider FOV so all 4 cards visible
const POSITIONS_MOBILE: [number, number, number][] = [
  [0, 3.2, 0],
  [0, 0.4, 0],
  [0, -2.4, 0],
  [0, -5.2, 0],
];
const MOBILE_CARD_SCALE = 1.18;
const DESKTOP_CARD_SCALE = 1.25;

interface ProjectCardProps {
  title: string;
  position: [number, number, number];
  color: string;
  emoji: string;
  onClick?: () => void;
  index: number;
  cardScale?: number;
}

const ProjectCard3D = ({ title, position, color, emoji, onClick, index, cardScale = 1 }: ProjectCardProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2;
      
      // Rotation on hover
      if (hovered) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, Math.PI * 0.1, 0.1);
        groupRef.current.scale.lerp(new THREE.Vector3(1.1 * cardScale, 1.1 * cardScale, 1.1 * cardScale), 0.1);
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
        groupRef.current.scale.lerp(new THREE.Vector3(cardScale, cardScale, cardScale), 0.1);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        ref={groupRef}
        position={position}
        scale={[cardScale, cardScale, cardScale]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Card background */}
        <RoundedBox args={[3.4, 2.3, 0.2]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color="#0a0a0f"
            metalness={0.5}
            roughness={0.5}
            transparent
            opacity={0.9}
          />
        </RoundedBox>

        {/* Glowing border */}
        <RoundedBox args={[3.5, 2.4, 0.1]} radius={0.12} smoothness={4}>
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1 : 0.3}
            transparent
            opacity={0.5}
            wireframe
          />
        </RoundedBox>

        {/* Emoji */}
        <Text
          position={[0, 0.35, 0.15]}
          fontSize={0.6}
          anchorX="center"
          anchorY="middle"
        >
          {emoji}
        </Text>

        {/* Title */}
        <Text
          position={[0, -0.45, 0.15]}
          fontSize={0.24}
          color={color}
          anchorX="center"
          anchorY="middle"
          maxWidth={2.8}
          textAlign="center"
        >
          {title}
        </Text>

        {/* Hover particles */}
        {hovered && (
          <>
            {[...Array(8)].map((_, i) => (
              <mesh
                key={i}
                position={[
                  Math.cos((i / 8) * Math.PI * 2) * 1.8,
                  Math.sin((i / 8) * Math.PI * 2) * 1.2,
                  0.2,
                ]}
              >
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
              </mesh>
            ))}
          </>
        )}
      </group>
    </Float>
  );
};

interface ProjectPortalProps {
  projects: { title: string; color: string; emoji: string }[];
  onProjectClick?: (index: number) => void;
  positions: [number, number, number][];
  cardScale?: number;
}

const ProjectPortalContent = ({ projects, onProjectClick, positions, cardScale = 1 }: ProjectPortalProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
      <pointLight position={[0, 0, 10]} intensity={0.5} color="#ffaa00" />

      <group ref={groupRef}>
        {projects.slice(0, 4).map((project, i) => (
          <ProjectCard3D
            key={project.title}
            title={project.title}
            position={positions[i]}
            color={project.color}
            emoji={project.emoji}
            onClick={() => onProjectClick?.(i)}
            index={i}
            cardScale={cardScale}
          />
        ))}
      </group>
    </>
  );
};

const ProjectPortal = ({ projects, onProjectClick }: Omit<ProjectPortalProps, 'positions'>) => {
  const [positions, setPositions] = useState<[number, number, number][]>(() =>
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
      ? POSITIONS_MOBILE
      : POSITIONS_DESKTOP
  );
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
  );

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setPositions(mobile ? POSITIONS_MOBILE : POSITIONS_DESKTOP);
      setIsMobile(mobile);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return (
    <div className="w-full h-[640px] sm:h-[500px] min-w-0 overflow-hidden">
      <Canvas camera={{ position: [0, 0, 8], fov: isMobile ? 78 : 50 }}>
        <Suspense fallback={null}>
          <ProjectPortalContent
            projects={projects}
            onProjectClick={onProjectClick}
            positions={positions}
            cardScale={isMobile ? MOBILE_CARD_SCALE : DESKTOP_CARD_SCALE}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ProjectPortal;
