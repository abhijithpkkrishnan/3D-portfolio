import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useMemo, useEffect, useState } from 'react';
import { Environment, Stars, Float, Text3D, Center, useTexture, Sparkles, Trail, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useMousePosition } from '@/hooks/useMousePosition';

// Mouse-following camera
const CameraController = () => {
  const { camera } = useThree();
  const { normalizedX, normalizedY } = useMousePosition();

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, normalizedX * 2, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, normalizedY * 1.5, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
};

// Glowing orb that follows mouse with trail
const MouseOrb = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { normalizedX, normalizedY } = useMousePosition();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, normalizedX * 8, 0.08);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, normalizedY * 5, 0.08);
    }
  });

  return (
    <Trail
      width={2}
      length={8}
      color={new THREE.Color('#00ffff')}
      attenuation={(t) => t * t}
    >
      <mesh ref={meshRef} position={[0, 0, 2]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Trail>
  );
};

// Interactive floating crystals
const Crystal = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      
      if (hovered) {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, scale * 1.5, 0.1));
      } else {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1));
      }
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={scale}
      >
        <octahedronGeometry args={[1, 0]} />
        <MeshTransmissionMaterial
          color={color}
          thickness={0.5}
          roughness={0}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.5}
          backside
          emissive={color}
          emissiveIntensity={hovered ? 0.5 : 0.2}
        />
      </mesh>
    </Float>
  );
};

// Orbiting skill ring
const SkillRing = ({ radius, speed, color }: { radius: number; speed: number; color: string }) => {
  const groupRef = useRef<THREE.Group>(null);
  const particleCount = 50;

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      temp.push({
        x: Math.cos(angle) * radius,
        y: (Math.random() - 0.5) * 0.5,
        z: Math.sin(angle) * radius,
      });
    }
    return temp;
  }, [radius]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * speed;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {particles.map((pos, i) => (
        <mesh key={i} position={[pos.x, pos.y, pos.z]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
        </mesh>
      ))}
    </group>
  );
};

// DNA Helix structure
const DNAHelix = () => {
  const groupRef = useRef<THREE.Group>(null);
  const segments = 30;

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[-8, 0, -5]}>
      {Array.from({ length: segments }).map((_, i) => {
        const angle = (i / segments) * Math.PI * 4;
        const y = (i - segments / 2) * 0.5;
        return (
          <group key={i}>
            <mesh position={[Math.cos(angle) * 1.5, y, Math.sin(angle) * 1.5]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={0.5} />
            </mesh>
            <mesh position={[-Math.cos(angle) * 1.5, y, -Math.sin(angle) * 1.5]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} />
            </mesh>
            {i % 3 === 0 && (
              <mesh position={[0, y, 0]} rotation={[0, angle, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 3, 8]} />
                <meshStandardMaterial color="#ffaa00" emissive="#ffaa00" emissiveIntensity={0.3} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
};

// Particle explosion on click
const ParticleExplosion = ({ position, active }: { position: [number, number, number]; active: boolean }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const [particles] = useState(() => {
    const temp = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 2;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 2;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }
    return temp;
  });

  useFrame(() => {
    if (pointsRef.current && active) {
      pointsRef.current.scale.multiplyScalar(1.05);
      const material = pointsRef.current.material as THREE.PointsMaterial;
      material.opacity *= 0.95;
    }
  });

  if (!active) return null;

  return (
    <points ref={pointsRef} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[particles, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#00ffff" transparent opacity={1} />
    </points>
  );
};

// Wormhole effect
const Wormhole = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.3;
      const material = meshRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -20]}>
      <torusGeometry args={[8, 0.5, 16, 100]} />
      <meshStandardMaterial
        color="#00ffff"
        emissive="#00ffff"
        emissiveIntensity={0.3}
        transparent
        opacity={0.5}
        wireframe
      />
    </mesh>
  );
};

// Floating grid floor
const GridFloor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
      <planeGeometry args={[100, 100, 50, 50]} />
      <meshStandardMaterial
        color="#00ffff"
        wireframe
        transparent
        opacity={0.1}
        emissive="#00ffff"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Advanced particle field
const AdvancedParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 2000;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80;

      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        col[i * 3] = 0; col[i * 3 + 1] = 1; col[i * 3 + 2] = 1; // Cyan
      } else if (colorChoice < 0.66) {
        col[i * 3] = 1; col[i * 3 + 1] = 0; col[i * 3 + 2] = 1; // Magenta
      } else {
        col[i * 3] = 1; col[i * 3 + 1] = 0.7; col[i * 3 + 2] = 0; // Gold
      }
    }
    return [pos, col];
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const InteractiveScene = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CameraController />
          
          {/* Lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={2} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ff00ff" />
          <pointLight position={[0, 10, -10]} intensity={1} color="#ffaa00" />
          <spotLight
            position={[0, 20, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            color="#00ffff"
          />

          {/* Mouse following orb */}
          <MouseOrb />

          {/* Interactive crystals */}
          <Crystal position={[-5, 3, -3]} color="#00ffff" scale={0.8} />
          <Crystal position={[6, -2, -4]} color="#ff00ff" scale={1} />
          <Crystal position={[4, 4, -6]} color="#ffaa00" scale={0.6} />
          <Crystal position={[-4, -3, -5]} color="#00ffff" scale={0.7} />
          <Crystal position={[0, 5, -8]} color="#ff00ff" scale={0.9} />

          {/* Skill rings */}
          <SkillRing radius={6} speed={0.3} color="#00ffff" />
          <SkillRing radius={8} speed={-0.2} color="#ff00ff" />
          <SkillRing radius={10} speed={0.15} color="#ffaa00" />

          {/* DNA Helix */}
          <DNAHelix />

          {/* Wormhole background */}
          <Wormhole />

          {/* Grid floor */}
          <GridFloor />

          {/* Advanced particles */}
          <AdvancedParticles />

          {/* Sparkle effects */}
          <Sparkles
            count={200}
            size={2}
            speed={0.5}
            opacity={0.8}
            scale={30}
            color="#00ffff"
          />

          {/* Stars background */}
          <Stars
            radius={100}
            depth={50}
            count={3000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default InteractiveScene;
