'use client';

/*
 * The hero scene — the pass at night.
 *
 * A brass cloche on a plate. Order tickets drift around it. Steam rises
 * from the rim. Take the lid off (hover, or wait for the kitchen's own
 * rhythm) and the site being served is revealed underneath: a little
 * browser card, warm from the heat lamp.
 *
 * Everything is primitives and canvas-painted textures: no downloads.
 */

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber';
import { ContactShadows, Environment, Float, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { useLang } from '@/components/providers/LangProvider';
import { BUILD_URL } from '@/lib/content';
import { makeSiteCardTexture, makeSteamTexture, makeTicketTexture } from './textures';

/* where the floating tickets hang, stage-local */
const TICKET_SPOTS: [x: number, y: number, z: number, rotZ: number, scale: number][] = [
  [-1.75, 0.55, -0.45, 0.14, 1.0],
  [1.78, 0.15, 0.05, -0.1, 1.05],
  [-1.5, -0.55, 0.4, -0.16, 0.92],
  [1.5, 1.2, -0.35, 0.08, 0.85],
  [-0.35, 1.35, -0.55, -0.06, 0.8],
];

const damp = THREE.MathUtils.damp;

function Rig({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.y = damp(g.rotation.y, state.pointer.x * 0.22, 3, delta);
    g.rotation.x = damp(g.rotation.x, -state.pointer.y * 0.1, 3, delta);
    g.position.y = 0.55 + damp(g.position.y - 0.55, state.pointer.y * 0.08, 3, delta);
  });
  return (
    <group ref={ref} position={[0, 0.55, 0]}>
      {children}
    </group>
  );
}

function Cloche({ reduced, lowPower }: { reduced: boolean; lowPower: boolean }) {
  const lift = useRef(0);
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.PointLight>(null);
  const cardRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [autoOpen, setAutoOpen] = useState(false);

  const siteCardTex = useMemo(() => makeSiteCardTexture(BUILD_URL), []);

  useEffect(() => {
    if (reduced) return;
    const open = () => {
      setAutoOpen(true);
      window.setTimeout(() => setAutoOpen(false), 3400);
    };
    const kick = window.setTimeout(open, 2800);
    const iv = window.setInterval(open, 11500);
    return () => {
      window.clearTimeout(kick);
      window.clearInterval(iv);
    };
  }, [reduced]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const target = autoOpen ? 1 : hovered ? 0.55 : 0;
    lift.current = damp(lift.current, target, 3.2, delta);
    const L = lift.current;

    const bob = reduced ? 0 : Math.sin(state.clock.elapsedTime * 1.1) * 0.045 * (1 - L);
    g.position.y = -1.15 + L * 1.25 + bob;
    g.position.z = -L * 0.3;
    g.rotation.z = -L * 0.22;

    if (glowRef.current) {
      glowRef.current.intensity = 1.4 + L * (lowPower ? 5 : 9);
    }
    if (cardRef.current) {
      const mat = cardRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.clamp((L - 0.15) / 0.5, 0, 1);
      cardRef.current.position.y = -1.05 + L * 0.95;
      cardRef.current.position.z = L * 0.3;
      cardRef.current.rotation.x = -0.42 + L * 0.34;
    }
  });

  return (
    <group>
      <group
        ref={groupRef}
        position={[0, -1.15, 0]}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        {/* dome */}
        <mesh>
          <sphereGeometry args={[1.02, 48, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#d9a441" metalness={1} roughness={0.24} envMapIntensity={1.15} side={THREE.DoubleSide} />
        </mesh>
        {/* base band */}
        <mesh position={[0, 0.015, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.02, 0.045, 16, 72]} />
          <meshStandardMaterial color="#b07c1f" metalness={1} roughness={0.3} />
        </mesh>
        {/* knob */}
        <mesh position={[0, 1.1, 0]}>
          <cylinderGeometry args={[0.05, 0.065, 0.16, 16]} />
          <meshStandardMaterial color="#b07c1f" metalness={1} roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.22, 0]}>
          <sphereGeometry args={[0.105, 24, 16]} />
          <meshStandardMaterial color="#e0a93b" metalness={1} roughness={0.22} />
        </mesh>
      </group>

      {/* the plate */}
      <group position={[0, -1.2, 0]}>
        <mesh>
          <cylinderGeometry args={[1.12, 0.98, 0.09, 64]} />
          <meshStandardMaterial color="#f2e9d8" roughness={0.42} metalness={0.04} />
        </mesh>
        <mesh position={[0, 0.055, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.04, 0.05, 14, 72]} />
          <meshStandardMaterial color="#b07c1f" metalness={1} roughness={0.35} />
        </mesh>
      </group>

      {/* warm light under the lid + the served site card */}
      <pointLight ref={glowRef} position={[0, -0.8, 0.45]} color="#ffcf7e" intensity={1.4} distance={7} decay={2} />
      <mesh ref={cardRef} position={[0, -1.05, 0]} rotation={[-0.42, 0, 0]}>
        <planeGeometry args={[1.6, 1.0]} />
        <meshBasicMaterial map={siteCardTex} transparent opacity={0} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>

      <ContactShadows position={[0, -1.28, 0]} opacity={0.55} scale={6.2} blur={2.6} far={2.4} color="#02100c" />
    </group>
  );
}

function Tickets({ lang, count, reduced }: { lang: 'en' | 'vi'; count: number; reduced: boolean }) {
  const textures = useMemo(
    () => Array.from({ length: count }, (_, i) => makeTicketTexture(lang, i)),
    [lang, count],
  );
  const orbitRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (reduced) return;
    const g = orbitRef.current;
    if (g) g.rotation.y = Math.sin(state.clock.elapsedTime * 0.16) * 0.24;
  });
  return (
    <group ref={orbitRef}>
      {textures.map((tex, i) => {
        const [x, y, z, rotZ, s] = TICKET_SPOTS[i % TICKET_SPOTS.length];
        return (
          <Float
            key={i}
            speed={reduced ? 0 : 1.3 + i * 0.22}
            rotationIntensity={reduced ? 0 : 0.38}
            floatIntensity={reduced ? 0 : 0.9}
          >
            <mesh position={[x, y, z]} rotation={[0, i % 2 ? -0.32 : 0.28, rotZ]}>
              <planeGeometry args={[0.64 * s, 0.84 * s]} />
              <meshBasicMaterial map={tex} toneMapped={false} side={THREE.DoubleSide} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function Steam({ count, reduced }: { count: number; reduced: boolean }) {
  const tex = useMemo(() => makeSteamTexture(), []);
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 1.3,
        z: (Math.random() - 0.5) * 0.7,
        phase: Math.random(),
        speed: 0.5 + Math.random() * 0.4,
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
      mesh.position.y = -1 + k * 2.5;
      mesh.position.x = p.x + Math.sin((t + i * 1.7) * 0.8) * 0.14;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.sin(k * Math.PI) * 0.45;
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

export default function HeroScene() {
  const { lang } = useLang();
  const [lowPower, setLowPower] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setLowPower(window.matchMedia('(max-width: 900px)').matches);
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <Canvas
      dpr={[1, lowPower ? 1.5 : 1.75]}
      camera={{ position: [0, 0.3, 6.8], fov: 34 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      frameloop={reduced ? 'demand' : 'always'}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} color="#f6efe2" />
        <spotLight position={[4.5, 6, 4.5]} angle={0.55} penumbra={1} intensity={140} color="#ffd9a0" decay={2} distance={30} />
        <directionalLight position={[-4.5, 2.5, -4]} intensity={0.65} color="#9fc0ac" />
        <pointLight position={[0, -0.6, -4]} intensity={5} color="#3c5a50" distance={12} />

        <Rig>
          <Cloche reduced={reduced} lowPower={lowPower} />
          <Tickets lang={lang} count={lowPower ? 3 : 5} reduced={reduced} />
          <Steam count={lowPower ? 6 : 10} reduced={reduced} />
        </Rig>

        <Environment resolution={256} frames={1}>
          <Lightformer intensity={3.2} color="#ffd9a0" position={[0, 5, 0]} scale={[12, 12, 1]} rotation-x={Math.PI / 2} />
          <Lightformer intensity={1.1} color="#7ba58f" position={[-6, 1, 0]} scale={[14, 6, 1]} rotation-y={Math.PI / 2} />
          <Lightformer intensity={1.4} color="#e0a93b" position={[5, 2, 2]} scale={[8, 8, 1]} rotation-y={-Math.PI / 2} />
        </Environment>
      </Suspense>
    </Canvas>
  );
}
