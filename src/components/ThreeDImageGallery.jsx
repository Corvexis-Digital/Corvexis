import { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Image as R3FImage, Text, Float, Environment, ContactShadows, useScroll as useR3FScroll, ScrollControls } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useScroll, useTransform } from 'framer-motion'

function ProjectCard({ project, index, total, radius }) {
    const mesh = useRef()
    const [hovered, setHovered] = useState(false)

    // Calculate position on the cylinder - placed on the INNER surface
    // To be "inside", we face the center
    const theta = (index / total) * Math.PI * 2
    const x = Math.sin(theta) * radius
    const z = Math.cos(theta) * radius

    useFrame((state) => {
        if (!mesh.current) return
        const time = state.clock.getElapsedTime()
        mesh.current.position.y = Math.sin(time + index) * 0.05
        mesh.current.scale.lerp(new THREE.Vector3(hovered ? 1.05 : 1, hovered ? 1.05 : 1, 1), 0.1)
    })

    return (
        <group position={[x, 0, z]} rotation={[0, theta + Math.PI, 0]}>
            <mesh
                ref={mesh}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <planeGeometry args={[4, 2.5]} />
                <meshBasicMaterial transparent opacity={0} />

                <R3FImage
                    url={project.image}
                    scale={[3.8, 2.3]}
                    side={THREE.DoubleSide}
                    transparent
                    opacity={hovered ? 1 : 0.8}
                />

                <Text
                    position={[0, -1.6, 0.1]}
                    fontSize={0.25}
                    color={hovered ? "#06b6d4" : "white"}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.02}
                    outlineColor="#000"
                >
                    {project.title}
                </Text>
            </mesh>
        </group>
    )
}

function TubeScene({ projects }) {
    const group = useRef()
    const { scrollYProgress } = useScroll()

    // Smooth rotation based on page scroll
    const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 6])

    useFrame((state) => {
        if (group.current) {
            // Combine scroll rotation with slow auto-spin
            group.current.rotation.y = rotationY.get() + state.clock.getElapsedTime() * 0.1
        }
    })

    return (
        <group ref={group}>
            {projects.map((project, i) => (
                <ProjectCard
                    key={i}
                    project={project}
                    index={i}
                    total={projects.length}
                    radius={7}
                />
            ))}

            {/* The Tube Shell - Semitransparent Architectural Frame */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[7.2, 7.2, 15, 64, 1, true]} />
                <meshStandardMaterial
                    color="#06b6d4"
                    transparent
                    opacity={0.05}
                    side={THREE.DoubleSide}
                    wireframe
                />
            </mesh>

            {/* Glowing Rings */}
            {[-4, 0, 4].map((y, i) => (
                <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[7.2, 0.02, 16, 100]} />
                    <meshBasicMaterial color="#8b5cf6" transparent opacity={0.3} />
                </mesh>
            ))}
        </group>
    )
}

export default function ThreeDImageGallery({ projects }) {
    return (
        <div style={{
            height: '700px',
            width: '100%',
            position: 'relative',
            margin: '6rem 0',
            borderRadius: '40px',
            overflow: 'hidden',
            background: 'rgba(0,0,0,0.2)',
            boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)',
            border: '1px solid var(--glass-border)'
        }}>
            <Canvas
                gl={{ antialias: true, alpha: true }}
                dpr={[1, 2]}
            >
                {/* Position camera inside/at edge of tube looking through */}
                <PerspectiveCamera makeDefault position={[0, 0, 0.1]} fov={75} />

                <Suspense fallback={null}>
                    <ambientLight intensity={1} />
                    <pointLight position={[0, 0, 0]} intensity={2} color="#06b6d4" />

                    <TubeScene projects={projects} />

                    <Environment preset="city" />
                </Suspense>
            </Canvas>

            {/* HUD Overlay */}
            <div style={{
                position: 'absolute',
                top: '2rem',
                left: '2rem',
                padding: '1rem',
                borderLeft: '2px solid var(--neon-cyan)',
                background: 'rgba(0,0,0,0.3)',
                backdropFilter: 'blur(5px)'
            }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--neon-cyan)', display: 'block', marginBottom: '0.5rem' }}>SYSTEM STATUS</span>
                <span style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold', letterSpacing: '2px' }}>CORE PORTFOLIO PIPELINE</span>
            </div>

            <div style={{
                position: 'absolute',
                bottom: '2rem',
                right: '2rem',
                textAlign: 'right'
            }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                    Scrolling through the digital core...
                </p>
            </div>
        </div>
    )
}
