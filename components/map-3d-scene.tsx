"use client"

import { useRef, useMemo, useState, useCallback } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Html, OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import { Layers, Database, Lock, Map, Clock, Cpu, Palette } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Hex-based terrain representing a 3D map                           */
/* ------------------------------------------------------------------ */

function createMapGeometry(res: number, size: number, heightScale: number, seed: number) {
  const g = new THREE.PlaneGeometry(size, size, res, res)
  const pos = g.attributes.position

  // Create terrain that looks like a map with elevation
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const y = pos.getY(i)

    // Create map-like terrain with valleys and hills
    const h =
        Math.sin(x * 0.4 + seed) * Math.cos(y * 0.3 + seed) * 0.5 +
        Math.sin(x * 1.0 + y * 0.6 + seed * 2) * 0.25 +
        Math.cos(x * 0.3 - y * 0.5 + seed) * 0.3 +
        Math.sin(x * 2.2 + seed * 3) * Math.cos(y * 1.8 + seed * 3) * 0.12

    pos.setZ(i, h * heightScale)
  }
  g.computeVertexNormals()
  return g
}

/* ------------------------------------------------------------------ */
/*  Clickable terrain layer                                           */
/* ------------------------------------------------------------------ */
function MapTerrainLayer({
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
  const geo = useMemo(() => createMapGeometry(100, 10 * scale, scale * 0.8, seed), [scale, seed])
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Subtle rotation animation
      meshRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.08 + seed) * 0.015
    }
  })

  return (
      <mesh
          ref={meshRef}
          geometry={geo}
          position={position}
          rotation={[-Math.PI / 2.3, 0, 0.1]}
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
            opacity={hovered && !wireframe ? Math.min(opacity + 0.08, 1) : opacity}
            wireframe={wireframe}
            side={THREE.DoubleSide}
            depthWrite={!wireframe}
            shininess={wireframe ? 0 : 80}
            specular={new THREE.Color(wireframe ? "#000000" : "#0d9488")}
        />
      </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Feature Pin - Interactive point with icon                         */
/* ------------------------------------------------------------------ */
function FeaturePin({
                      position,
                      color,
                      delay,
                      icon: IconComponent,
                      label,
                      description,
                      isSelected,
                      onSelect,
                    }: {
  position: [number, number, number]
  color: string
  delay: number
  icon: React.ElementType
  label: string
  description: string
  isSelected: boolean
  onSelect: () => void
}) {
  const groupRef = useRef<THREE.Group>(null!)
  const [hovered, setHovered] = useState(false)
  const beamRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime() + delay
      groupRef.current.position.y = position[1] + Math.sin(t * 1.5) * 0.08
    }
    if (beamRef.current) {
      const t = clock.getElapsedTime() + delay
      const mat = beamRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = 0.2 + Math.sin(t * 2.5) * 0.12
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
        {/* Vertical beam from ground to pin */}
        <mesh ref={beamRef} position={[0, -0.4, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.25} />
        </mesh>

        {/* Base circle on terrain */}
        <mesh position={[0, -0.79, 0]} rotation={[-Math.PI / 2.3, 0, 0.1]}>
          <circleGeometry args={[active ? 0.18 : 0.15, 32]} />
          <meshBasicMaterial color={color} transparent opacity={active ? 0.4 : 0.25} />
        </mesh>

        {/* Main pin sphere with icon */}
        <mesh>
          <sphereGeometry args={[active ? 0.13 : 0.1, 24, 24]} />
          <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={active ? 1.5 : 0.7}
              roughness={0.3}
              metalness={0.4}
          />
        </mesh>

        {/* Icon overlay */}
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div
              className="flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: active ? "32px" : "24px",
                height: active ? "32px" : "24px",
                backgroundColor: "transparent"
              }}
          >
            <IconComponent
                size={active ? 18 : 14}
                color="white"
                strokeWidth={2.5}
            />
          </div>
        </Html>

        {/* Outer glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.12, active ? 0.24 : 0.18, 32]} />
          <meshBasicMaterial color={color} transparent opacity={active ? 0.6 : 0.3} side={THREE.DoubleSide} />
        </mesh>

        {/* Pulse rings */}
        <PulseRing color={color} delay={delay} radius={0.15} />
        <PulseRing color={color} delay={delay + 1.2} radius={0.18} />

        {/* Info panel when selected */}
        {isSelected && (
            <Html
                center
                distanceFactor={6}
                style={{ pointerEvents: "none" }}
                position={[0, 0.5, 0]}
            >
              <div className="w-72 rounded-2xl border-2 border-white/10 bg-gradient-to-br from-[#0c1a2e]/98 to-[#060e1b]/98 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl">
                <div className="mb-3 flex items-center gap-3">
                  <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `${color}20`,
                        boxShadow: `0 0 20px ${color}40`
                      }}
                  >
                    <IconComponent size={20} color={color} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-bold text-white">{label}</span>
                </div>
                <p className="text-xs leading-relaxed text-[#94a3b8]">{description}</p>
                <div className="mt-4 flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-[#2dd4bf] animate-pulse" />
                  <span className="text-[10px] text-[#2dd4bf] uppercase tracking-wider font-semibold">Fonctionnalité active</span>
                </div>
              </div>
            </Html>
        )}
      </group>
  )
}

/* ------------------------------------------------------------------ */
/*  Pulse ring animation                                              */
/* ------------------------------------------------------------------ */
function PulseRing({ color, delay, radius = 0.15 }: { color: string; delay: number; radius?: number }) {
  const ringRef = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = (clock.getElapsedTime() + delay) % 2.5
    const progress = t / 2.5
    const s = 1 + progress * 2.5
    ringRef.current.scale.set(s, s, 1)
    const mat = ringRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = (1 - progress) * 0.5
  })

  return (
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius, radius + 0.02, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Connection lines between features                                 */
/* ------------------------------------------------------------------ */
function ConnectionLines({ connections }: { connections: { from: [number, number, number]; to: [number, number, number] }[] }) {
  return (
      <>
        {connections.map((conn, i) => (
            <ConnectionLine key={i} from={conn.from} to={conn.to} delay={i * 0.3} />
        ))}
      </>
  )
}

function ConnectionLine({ from, to, delay }: { from: [number, number, number]; to: [number, number, number]; delay: number }) {
  const lineRef = useRef<THREE.Line>(null!)

  const points = useMemo(() => {
    const start = new THREE.Vector3(...from)
    const end = new THREE.Vector3(...to)
    const mid = new THREE.Vector3().lerpVectors(start, end, 0.5)
    mid.y += 0.3

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end)
    return curve.getPoints(30)
  }, [from, to])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(points)
    return geo
  }, [points])

  useFrame(({ clock }) => {
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.LineBasicMaterial
      mat.opacity = 0.15 + Math.sin(clock.getElapsedTime() * 1.5 + delay) * 0.1
    }
  })

  return (
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial color="#0d9488" transparent opacity={0.2} linewidth={1} />
      </line>
  )
}

/* ------------------------------------------------------------------ */
/*  Floating particles in the scene                                   */
/* ------------------------------------------------------------------ */
function FloatingParticles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const velocities = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 14
      positions[i3 + 1] = Math.random() * 6
      positions[i3 + 2] = (Math.random() - 0.5) * 14

      velocities[i3] = (Math.random() - 0.5) * 0.02
      velocities[i3 + 1] = Math.random() * 0.01
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.02
    }

    return { positions, velocities }
  }, [count])

  useFrame(() => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] += particles.velocities[i3]
      positions[i3 + 1] += particles.velocities[i3 + 1]
      positions[i3 + 2] += particles.velocities[i3 + 2]

      if (positions[i3 + 1] > 6) positions[i3 + 1] = 0
      if (Math.abs(positions[i3]) > 7) positions[i3] = (Math.random() - 0.5) * 14
      if (Math.abs(positions[i3 + 2]) > 7) positions[i3 + 2] = (Math.random() - 0.5) * 14
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
              attach="attributes-position"
              count={count}
              array={particles.positions}
              itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
            size={0.03}
            color="#2dd4bf"
            transparent
            opacity={0.6}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
        />
      </points>
  )
}

/* ------------------------------------------------------------------ */
/*  Grid floor                                                        */
/* ------------------------------------------------------------------ */
function GridFloor() {
  const gridRef = useRef<THREE.GridHelper>(null!)

  useFrame(({ clock }) => {
    if (gridRef.current) {
      const mat = gridRef.current.material as THREE.Material
      if (Array.isArray(mat)) {
        mat.forEach(m => {
          if ('opacity' in m) {
            m.opacity = 0.08 + Math.sin(clock.getElapsedTime() * 0.5) * 0.03
          }
        })
      }
    }
  })

  return (
      <gridHelper
          ref={gridRef}
          args={[12, 24, "#0d9488", "#0d9488"]}
          position={[0, -0.8, 0]}
          rotation={[0, 0, 0.1]}
      />
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
    const progress = elapsed / 1.2
    if (progress >= 1) {
      onComplete()
      return
    }
    const s = 1 + progress * 5
    ringRef.current.scale.set(s, s, 1)
    const mat = ringRef.current.material as THREE.MeshBasicMaterial
    mat.opacity = (1 - progress) * 0.7
  })

  return (
      <mesh ref={ringRef} position={[position.x, position.y + 0.05, position.z]} rotation={[-Math.PI / 2.3, 0, 0.1]}>
        <ringGeometry args={[0.08, 0.15, 32]} />
        <meshBasicMaterial color="#2dd4bf" transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Floating feature badges                                           */
/* ------------------------------------------------------------------ */
function FloatingBadge({
                         position,
                         text,
                         icon: IconComponent,
                         floatSpeed = 1,
                         floatIntensity = 0.4,
                       }: {
  position: [number, number, number]
  text: string
  icon: React.ElementType
  floatSpeed?: number
  floatIntensity?: number
}) {
  return (
      <Float speed={floatSpeed} floatIntensity={floatIntensity} rotationIntensity={0.08}>
        <group position={position}>
          <Html center distanceFactor={10} style={{ pointerEvents: "none" }}>
            <div className="flex items-center gap-2 rounded-full border border-[#0d9488]/30 bg-gradient-to-r from-[#0d9488]/15 to-[#0d9488]/10 px-4 py-2 text-xs font-bold text-[#2dd4bf] backdrop-blur-md whitespace-nowrap shadow-lg shadow-[#0d9488]/10">
              <IconComponent size={14} strokeWidth={2.5} />
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
      mat.opacity = 0.04 + Math.sin(clock.getElapsedTime() * 0.4) * 0.02
    }
  })

  return (
      <mesh ref={meshRef} position={[0, 0.5, 0]} rotation={[-Math.PI / 2.3, 0, 0.1]}>
        <planeGeometry args={[14, 14]} />
        <meshBasicMaterial color="#0d9488" transparent opacity={0.05} side={THREE.DoubleSide} />
      </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Main 3D scene                                                     */
/* ------------------------------------------------------------------ */
type FeatureData = {
  icon: React.ElementType
  label: string
  description: string
  color: string
  position: [number, number, number]
}

function Scene({
                 onFeatureSelect,
                 selectedFeature
               }: {
  onFeatureSelect: (id: number | null) => void
  selectedFeature: number | null
}) {
  const [ripples, setRipples] = useState<{ id: number; position: THREE.Vector3 }[]>([])
  const rippleIdRef = useRef(0)

  const handleTerrainClick = useCallback((point: THREE.Vector3) => {
    onFeatureSelect(null)
    const id = rippleIdRef.current++
    setRipples((prev) => [...prev, { id, position: point.clone() }])
  }, [onFeatureSelect])

  const removeRipple = useCallback((id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id))
  }, [])

  // Feature pins with specific icons and descriptions
  const features: FeatureData[] = useMemo(() => [
    {
      icon: Layers,
      label: "Multi-couches",
      description: "Gérez facilement plusieurs couches de données simultanément. Superposez vos informations pour une analyse spatiale complète.",
      color: "#0d9488",
      position: [-2.2, 0.95, -0.5]
    },
    {
      icon: Lock,
      label: "Open-Source",
      description: "Code source entièrement ouvert et disponible. Contribuez, personnalisez et adaptez l'application à vos besoins.",
      color: "#3b82f6",
      position: [2.0, 1.0, 0.8]
    },
    {
      icon: Database,
      label: "API Intégrées",
      description: "Connectez vos données via des API en entrée et en sortie. Intégration facile avec vos systèmes existants.",
      color: "#e97624",
      position: [-0.3, 1.1, 1.5]
    },
    {
      icon: Map,
      label: "Fonds de carte",
      description: "Changez de fond de carte selon vos préférences. OSM, satellite, topographique... le choix vous appartient.",
      color: "#0d9488",
      position: [1.8, 0.85, -1.2]
    },
    {
      icon: Clock,
      label: "Temps réel",
      description: "Affichez et actualisez vos données en temps réel. Synchronisation instantanée pour un suivi dynamique.",
      color: "#3b82f6",
      position: [-1.5, 1.05, 1.0]
    },
    {
      icon: Cpu,
      label: "Processeur de données",
      description: "Modifiez et transformez vos tables de données facilement. Outils intuitifs pour le traitement spatial.",
      color: "#e97624",
      position: [0.5, 0.9, -1.5]
    },
    {
      icon: Palette,
      label: "Personnalisable",
      description: "Adaptez l'interface à votre charte graphique. Logo, couleurs, thème... faites-en votre outil.",
      color: "#0d9488",
      position: [-2.5, 0.8, 0.9]
    },
  ], [])

  // Connections between features
  const connections = useMemo(() => [
    { from: features[0].position, to: features[2].position },
    { from: features[2].position, to: features[1].position },
    { from: features[1].position, to: features[3].position },
    { from: features[4].position, to: features[0].position },
    { from: features[4].position, to: features[2].position },
    { from: features[5].position, to: features[3].position },
    { from: features[6].position, to: features[0].position },
    { from: features[6].position, to: features[4].position },
    { from: features[5].position, to: features[1].position },
  ], [features])

  return (
      <>
        {/* Enhanced lighting for map visualization */}
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 12, 6]} intensity={0.8} color="#ffffff" />
        <directionalLight position={[-5, 6, -4]} intensity={0.3} color="#0d9488" />
        <pointLight position={[0, 5, 0]} intensity={0.7} color="#0d9488" distance={14} />
        <pointLight position={[-4, 3, 3]} intensity={0.35} color="#3b82f6" distance={10} />
        <pointLight position={[4, 3, -3]} intensity={0.35} color="#e97624" distance={10} />

        {/* Map terrain layers */}
        <MapTerrainLayer position={[0, -0.6, 0]} color="#0f2847" opacity={0.6} scale={1.2} seed={0} onClick={handleTerrainClick} />
        <MapTerrainLayer position={[0, -0.25, 0]} color="#0d9488" opacity={0.15} wireframe scale={1.12} seed={0.5} />
        <MapTerrainLayer position={[0, 0.05, 0]} color="#0d9488" opacity={0.4} seed={1} onClick={handleTerrainClick} />
        <MapTerrainLayer position={[0, 0.3, 0]} color="#2dd4bf" opacity={0.1} wireframe scale={1.0} seed={1.5} />
        <MapTerrainLayer position={[0, 0.5, 0]} color="#0d9488" opacity={0.08} wireframe scale={0.92} seed={2} />

        {/* Click ripples */}
        {ripples.map((r) => (
            <ClickRipple key={r.id} position={r.position} onComplete={() => removeRipple(r.id)} />
        ))}

        {/* Feature pins */}
        {features.map((feature, i) => (
            <FeaturePin
                key={i}
                position={feature.position}
                color={feature.color}
                delay={i * 0.6}
                icon={feature.icon}
                label={feature.label}
                description={feature.description}
                isSelected={selectedFeature === i}
                onSelect={() => onFeatureSelect(selectedFeature === i ? null : i)}
            />
        ))}

        {/* Connection lines */}
        <ConnectionLines connections={connections} />

        {/* Floating particles */}
        <FloatingParticles count={180} />

        {/* Grid floor */}
        <GridFloor />

        {/* Atmosphere */}
        <AtmosphereGlow />

        {/* Floating feature badges */}
        <FloatingBadge position={[-4.0, 3.0, -1.2]} text="Données cartographiques" icon={Database} floatSpeed={1.0} />
        <FloatingBadge position={[4.2, 2.8, 0.8]} text="Simple et moderne" icon={Layers} floatSpeed={0.85} />
        <FloatingBadge position={[-3.5, 2.2, 2.5]} text="Open Source" icon={Cpu} floatSpeed={1.15} />
        <FloatingBadge position={[3.8, 3.3, -2.0]} text="Évolutif" icon={Clock} floatSpeed={1.25} />
        <FloatingBadge position={[0.2, 3.5, -2.3]} text="Sécurisé" icon={Lock} floatSpeed={0.7} />

        {/* Orbit controls */}
        <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={5}
            maxDistance={12}
            autoRotate
            autoRotateSpeed={0.4}
            maxPolarAngle={Math.PI / 2.1}
            minPolarAngle={Math.PI / 4.5}
        />
      </>
  )
}

export function Map3DScene() {
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null)

  return (
      <div className="absolute inset-0 z-0">
        <Canvas
            camera={{ position: [0, 4, 8], fov: 45, near: 0.1, far: 60 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            style={{ background: "transparent" }}
        >
          <Scene onFeatureSelect={setSelectedFeature} selectedFeature={selectedFeature} />
        </Canvas>
      </div>
  )
}