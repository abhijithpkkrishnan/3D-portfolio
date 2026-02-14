import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import { Text3D, Center, Float, MeshTransmissionMaterial, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

// Floating text with glass effect
const GlassText = ({ text, position, color }: { text: string; position: [number, number, number]; color: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, normalizedX * 0.2, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, normalizedY * 0.1, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={position}>
        <Center>
          <mesh>
            <boxGeometry args={[text.length * 0.8, 1.2, 0.3]} />
            <MeshTransmissionMaterial
              color={color}
              thickness={0.2}
              roughness={0}
              transmission={0.9}
              ior={1.5}
              chromaticAberration={0.3}
            />
          </mesh>
        </Center>
      </group>
    </Float>
  );
};

// Energy core
const EnergyCore = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (coreRef.current) {
      coreRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      coreRef.current.scale.setScalar(scale);
    }
    if (ringsRef.current) {
      ringsRef.current.rotation.z = state.clock.elapsedTime * 0.8;
    }
  });

  return (
    <group position={[0, 0, -5]}>
      {/* Core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
          wireframe
        />
      </mesh>

      {/* Rings */}
      <group ref={ringsRef}>
        {[1, 2, 3].map((i) => (
          <mesh key={i} rotation={[Math.PI / 2, 0, (i * Math.PI) / 3]}>
            <torusGeometry args={[2 + i * 0.5, 0.02, 16, 100]} />
            <meshStandardMaterial
              color={i === 1 ? '#00ffff' : i === 2 ? '#ff00ff' : '#ffaa00'}
              emissive={i === 1 ? '#00ffff' : i === 2 ? '#ff00ff' : '#ffaa00'}
              emissiveIntensity={0.8}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Orbital particles
const OrbitalParticles = () => {
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = 100;

  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 4 + Math.random() * 2;
      const height = (Math.random() - 0.5) * 3;
      return { angle, radius, height, speed: 0.2 + Math.random() * 0.3 };
    });
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const p = particles[i];
        const newAngle = p.angle + state.clock.elapsedTime * p.speed;
        child.position.x = Math.cos(newAngle) * p.radius;
        child.position.z = Math.sin(newAngle) * p.radius;
        child.position.y = p.height + Math.sin(state.clock.elapsedTime + i) * 0.5;
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      {particles.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#ff00ff' : '#ffaa00'}
            emissive={i % 3 === 0 ? '#00ffff' : i % 3 === 1 ? '#ff00ff' : '#ffaa00'}
            emissiveIntensity={1}
          />
        </mesh>
      ))}
    </group>
  );
};

const HeroSceneContent = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

      <EnergyCore />
      <OrbitalParticles />

      <Sparkles
        count={100}
        size={3}
        speed={0.5}
        opacity={0.8}
        scale={15}
        color="#00ffff"
      />
    </>
  );
};

const HeroScene = () => {
  return (
    <div className="absolute inset-0 -z-5">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <HeroSceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene;
