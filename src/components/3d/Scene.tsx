import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Environment, Stars, Float } from '@react-three/drei';
import FloatingGeometry from './FloatingGeometry';
import ParticleField from './ParticleField';

const Scene = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00ffff" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />
          <spotLight
            position={[0, 20, 0]}
            angle={0.3}
            penumbra={1}
            intensity={0.5}
            color="#00ffff"
          />

          <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <FloatingGeometry position={[-4, 2, -5]} type="octahedron" color="#00ffff" />
          </Float>
          
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <FloatingGeometry position={[4, -2, -3]} type="icosahedron" color="#ff00ff" />
          </Float>
          
          <Float speed={2.5} rotationIntensity={0.7} floatIntensity={1.2}>
            <FloatingGeometry position={[6, 3, -6]} type="torus" color="#ffaa00" />
          </Float>
          
          <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
            <FloatingGeometry position={[-5, -3, -4]} type="dodecahedron" color="#00ffff" />
          </Float>

          <ParticleField count={500} />
          
          <Stars
            radius={100}
            depth={50}
            count={2000}
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

export default Scene;