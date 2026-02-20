import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function Hero3D() {
    const meshRef = useRef()

    useFrame((state) => {
        const t = state.clock?.elapsedTime || 0
        if (meshRef.current) {
            meshRef.current.rotation.x = Math.cos(t / 4) / 4
            meshRef.current.rotation.y = Math.sin(t / 4) / 4
            meshRef.current.rotation.z = Math.sin(t / 4) / 4
        }
    })

    return (
        <group>
            {/* Central Abstract Sphere */}
            <Sphere args={[1, 100, 100]} scale={1.5}>
                <MeshDistortMaterial
                    color="#06b6d4"
                    attach="material"
                    distort={0.4}
                    speed={4}
                    roughness={0.2}
                    metalness={0.8}
                />
            </Sphere>

            {/* Outer Floating Ring/Aura */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[2, 0.02, 16, 100]} />
                <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={1} />
            </mesh>

            {/* Decorative Particles */}
            {[...Array(50)].map((_, i) => (
                <mesh
                    key={i}
                    position={[
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                        (Math.random() - 0.5) * 10,
                    ]}
                >
                    <sphereGeometry args={[0.02, 8, 8]} />
                    <meshStandardMaterial
                        color={i % 2 === 0 ? "#06b6d4" : "#8b5cf6"}
                        emissive={i % 2 === 0 ? "#06b6d4" : "#8b5cf6"}
                        emissiveIntensity={0.5}
                    />
                </mesh>
            ))}
        </group>
    )
}
