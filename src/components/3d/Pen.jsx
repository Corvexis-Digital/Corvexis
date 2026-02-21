import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function Pen({ color = "#8b5cf6" }) {
    const meshRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (meshRef.current) {
            meshRef.current.rotation.z = Math.sin(t) * 0.1
        }
    })

    return (
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <group ref={meshRef} rotation={[0, 0, Math.PI / 4]}>
                {/* Pen Body */}
                <mesh>
                    <cylinderGeometry args={[0.05, 0.05, 1.5, 16]} />
                    <meshStandardMaterial color="#333" roughness={0.5} metalness={0.5} />
                </mesh>

                {/* Grip */}
                <mesh position={[0, -0.4, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.4, 16]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
                </mesh>

                {/* Tip */}
                <mesh position={[0, -0.75, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.05, 0.2, 16]} />
                    <meshStandardMaterial color="#111" />
                </mesh>

                {/* Glowing Ring */}
                <mesh position={[0, 0.5, 0]}>
                    <torusGeometry args={[0.07, 0.01, 8, 32]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
                </mesh>
            </group>
        </Float>
    )
}
