import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Box } from '@react-three/drei'
import * as THREE from 'three'

export default function TechModule({ color = "#8b5cf6" }) {
    const meshRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.rotation.x = t * 0.3
            meshRef.current.rotation.y = t * 0.2
        }
    })

    return (
        <Float speed={4} rotationIntensity={1} floatIntensity={1}>
            <group ref={meshRef}>
                {/* Main Chip */}
                <Box args={[0.6, 0.6, 0.1]}>
                    <meshStandardMaterial color="#111" metalness={0.9} roughness={0.1} />
                </Box>

                {/* Pins */}
                {[...Array(8)].map((_, i) => (
                    <group key={i} rotation={[0, 0, (i / 8) * Math.PI * 2]}>
                        <mesh position={[0.4, 0, 0]}>
                            <boxGeometry args={[0.2, 0.05, 0.02]} />
                            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
                        </mesh>
                    </group>
                ))}

                {/* Core Glow */}
                <mesh position={[0, 0, 0.06]}>
                    <boxGeometry args={[0.3, 0.3, 0.02]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                </mesh>

                {/* Orbiting Ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.8, 0.01, 16, 64]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.3} />
                </mesh>
            </group>
        </Float>
    )
}
