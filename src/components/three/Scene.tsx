"use client";

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Animated 3D Logo ─── */
function AnimatedLogo() {
  const groupRef = useRef<THREE.Group>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  // Load logo texture
  const texture = useLoader(THREE.TextureLoader, '/logo.png');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow continuous rotation on Y axis
    groupRef.current.rotation.y += delta * 0.3;

    // Tilt towards mouse
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouseRef.current.y * 0.3,
      0.03
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      -mouseRef.current.x * 0.15,
      0.03
    );

    // Gentle mouse-follow position
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      viewport.width / 5 + mouseRef.current.x * 0.4,
      0.02
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      mouseRef.current.y * 0.3,
      0.02
    );
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={groupRef} position={[viewport.width / 5, 0, 0]}>
        {/* Front face */}
        <mesh>
          <planeGeometry args={[2.8, 2.8]} />
          <meshStandardMaterial
            map={texture}
            transparent
            alphaTest={0.1}
            side={THREE.FrontSide}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        {/* Back face (mirrored) */}
        <mesh rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[2.8, 2.8]} />
          <meshStandardMaterial
            map={texture}
            transparent
            alphaTest={0.1}
            side={THREE.FrontSide}
            roughness={0.3}
            metalness={0.1}
          />
        </mesh>
        {/* Glow ring behind logo */}
        <mesh position={[0, 0, -0.1]} scale={1.3}>
          <ringGeometry args={[1.0, 1.4, 64]} />
          <meshBasicMaterial color="#ff0000" transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  );
}

/* ─── floating particles ─── */
function Particles({ count = 100 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { viewport } = useThree();

  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      arr.push({
        x: (Math.random() - 0.5) * viewport.width * 2.5,
        y: (Math.random() - 0.5) * viewport.height * 2.5,
        z: (Math.random() - 0.5) * 6 - 2,
        speed: Math.random() * 0.3 + 0.1,
        size: Math.random() * 0.04 + 0.015,
      });
    }
    return arr;
  }, [count, viewport]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + i) * 0.3,
        p.y + Math.cos(t * p.speed + i * 0.5) * 0.3,
        p.z
      );
      dummy.scale.setScalar(p.size);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const palette = ['#ff0000', '#ffed00', '#7f1c5f', '#421553'];

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color={palette[0]} toneMapped={false} />
    </instancedMesh>
  );
}

/* ─── floating accent shapes ─── */
function FloatingAccents() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={2} floatIntensity={1}>
        <mesh position={[-3, 2, -3]} scale={0.3}>
          <torusGeometry args={[1, 0.4, 16, 32]} />
          <meshPhysicalMaterial color="#ffed00" roughness={0.2} metalness={0.8} clearcoat={1} />
        </mesh>
      </Float>
      <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.2}>
        <mesh position={[4, -2, -4]} scale={0.25}>
          <icosahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial color="#7f1c5f" roughness={0.2} metalness={0.8} clearcoat={1} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={1} floatIntensity={0.8}>
        <mesh position={[-4, -1, -2]} scale={0.2}>
          <dodecahedronGeometry args={[1, 0]} />
          <meshPhysicalMaterial color="#421553" roughness={0.2} metalness={0.8} clearcoat={1} />
        </mesh>
      </Float>
    </group>
  );
}

/* ─── main scene ─── */
export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
      }}
      gl={{ alpha: true, antialias: true }}
    >
      <color attach="background" args={['#f8f6f5']} />

      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, 3, 3]} intensity={1.5} color="#ff0000" distance={15} />
      <pointLight position={[3, -3, 2]} intensity={1} color="#ffed00" distance={12} />
      <pointLight position={[0, 5, -3]} intensity={0.8} color="#7f1c5f" distance={10} />

      <AnimatedLogo />
      <Particles count={100} />
      <FloatingAccents />
    </Canvas>
  );
}
