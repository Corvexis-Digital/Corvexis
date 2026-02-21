import { useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Image as R3FImage, Text, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { motion, useScroll, useTransform } from 'framer-motion'

// Get the correct base URL for assets (handles GitHub Pages /Corvexis/ prefix)
const BASE_URL = import.meta.env.BASE_URL

function resolveImage(path) {
    // path is like "/portfolio/project-studybuddy.png"
    // BASE_URL is "/" locally, "/Corvexis/" on GitHub Pages
    const clean = path.startsWith('/') ? path.slice(1) : path
    const base = BASE_URL.endsWith('/') ? BASE_URL : BASE_URL + '/'
    return base + clean
}

function ProjectCard({ project, index, total, radius }) {
    const mesh = useRef()
    const [hovered, setHovered] = useState(false)
    const [imgError, setImgError] = useState(false)

    const theta = (index / total) * Math.PI * 2
    const x = Math.sin(theta) * radius
    const z = Math.cos(theta) * radius

    const imageUrl = resolveImage(project.image)

    useFrame((state) => {
        if (!mesh.current) return
        const time = state.clock.getElapsedTime()
        mesh.current.position.y = Math.sin(time + index) * 0.05
        const s = hovered ? 1.05 : 1
        mesh.current.scale.lerp(new THREE.Vector3(s, s, 1), 0.1)
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

                {!imgError && (
                    <R3FImage
                        url={imageUrl}
                        scale={[3.8, 2.3]}
                        side={THREE.DoubleSide}
                        transparent
                        opacity={hovered ? 1 : 0.85}
                        onError={() => setImgError(true)}
                    />
                )}

                {/* Fallback: colored panel if image fails */}
                {imgError && (
                    <mesh>
                        <planeGeometry args={[3.8, 2.3]} />
                        <meshBasicMaterial color="#1e293b" transparent opacity={0.8} />
                    </mesh>
                )}

                <Text
                    position={[0, -1.5, 0.01]}
                    fontSize={0.22}
                    color={hovered ? '#06b6d4' : 'white'}
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.015}
                    outlineColor="#000"
                    maxWidth={3.5}
                >
                    {project.title}
                </Text>

                <Text
                    position={[0, -1.85, 0.01]}
                    fontSize={0.14}
                    color="rgba(255,255,255,0.6)"
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={3.5}
                >
                    {project.description}
                </Text>
            </mesh>
        </group>
    )
}

function TubeScene({ projects }) {
    const group = useRef()
    const { scrollYProgress } = useScroll()
    const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 6])

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y = rotationY.get() + state.clock.getElapsedTime() * 0.08
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

            {/* Tube Shell */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[7.2, 7.2, 15, 64, 1, true]} />
                <meshStandardMaterial
                    color="#06b6d4"
                    transparent
                    opacity={0.04}
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
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                dpr={[1, 1.5]}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0)
                }}
            >
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
                backdropFilter: 'blur(5px)',
                pointerEvents: 'none'
            }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--neon-cyan)', display: 'block', marginBottom: '0.5rem' }}>SYSTEM STATUS</span>
                <span style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold', letterSpacing: '2px' }}>CORE PORTFOLIO PIPELINE</span>
            </div>

            <div style={{
                position: 'absolute',
                bottom: '2rem',
                right: '2rem',
                textAlign: 'right',
                pointerEvents: 'none'
            }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                    Scrolling through the digital core...
                </p>
            </div>
        </div>
    )
}
