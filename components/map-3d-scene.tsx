"use client"

import { useRef, useMemo, useState, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Html, OrbitControls } from "@react-three/drei"
import * as THREE from "three"

/* ------------------------------------------------------------------ */
/*  Hex-based terrain with click interaction                          */
/* ------------------------------------------------------------------ */

function createTerrainGeometry(res: number, size: number, heightScale: number, seed: number) {
  const g = new THREE.PlaneGeometry(size, size, res, res)
  const pos = g.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)
    const h =
      Math.sin(x * 0.5 + seed) * Math.cos(y * 0.4 + seed) * 0.4 +
      Math.sin(x * 1.2 + y * 0.8 + seed * 2) * 0.18 +
      Math.cos(x * 0.25 - y * 0.7 + seed) * 0.25 +
      Math.sin(x * 2.5 + seed * 3) * Math.cos(y * 2.0 + seed * 3) * 0.08
    pos.setZ(i, h * heightScale)
  }
  g.computeVertexNormals()
  return g
}

/* ------------------------------------------------------------------ */
/*  Clickable terrain layer                                           */
/* ------------------------------------------------------------------ */
function ClickableTerrainLayer({
  position,
  color,
  opacity,
  wireframe = false,
  scale = 1,
  seed = 0,
  onClick,
}: {
  position: [number, number, number]
  color: string
  opacity: number
  wireframe?: boolean
  scale?: number
  seed?: number
  onClick?: (point: THREE.Vector3) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const geo = useMemo(() => createTerrainGeometry(80, 8 * scale, scale, seed), [scale, seed])
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1 + seed) * 0.02
    }
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geo}
      position={position}
      rotation={[-Math.PI / 2.5, 0, 0.15]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        if (onClick) onClick(e.point)
      }}
    >
      <meshPhongMaterial
        color={color}
        transparent
        opacity={hovered && !wireframe ? Math.min(opacity + 0.1, 1) : opacity}
        wireframe={wireframe}
        side={THREE.DoubleSide}
        depthWrite={false}
        shininess={wireframe ? 0 : 60}
        specular={new THREE.Color(wireframe ? "#000000" : "#0d9488")}
      />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Click ripple effect                                               */
/* ------------------------------------------------------------------ */
function ClickRipple({ position, onComplete }: { position: THREE.Vector3; onComplete: () => void }) {
  const ringRef = useRef<THREE.Mesh>(null!)
  const startTime = useRef(Date.now())

  useFrame(() => {
    if (!ringRef.current) return
    const elapsed = (Date.now() - startTime.current) / 1000
    const progress = elapsed / 1.5
    if (progress >= 1) {
      onComplete()
      return
    }
    const s = 1 + progress * 4
    ringRef.current.scale.set(s, s, 1)
    const mat = ringRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = (1 - progress) * 0.6
  })

  return (
    <mesh ref={ringRef} position={[position.x, position.y + 0.05, position.z]} rotation={[-Math.PI / 2.5, 0, 0.15]}>
      <ringGeometry args={[0.05, 0.12, 32]} />
      <meshBasicMaterial color="#2dd4bf" transparent opacity={0.6} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Data pin with click info panel                                    */
/* ------------------------------------------------------------------ */
function DataPin({
  position,
  color,
  delay,
  label,
  description,
  value,
  isSelected,
  onSelect,
}: {
  position: [number, number, number]
  color: string
  delay: number
  label: string
  description: string
  value: string
  isSelected: boolean
  onSelect: () => void
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const beamRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() + delay
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.06
    }
    if (beamRef.current) {
      const t = clock.getElapsedTime() + delay
      const mat = beamRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.15 + Math.sin(t * 3) * 0.1
    }
  })

  const active = hovered || isSelected

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={() => { setHovered(true); document.body.style.cursor = "pointer" }}
      onPointerOut={() => { setHovered(false); document.body.style.cursor = "auto" }}
      onClick={(e) => { e.stopPropagation(); onSelect() }}
    >
      {/* Vertical beam */}
      <mesh ref={beamRef} position={[0, -0.35, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.7, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>

      {/* Pin core sphere */}
      <mesh>
        <sphereGeometry args={[active ? 0.1 : 0.07, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 1.2 : 0.5}
          roughness={0.2}
          metalness={0.3}
        />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.1, active ? 0.2 : 0.15, 32]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.5 : 0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Pulse rings */}
      <PulseRing color={color} delay={delay} />
      <PulseRing color={color} delay={delay + 1} />

      {/* Info panel on select */}
      {isSelected && (
        <Html center distanceFactor={6} style={{ pointerEvents: "none" }}>
          <div className="w-56 rounded-xl border border-[#0d9488]/30 bg-[#0c1a2e]/95 p-4 shadow-2xl shadow-[#0d9488]/10 backdrop-blur-md">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
              <span className="text-xs font-bold text-white">{label}</span>
            </div>
            <p className="mb-3 text-[10px] leading-relaxed text-[#94a3b8]">{description}</p>
            <div className="flex items-center justify-between rounded-lg bg-[#0d9488]/10 px-3 py-1.5">
              <span className="text-[9px] text-[#64748b] uppercase tracking-wider">Donnees</span>
              <span className="text-xs font-bold text-[#2dd4bf]">{value}</span>
            </div>
          </div>
        </Html>
      )}

      {/* Hover label */}
      {hovered && !isSelected && (
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div className="rounded-lg border border-[#0d9488]/20 bg-[#0c1a2e]/90 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-sm whitespace-nowrap">
            {label}
            <span className="ml-2 text-[10px] text-[#2dd4bf]">Cliquez</span>
          </div>
        </Html>
      )}
    </group>
  )
}

function PulseRing({ color, delay }: { color: string; delay: number }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (ringRef.current) {
      const t = ((clock.getElapsedTime() + delay) % 2.5) / 2.5
      const scale = 1 + t * 3
      ringRef.current.scale.set(scale, scale, 1)
      ;(ringRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - t) * 0.25
    }
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.06, 0.09, 32]} />
      <meshBasicMaterial color={color} transparent opacity={0.25} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated connection lines with flowing particles                  */
/* ------------------------------------------------------------------ */
function ConnectionLines({ connections }: { connections: { from: number[]; to: number[] }[] }) {
  const groupRef = useRef<THREE.Group>(null!)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Line) {
          const mat = child.material as THREE.LineBasicMaterial
          mat.opacity = 0.12 + Math.sin(clock.getElapsedTime() * 2 + i * 0.8) * 0.08
        }
      })
    }
  })

  return (
    <group ref={groupRef}>
      {connections.map((conn, i) => {
        const mid: [number, number, number] = [
          (conn.from[0] + conn.to[0]) / 2,
          Math.max(conn.from[1], conn.to[1]) + 0.6,
          (conn.from[2] + conn.to[2]) / 2,
        ]
        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(conn.from[0], conn.from[1], conn.from[2]),
          new THREE.Vector3(...mid),
          new THREE.Vector3(conn.to[0], conn.to[1], conn.to[2])
        )
        const points = curve.getPoints(40)
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        return (
          <line key={i} geometry={geometry}>
            <lineBasicMaterial color="#0d9488" transparent opacity={0.15} />
          </line>
        )
      })}

      {/* Flowing dots on connections */}
      {connections.map((conn, i) => (
        <FlowDot key={`dot-${i}`} from={conn.from} to={conn.to} delay={i * 0.6} />
      ))}
    </group>
  )
}

function FlowDot({ from, to, delay }: { from: number[]; to: number[]; delay: number }) {
  const dotRef = useRef<THREE.Mesh>(null!)
  const mid = useMemo(
    () => [
      (from[0] + to[0]) / 2,
      Math.max(from[1], to[1]) + 0.6,
      (from[2] + to[2]) / 2,
    ],
    [from, to]
  )
  const curve = useMemo(
    () =>
      new THREE.QuadraticBezierCurve3(
        new THREE.Vector3(from[0], from[1], from[2]),
        new THREE.Vector3(mid[0], mid[1], mid[2]),
        new THREE.Vector3(to[0], to[1], to[2])
      ),
    [from, to, mid]
  )

  useFrame(({ clock }) => {
    if (!dotRef.current) return
    const t = ((clock.getElapsedTime() * 0.3 + delay) % 1)
    const point = curve.getPoint(t)
    dotRef.current.position.copy(point)
    dotRef.current.scale.setScalar(0.8 + Math.sin(t * Math.PI) * 0.5)
  })

  return (
    <mesh ref={dotRef}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color="#2dd4bf" transparent opacity={0.8} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Floating particles                                                */
/* ------------------------------------------------------------------ */
function FloatingParticles({ count = 120 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null!)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const particles = useMemo(() =>
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 10,
      y: Math.random() * 4 + 0.5,
      z: (Math.random() - 0.5) * 8,
      speed: 0.15 + Math.random() * 0.4,
      offset: Math.random() * Math.PI * 2,
      size: 0.008 + Math.random() * 0.02,
    })),
    [count]
  )

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    particles.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + p.offset) * 0.4,
        p.y + Math.cos(t * p.speed * 0.6 + p.offset) * 0.5,
        p.z + Math.sin(t * p.speed * 0.4 + p.offset) * 0.3
      )
      dummy.scale.setScalar(p.size * (1 + Math.sin(t * 2.5 + p.offset) * 0.4))
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial color="#2dd4bf" transparent opacity={0.5} />
    </instancedMesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Animated grid floor                                               */
/* ------------------------------------------------------------------ */
function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null!)

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() * 0.08) % 0.5
    }
  })

  return (
    <gridHelper
      ref={gridRef}
      args={[24, 48, "#0d948825", "#0d948812"]}
      position={[0, -1, 0]}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Floating label badges                                             */
/* ------------------------------------------------------------------ */
function FloatingBadge({
  position,
  text,
  icon,
  floatSpeed = 1,
  floatIntensity = 0.4,
}: {
  position: [number, number, number]
  text: string
  icon: string
  floatSpeed?: number
  floatIntensity?: number
}) {
  return (
    <Float speed={floatSpeed} floatIntensity={floatIntensity} rotationIntensity={0.05}>
      <group position={position}>
        <Html center distanceFactor={10} style={{ pointerEvents: "none" }}>
          <div className="flex items-center gap-1.5 rounded-full border border-[#0d9488]/25 bg-[#0d9488]/8 px-3 py-1 text-[10px] font-semibold text-[#2dd4bf] backdrop-blur-md whitespace-nowrap shadow-lg shadow-[#0d9488]/5">
            <span>{icon}</span>
            {text}
          </div>
        </Html>
      </group>
    </Float>
  )
}

/* ------------------------------------------------------------------ */
/*  Atmosphere glow                                                    */
/* ------------------------------------------------------------------ */
function AtmosphereGlow() {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const mat = meshRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.03 + Math.sin(clock.getElapsedTime() * 0.5) * 0.015
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]} rotation={[-Math.PI / 2.5, 0, 0.15]}>
      <planeGeometry args={[12, 12]} />
      <meshBasicMaterial color="#0d9488" transparent opacity={0.04} side={THREE.DoubleSide} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Main 3D scene                                                     */
/* ------------------------------------------------------------------ */
function Scene({ onPinSelect, selectedPin }: { onPinSelect: (id: number | null) => void; selectedPin: number | null }) {
  const [ripples, setRipples] = useState<{ id: number; position: THREE.Vector3 }[]>([])
  const rippleIdRef = useRef(0)

  const handleTerrainClick = useCallback((point: THREE.Vector3) => {
    onPinSelect(null)
    const id = rippleIdRef.current++
    setRipples((prev) => [...prev, { id, position: point.clone() }])
  }, [onPinSelect])

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id))
  }, [])

  const dataPins = useMemo(() => [
    { position: [-1.4, 0.85, -0.2] as [number, number, number], color: "#0d9488", label: "Mairie de Lyon", description: "Collecte des donnees urbaines en temps reel depuis les capteurs municipaux.", value: "12,847" },
    { position: [0.6, 0.95, 0.9] as [number, number, number], color: "#e97624", label: "Donnees citoyennes", description: "Signalements et contributions des habitants via l'application mobile.", value: "3,291" },
    { position: [2.0, 0.75, -0.15] as [number, number, number], color: "#0d9488", label: "Station meteo", description: "Mesures meteorologiques: temperature, humidite, pression, vent.", value: "24/7" },
    { position: [-0.6, 1.05, 1.3] as [number, number, number], color: "#3b82f6", label: "Capteur IoT", description: "Reseau de capteurs connectes pour la qualite de l'air et le bruit.", value: "458" },
    { position: [1.2, 0.9, -0.9] as [number, number, number], color: "#e97624", label: "Signalements", description: "Points de signalement citoyens: voirie, proprete, eclairage.", value: "1,052" },
    { position: [-2.0, 0.8, 0.7] as [number, number, number], color: "#3b82f6", label: "API Transport", description: "Donnees de mobilite en temps reel: bus, velos, trottinettes.", value: "6 APIs" },
    { position: [0.1, 1.0, -1.1] as [number, number, number], color: "#0d9488", label: "OpenData", description: "Integration automatique des jeux de donnees ouverts gouvernementaux.", value: "89 jeux" },
  ], [])

  const connections = useMemo(() => [
    { from: dataPins[0].position, to: dataPins[1].position },
    { from: dataPins[1].position, to: dataPins[2].position },
    { from: dataPins[3].position, to: dataPins[4].position },
    { from: dataPins[0].position, to: dataPins[3].position },
    { from: dataPins[2].position, to: dataPins[4].position },
    { from: dataPins[5].position, to: dataPins[0].position },
    { from: dataPins[5].position, to: dataPins[3].position },
    { from: dataPins[6].position, to: dataPins[2].position },
    { from: dataPins[6].position, to: dataPins[4].position },
    { from: dataPins[1].position, to: dataPins[6].position },
  ], [dataPins])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={0.7} color="#ffffff" />
      <directionalLight position={[-4, 5, -3]} intensity={0.25} color="#0d9488" />
      <pointLight position={[0, 4, 0]} intensity={0.6} color="#0d9488" distance={12} />
      <pointLight position={[-3, 2, 2]} intensity={0.3} color="#3b82f6" distance={8} />
      <pointLight position={[3, 2, -2]} intensity={0.3} color="#e97624" distance={8} />

      {/* Terrain layers */}
      <ClickableTerrainLayer position={[0, -0.5, 0]} color="#0f2847" opacity={0.5} scale={1.15} seed={0} onClick={handleTerrainClick} />
      <ClickableTerrainLayer position={[0, -0.2, 0]} color="#0d9488" opacity={0.12} wireframe scale={1.08} seed={0.5} />
      <ClickableTerrainLayer position={[0, 0.1, 0]} color="#0d9488" opacity={0.35} seed={1} onClick={handleTerrainClick} />
      <ClickableTerrainLayer position={[0, 0.35, 0]} color="#2dd4bf" opacity={0.08} wireframe scale={0.98} seed={1.5} />
      <ClickableTerrainLayer position={[0, 0.55, 0]} color="#0d9488" opacity={0.06} wireframe scale={0.9} seed={2} />

      {/* Click ripples */}
      {ripples.map((r) => (
        <ClickRipple key={r.id} position={r.position} onComplete={() => removeRipple(r.id)} />
      ))}

      {/* Data pins */}
      {dataPins.map((pin, i) => (
        <DataPin
          key={i}
          position={pin.position}
          color={pin.color}
          delay={i * 0.5}
          label={pin.label}
          description={pin.description}
          value={pin.value}
          isSelected={selectedPin === i}
          onSelect={() => onPinSelect(selectedPin === i ? null : i)}
        />
      ))}

      {/* Connection lines with flowing dots */}
      <ConnectionLines connections={connections} />

      {/* Particles */}
      <FloatingParticles count={150} />

      {/* Grid */}
      <GridFloor />

      {/* Atmosphere */}
      <AtmosphereGlow />

      {/* Floating badges */}
      <FloatingBadge position={[-3.5, 2.8, -1]} text="API Ouverte" icon="/" floatSpeed={1.1} />
      <FloatingBadge position={[3.5, 2.5, 0.5]} text="Couches" icon="+" floatSpeed={0.9} />
      <FloatingBadge position={[-3, 1.8, 2.2]} text="Temps reel" icon="~" floatSpeed={1} />
      <FloatingBadge position={[3.2, 3.0, -1.8]} text="No-code" icon="*" floatSpeed={1.3} />
      <FloatingBadge position={[0, 3.2, -2]} text="Open Source" icon="#" floatSpeed={0.7} />

      {/* Orbit controls - subtle auto-rotate with user interaction */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.3}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
      />
    </>
  )
}

export function Map3DScene() {
  const [selectedPin, setSelectedPin] = useState<number | null>(null)

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 3.5, 7], fov: 42, near: 0.1, far: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ background: "transparent" }}
      >
        <Scene onPinSelect={setSelectedPin} selectedPin={selectedPin} />
      </Canvas>
    </div>
  )
}
