import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function Laptop({ color = "#06b6d4" }) {
    const meshRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.5
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={meshRef}>
                {/* Base */}
                <mesh position={[0, -0.05, 0]}>
                    <boxGeometry args={[1.2, 0.05, 0.8]} />
                    <meshStandardMaterial color="#333" metalness={0.8} roughness={0.2} />
                </mesh>

                {/* Screen */}
                <group position={[0, 0, -0.4]} rotation={[-Math.PI / 10, 0, 0]}>
                    <mesh position={[0, 0.4, 0]}>
                        <boxGeometry args={[1.2, 0.8, 0.03]} />
                        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
                    </mesh>
                    {/* Glowing Content */}
                    <mesh position={[0, 0.4, 0.02]}>
                        <planeGeometry args={[1.1, 0.7]} />
                        <meshStandardMaterial
                            color={color}
                            emissive={color}
                            emissiveIntensity={1.5}
                            transparent
                            opacity={0.8}
                        />
                    </mesh>
                </group>

                {/* Keyboard area detail */}
                <mesh position={[0, -0.02, 0]}>
                    <boxGeometry args={[0.8, 0.01, 0.4]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
                </mesh>
            </group>
        </Float>
    )
}
