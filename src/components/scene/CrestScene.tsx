'use client';

/*
 * The hero scene — the house crest, plated.
 *
 * "WB;" is extruded from the house serif in two metals: bone enamel faces
 * with brass walls, the house semicolon in copper. It hangs over the plate
 * it is served on, a fork and a knife crossed behind it, steam rising off
 * the pass. Everything is generated: glyph outlines, cutlery profiles,
 * canvas textures, no downloads.
 *
 * Layout note: the composition is authored in "crest units" (the monogram
 * is ~2.5 wide) and then tilted, scaled and placed by the Rig, so desktop
 * and phone get the same crest at different sizes rather than two scenes.
 */

import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { CREST, glyphGeometry } from './crestGeometry';
import { PLATE, forkGeometry, knifeGeometry, plateProfile } from './tableware';
import { makeEmberTexture, makeSteamTexture } from './textures';

const damp = THREE.MathUtils.damp;

/* ── the crest, in crest units ────────────────────────────────────────── */

/** glyph scale — the monogram lands ~2.47 wide */
const S = 0.00135;
/** baseline offset: centres the cap height against the semicolon's tail */
const MARK_MID = -262 * S;
/** where the monogram sits in the composition */
const MARK_Y = 0.18;
/** crossed flatware behind it: length multiplier, tilt off vertical, depth */
const FLATWARE = { scale: 1.05, tilt: 0.55, z: -0.12, dz: 0.04 };
/** the plate below: plate bottom (-0.87) to fork tip (+1.33) is 2.2 tall */
const PLATE_Y = -0.78;
/** the whole rig leans back so the plate reads as a plate, not a floor */
const TILT = 0.24;

/** pause the canvas while it is scrolled out of view */
function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: '140px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

type PointerRef = { current: { x: number; y: number } };

function Rig({
  children,
  shift,
  y,
  scl,
  yaw,
  pointer,
}: {
  children: React.ReactNode;
  shift: number;
  y: number;
  scl: number;
  yaw: number;
  pointer: PointerRef;
}) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    const dt = Math.min(delta, 1 / 30);
    g.rotation.y = damp(g.rotation.y, yaw + pointer.current.x * 0.12, 3, dt);
    g.rotation.x = damp(g.rotation.x, TILT - pointer.current.y * 0.05, 3, dt);
    g.position.x = damp(g.position.x, shift, 3, dt);
  });
  return (
    <group ref={ref} position={[shift, y, 0]} rotation={[TILT, yaw, 0]} scale={scl}>
      {children}
    </group>
  );
}

function Crest({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const plateRef = useRef<THREE.Group>(null);

  const gW = useMemo(() => glyphGeometry('W'), []);
  const gB = useMemo(() => glyphGeometry('B'), []);
  const gS = useMemo(() => glyphGeometry(';', 48, 8), []);
  const gFork = useMemo(() => forkGeometry(), []);
  const gKnife = useMemo(() => knifeGeometry(), []);
  const plateGeo = useMemo(() => new THREE.LatheGeometry(plateProfile(), 84), []);

  /* bone enamel faces, brass walls — the flat wordmark's two colours,
     given a body: a brass sign with enamel poured into it. The enamel is
     deliberately diffuse (metal only ever shows its reflections, and the
     room this crest sits in is dark), so the mark stays legible while the
     walls gleam. */
  const enamel = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#f4ead8',
        metalness: 0,
        roughness: 0.6,
        clearcoat: 0.12,
        clearcoatRoughness: 0.6,
        envMapIntensity: 0.35,
        side: THREE.DoubleSide,
      }),
    [],
  );
  const brass = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#cf9455',
        metalness: 1,
        roughness: 0.32,
        envMapIntensity: 1.3,
        side: THREE.DoubleSide,
      }),
    [],
  );
  /* the semicolon stays solid copper, the way the wordmark sets it apart */
  const copper = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e09a52',
        metalness: 1,
        roughness: 0.28,
        envMapIntensity: 1.25,
        side: THREE.DoubleSide,
      }),
    [],
  );
  /* the service: cooler and quieter than the crest, so the mark leads */
  const steel = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#8a847c',
        metalness: 1,
        roughness: 0.34,
        envMapIntensity: 0.7,
        side: THREE.DoubleSide,
      }),
    [],
  );
  const steelDark = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#645e58',
        metalness: 1,
        roughness: 0.46,
        envMapIntensity: 0.6,
        side: THREE.DoubleSide,
      }),
    [],
  );

  useFrame((state) => {
    const g = ref.current;
    const t = state.clock.elapsedTime;
    if (g) {
      g.position.y = MARK_Y + (reduced ? 0 : Math.sin(t * 0.9) * 0.05);
      g.rotation.y = reduced ? 0 : Math.sin(t * 0.32) * 0.07;
      g.rotation.x = reduced ? 0 : Math.sin(t * 0.5) * 0.02;
    }
    if (plateRef.current && !reduced) {
      plateRef.current.rotation.y = t * 0.05;
    }
  });

  return (
    <group>
      {/* the monogram, crossed cutlery behind it */}
      <group ref={ref} position={[0, MARK_Y, 0]}>
        <group scale={S} position={[-CREST.width * 0.5 * S, MARK_MID, 0]}>
          <mesh geometry={gW} material={[enamel, brass]} />
          <mesh geometry={gB} material={[enamel, brass]} position={[988, 0, 0]} />
          <mesh geometry={gS} material={copper} position={[1600, 0, 0]} scale={0.85} />
        </group>
        {/* the service, crossed: fork left, knife right */}
        <mesh
          geometry={gFork}
          material={[steel, steelDark]}
          position={[0, 0, FLATWARE.z]}
          rotation={[0, 0, FLATWARE.tilt]}
          scale={FLATWARE.scale}
        />
        <mesh
          geometry={gKnife}
          material={[steel, steelDark]}
          position={[0, 0, FLATWARE.z - FLATWARE.dz]}
          rotation={[0, 0, -FLATWARE.tilt]}
          scale={FLATWARE.scale}
        />
      </group>

      {/* the plate it is served on */}
      <group ref={plateRef} position={[0, PLATE_Y, 0]}>
        <mesh geometry={plateGeo}>
          <meshStandardMaterial
            color="#171210"
            metalness={0.1}
            roughness={0.72}
            envMapIntensity={0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[PLATE.radius * 0.985, 0.015, 10, 96]} />
          <meshStandardMaterial color="#8f6531" metalness={1} roughness={0.42} envMapIntensity={0.55} />
        </mesh>
        <mesh position={[0, 0.002, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[PLATE.radius * 0.74, 0.008, 8, 84]} />
          <meshStandardMaterial color="#6b4522" metalness={1} roughness={0.55} envMapIntensity={0.4} />
        </mesh>
      </group>

      {/* warm glow under the crest + grounding shadow */}
      <pointLight position={[0, PLATE_Y + 0.5, 0.5]} color="#ffb86b" intensity={1.1} distance={5} decay={2} />
      <ContactShadows
        position={[0, PLATE_Y - 0.1, 0]}
        opacity={0.45}
        scale={6}
        blur={2.6}
        far={2.6}
        color="#000000"
      />
    </group>
  );
}

/** Steam off the pass: a soft haze rising behind the crest, never over it. */
function Steam({ count, reduced }: { count: number; reduced: boolean }) {
  const tex = useMemo(() => makeSteamTexture(), []);
  const items = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 1.5,
        z: -0.7 - Math.random() * 0.6,
        phase: Math.random(),
        speed: 0.4 + Math.random() * 0.3,
        size: 0.8 + Math.random() * 0.7,
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
      mesh.position.y = -0.7 + k * 2.2;
      mesh.position.x = p.x + Math.sin((t + i * 1.7) * 0.8) * 0.16;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.sin(k * Math.PI) * 0.2;
      const s = p.size * (0.6 + k * 1.5);
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
          position={[p.x, -0.7, p.z]}
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
      positions[i * 3 + 1] = Math.random() * 4.2 - 1.9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2.4 - 0.2;
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
        size={0.075}
        sizeAttenuation
        transparent
        opacity={0.75}
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
    setLowPower(window.matchMedia('(max-width: 940px)').matches);
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  /* Narrow screens stack the copy over the crest: the crest keeps to the
     band under the buttons (see .hero padding in home.module.css). */
  const shift = lowPower ? 0 : 1.15;
  const y = lowPower ? -1.26 : -0.16;
  const scl = lowPower ? 0.4 : 0.92;
  const yaw = lowPower ? 0.08 : 0.19;
  const [holder, inView] = useInView<HTMLDivElement>();

  return (
    <div ref={holder} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        dpr={[1, lowPower ? 1.5 : 1.75]}
        camera={{ position: [0, 0.1, 6.9], fov: 34 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        frameloop={reduced ? 'demand' : inView ? 'always' : 'never'}
        style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
      >
      <Suspense fallback={null}>
        <ambientLight intensity={0.42} color="#f7f1e6" />
        <spotLight position={[3.4, 5.2, 5.6]} angle={0.6} penumbra={1} intensity={170} color="#ffd9a0" decay={2} distance={32} />
        <directionalLight position={[-5, 2.5, -4]} intensity={0.65} color="#9fb6c0" />
        <pointLight position={[0, -0.4, -4.5]} intensity={5} color="#3a2a1c" distance={14} />

        <Rig shift={shift} y={y} scl={scl} yaw={yaw} pointer={pointer}>
          <Crest reduced={reduced} />
          <Steam count={lowPower ? 6 : 10} reduced={reduced} />
          <Embers count={lowPower ? 40 : 80} reduced={reduced} />
        </Rig>

        <Environment resolution={256} frames={1}>
          {/* A dark room is a bad room for metal: brass has no colour of its
              own, it only shows what it reflects. So the box gets a warm
              floor, a back wall and a heat lamp — enough room for the
              walls of the mark to pick up copper instead of black. */}
          <Lightformer intensity={2.6} color="#ffd9a0" position={[0, 5, 1]} scale={[12, 12, 1]} rotation-x={Math.PI / 2} />
          <Lightformer intensity={1.1} color="#8a6038" position={[0, -3.4, 1]} scale={[18, 18, 1]} />
          <Lightformer intensity={0.7} color="#6b4a2c" position={[0, 1, -6.5]} scale={[22, 13, 1]} />
          <Lightformer intensity={1.5} color="#e2603a" position={[6, 1.5, 2]} scale={[9, 9, 1]} rotation-y={-Math.PI / 2} />
          <Lightformer intensity={0.8} color="#7d93a0" position={[-6, 1, -1]} scale={[12, 6, 1]} rotation-y={Math.PI / 2} />
          {/* the bounce off the table in front: the crest leans back, so it
              needs something warm below and in front of it too */}
          <Lightformer intensity={1.7} color="#e8c49a" position={[0, -2.4, 4]} scale={[14, 3.5, 1]} />
          <Lightformer intensity={0.6} color="#f3e2c8" position={[0, 0.5, 6]} scale={[10, 4, 1]} />
        </Environment>
      </Suspense>
      </Canvas>
    </div>
  );
}
