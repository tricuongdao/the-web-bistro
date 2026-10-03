'use client';

/*
 * The hero scene — the crest, plated.
 *
 * "WB;" extruded from the house serif floats above a slowly turning brass
 * plate, cutlery crossed behind it. Steam rises, embers drift, and the
 * whole rig leans toward the pointer. Everything is generated: glyph
 * outlines, canvas textures, no downloads.
 */

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { CREST, glyphGeometry } from './crestGeometry';
import { makeEmberTexture, makeSteamTexture } from './textures';

const damp = THREE.MathUtils.damp;

type PointerRef = { current: { x: number; y: number } };

function Rig({
  children,
  shift,
  y,
  scl,
  pointer,
}: {
  children: React.ReactNode;
  shift: number;
  y: number;
  scl: number;
  pointer: PointerRef;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y = damp(g.rotation.y, pointer.current.x * 0.14, 3, delta);
    g.rotation.x = damp(g.rotation.x, -pointer.current.y * 0.07, 3, delta);
    g.position.x = damp(g.position.x, shift, 3, delta);
  });
  return (
    <group ref={ref} position={[shift, y, 0]} scale={scl}>
      {children}
    </group>
  );
}

function Crest({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const plateRef = useRef<THREE.Group>(null);

  const S = 0.00162;
  const gW = useMemo(() => glyphGeometry('W'), []);
  const gB = useMemo(() => glyphGeometry('B'), []);
  const gS = useMemo(() => glyphGeometry(';', 120), []);

  const brass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c98a4b',
        metalness: 1,
        roughness: 0.24,
        envMapIntensity: 1.25,
        side: THREE.DoubleSide,
      }),
    [],
  );
  const copper = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#b87333',
        metalness: 1,
        roughness: 0.3,
        envMapIntensity: 1.1,
        side: THREE.DoubleSide,
      }),
    [],
  );
  const steel = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8d5a2e',
        metalness: 1,
        roughness: 0.36,
        envMapIntensity: 0.9,
      }),
    [],
  );

  useFrame((state) => {
    const g = ref.current;
    const t = state.clock.elapsedTime;
    if (g) {
      g.position.y = 0.32 + (reduced ? 0 : Math.sin(t * 0.9) * 0.07);
      g.rotation.y = reduced ? 0 : Math.sin(t * 0.32) * 0.12;
      g.rotation.x = reduced ? 0 : Math.sin(t * 0.5) * 0.035;
    }
    if (plateRef.current && !reduced) {
      plateRef.current.rotation.y = t * 0.07;
    }
  });

  return (
    <group>
      {/* the crest */}
      <group ref={ref} position={[0, 0.32, 0]}>
        <group scale={S} position={[-CREST.width * 0.5 * S, -262 * S, 0]}>
          <mesh geometry={gW} material={brass} />
          <mesh geometry={gB} material={brass} position={[988, 0, 0]} />
          <mesh geometry={gS} material={copper} position={[1600, 0, 0]} scale={0.85} />
        </group>
        {/* cutlery crossed behind */}
        <mesh material={steel} position={[0.05, 0, -0.42]} rotation={[0, 0, -0.58]}>
          <capsuleGeometry args={[0.05, 3.6, 6, 14]} />
        </mesh>
        <mesh material={steel} position={[-0.05, 0, -0.44]} rotation={[0, 0, 0.58]}>
          <capsuleGeometry args={[0.05, 3.6, 6, 14]} />
        </mesh>
      </group>

      {/* the plate it is served on */}
      <group ref={plateRef} position={[0, -1.32, 0]}>
        <mesh>
          <cylinderGeometry args={[1.72, 1.56, 0.06, 72]} />
          <meshStandardMaterial color="#191411" metalness={0.35} roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.035, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.72, 0.045, 14, 80]} />
          <meshStandardMaterial color="#c98a4b" metalness={1} roughness={0.28} envMapIntensity={1.2} />
        </mesh>
        <mesh position={[0, 0.034, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.28, 0.014, 8, 72]} />
          <meshStandardMaterial color="#8d5a2e" metalness={1} roughness={0.4} />
        </mesh>
      </group>

      {/* warm glow under the crest + grounding shadow */}
      <pointLight position={[0, -0.7, 0.7]} color="#ffb86b" intensity={6} distance={8} decay={2} />
      <ContactShadows position={[0, -1.38, 0]} opacity={0.55} scale={8} blur={2.8} far={2.6} color="#000000" />
    </group>
  );
}

function Steam({ count, reduced }: { count: number; reduced: boolean }) {
  const tex = useMemo(() => makeSteamTexture(), []);
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 1.5,
        z: (Math.random() - 0.5) * 0.7,
        phase: Math.random(),
        speed: 0.45 + Math.random() * 0.35,
        size: 1.0 + Math.random() * 0.9,
      })),
    [count],
  );
  const refs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    items.forEach((p, i) => {
      const mesh = refs.current[i];
      if (!mesh) return;
      const k = ((t * p.speed + p.phase * 4) % 4) / 4;
      mesh.position.y = -1 + k * 2.6;
      mesh.position.x = p.x + Math.sin((t + i * 1.7) * 0.8) * 0.14;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.sin(k * Math.PI) * 0.4;
      const s = p.size * (0.55 + k * 1.6);
      mesh.scale.set(s, s, 1);
    });
  });

  return (
    <group>
      {items.map((p, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          position={[p.x, -1, p.z]}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            map={tex}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            color="#f6efe2"
          />
        </mesh>
      ))}
    </group>
  );
}

function Embers({ count, reduced }: { count: number; reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  const tex = useMemo(() => makeEmberTexture(), []);
  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4.6;
      positions[i * 3 + 1] = Math.random() * 4.2 - 1.6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.4 - 0.3;
      speeds[i] = 0.22 + Math.random() * 0.5;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state, delta) => {
    if (reduced) return;
    const pts = ref.current;
    if (!pts) return;
    const attr = pts.geometry.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      const y = attr.getY(i) + speeds[i] * delta;
      attr.setY(i, y > 2.9 ? -1.6 : y);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={tex}
        size={0.085}
        sizeAttenuation
        transparent
        opacity={0.8}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#ffb86b"
      />
    </points>
  );
}

export default function CrestScene() {
  const [lowPower, setLowPower] = useState(false);
  const [reduced, setReduced] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setLowPower(window.matchMedia('(max-width: 900px)').matches);
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  const shift = lowPower ? 0 : 1.02;
  const y = lowPower ? -1.8 : 0.05;
  const scl = lowPower ? 0.62 : 1;

  return (
    <Canvas
      dpr={[1, lowPower ? 1.5 : 1.75]}
      camera={{ position: [0, 0.1, 6.9], fov: 34 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.45} color="#f7f1e6" />
        <spotLight position={[4.5, 6, 4.5]} angle={0.55} penumbra={1} intensity={150} color="#ffd9a0" decay={2} distance={32} />
        <directionalLight position={[-5, 2.5, -4]} intensity={0.5} color="#9fb6c0" />
        <pointLight position={[0, -0.4, -4.5]} intensity={5} color="#3a2a1c" distance={14} />

        <Rig shift={shift} y={y} scl={scl} pointer={pointer}>
          <Crest reduced={reduced} />
          <Steam count={lowPower ? 6 : 11} reduced={reduced} />
          <Embers count={lowPower ? 40 : 80} reduced={reduced} />
        </Rig>

        <Environment resolution={256} frames={1}>
          <Lightformer intensity={3.4} color="#ffd9a0" position={[0, 5, 1]} scale={[12, 12, 1]} rotation-x={Math.PI / 2} />
          <Lightformer intensity={1.6} color="#e2603a" position={[6, 1.5, 2]} scale={[9, 9, 1]} rotation-y={-Math.PI / 2} />
          <Lightformer intensity={1.0} color="#7d93a0" position={[-6, 1, -1]} scale={[12, 6, 1]} rotation-y={Math.PI / 2} />
          <Lightformer intensity={1.2} color="#f7f1e6" position={[0, 0.5, 6]} scale={[10, 4, 1]} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
