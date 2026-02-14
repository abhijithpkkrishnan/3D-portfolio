import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useState } from 'react';
import { Text, RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ProjectCardProps {
  title: string;
  position: [number, number, number];
  color: string;
  emoji: string;
  onClick?: () => void;
  index: number;
}

const ProjectCard3D = ({ title, position, color, emoji, onClick, index }: ProjectCardProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (groupRef.current) {
      // Floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.2;
      
      // Rotation on hover
      if (hovered) {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, Math.PI * 0.1, 0.1);
        groupRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, 0, 0.1);
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        ref={groupRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Card background */}
        <RoundedBox args={[3, 2, 0.2]} radius={0.1} smoothness={4}>
          <meshStandardMaterial
            color="#0a0a0f"
            metalness={0.5}
            roughness={0.5}
            transparent
            opacity={0.9}
          />
        </RoundedBox>

        {/* Glowing border */}
        <RoundedBox args={[3.1, 2.1, 0.1]} radius={0.1} smoothness={4}>
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
          position={[0, 0.3, 0.15]}
          fontSize={0.5}
          anchorX="center"
          anchorY="middle"
        >
          {emoji}
        </Text>

        {/* Title */}
        <Text
          position={[0, -0.4, 0.15]}
          fontSize={0.2}
          color={color}
          anchorX="center"
          anchorY="middle"
          maxWidth={2.5}
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
}

const ProjectPortalContent = ({ projects, onProjectClick }: ProjectPortalProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  const positions: [number, number, number][] = [
    [-2, 1, 0],
    [2, 1, 0],
    [-2, -1.5, 0],
    [2, -1.5, 0],
  ];

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
          />
        ))}
      </group>
    </>
  );
};

const ProjectPortal = ({ projects, onProjectClick }: ProjectPortalProps) => {
  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <ProjectPortalContent projects={projects} onProjectClick={onProjectClick} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ProjectPortal;
