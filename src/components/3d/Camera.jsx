import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshWobbleMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function Camera({ color = "#06b6d4" }) {
    const meshRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.rotation.y = Math.sin(t / 2) * 0.2
        }
    })

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={meshRef}>
                {/* Main Body */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[1, 0.7, 0.5]} />
                    <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
                </mesh>

                {/* Lens */}
                <mesh position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
                    <meshStandardMaterial color="#333" roughness={0} metalness={1} />
                </mesh>

                {/* Lens Detail */}
                <mesh position={[0, 0, 0.5]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
                    <MeshWobbleMaterial color={color} factor={0.1} speed={1} />
                </mesh>

                {/* Top Dial */}
                <mesh position={[0.3, 0.35, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.1, 16]} />
                    <meshStandardMaterial color="#666" />
                </mesh>
            </group>
        </Float>
    )
}
