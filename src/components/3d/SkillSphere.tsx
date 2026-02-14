import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo, useState } from 'react';
import { Text, Float, Billboard } from '@react-three/drei';
import * as THREE from 'three';

interface SkillNodeProps {
  skill: string;
  position: [number, number, number];
  color: string;
  onHover?: (skill: string | null) => void;
}

const SkillNode = ({ skill, position, color, onHover }: SkillNodeProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      
      const scale = hovered ? 1.5 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
    }
  });

  return (
    <Float speed={3} rotationIntensity={0.2} floatIntensity={0.5}>
      <group position={position}>
        <mesh
          ref={meshRef}
          onPointerOver={() => {
            setHovered(true);
            onHover?.(skill);
          }}
          onPointerOut={() => {
            setHovered(false);
            onHover?.(null);
          }}
        >
          <dodecahedronGeometry args={[0.4, 0]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={hovered ? 1 : 0.3}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        
        {hovered && (
          <Billboard>
            <Text
              position={[0, 0.8, 0]}
              fontSize={0.3}
              color={color}
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.02}
              outlineColor="#000000"
            >
              {skill}
            </Text>
          </Billboard>
        )}
      </group>
    </Float>
  );
};

interface SkillSphereProps {
  skills: { name: string; color: string }[];
  onSkillHover?: (skill: string | null) => void;
}

const SkillSphereContent = ({ skills, onSkillHover }: SkillSphereProps) => {
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => {
    return skills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / skills.length);
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      const radius = 3;
      
      return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi),
      ] as [number, number, number];
    });
  }, [skills]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

      <group ref={groupRef}>
        {/* Central core */}
        <mesh>
          <icosahedronGeometry args={[0.8, 1]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.5}
            wireframe
          />
        </mesh>

        {/* Connection lines */}
        {positions.map((pos, i) => (
          <line key={`line-${i}`}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, ...pos]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color={skills[i].color} transparent opacity={0.3} />
          </line>
        ))}

        {/* Skill nodes */}
        {skills.map((skill, i) => (
          <SkillNode
            key={skill.name}
            skill={skill.name}
            position={positions[i]}
            color={skill.color}
            onHover={onSkillHover}
          />
        ))}
      </group>
    </>
  );
};

const SkillSphere = ({ skills, onSkillHover }: SkillSphereProps) => {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <SkillSphereContent skills={skills} onSkillHover={onSkillHover} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default SkillSphere;
