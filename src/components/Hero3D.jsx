import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, MeshWobbleMaterial, Float, Icosahedron, Octahedron, Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { useScroll } from '@react-three/drei'

export default function Hero3D() {
    const meshRef = useRef()
    const wireframeRef = useRef()
    const scroll = useScroll()

    useFrame((state) => {
        const t = state.clock?.elapsedTime || 0
        const offset = scroll.offset // 0 to 1

        if (meshRef.current) {
            // Adjust scale for mobile
            const isMobile = state.viewport.width < 5
            const baseScale = isMobile ? 1 : 1.5
            const maxScale = isMobile ? 1.5 : 2

            // Smoothly rotate the group
            meshRef.current.rotation.x = Math.cos(t / 4) / 4
            meshRef.current.rotation.y = Math.sin(t / 4) / 4 + (offset * Math.PI * 2)

            // Phase transitions
            if (offset < 0.3) {
                // Phase 0: Idea (Distorted Sphere)
                meshRef.current.scale.lerp(new THREE.Vector3(baseScale, baseScale, baseScale), 0.1)
            } else if (offset < 0.6) {
                // Phase 1: Design (Scale up slightly)
                meshRef.current.scale.lerp(new THREE.Vector3(baseScale * 1.2, baseScale * 1.2, baseScale * 1.2), 0.1)
            } else {
                // Phase 2: Product (Solid form)
                meshRef.current.scale.lerp(new THREE.Vector3(maxScale, maxScale, maxScale), 0.1)
            }
        }

        if (wireframeRef.current) {
            wireframeRef.current.rotation.y = -t / 2
            wireframeRef.current.rotation.z = t / 3
        }
    })

    return (
        <group ref={meshRef}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                {/* Stage 1: The Idea (Pulsing Sphere) */}
                <group visible={scroll.offset < 0.4}>
                    <Sphere args={[1, 64, 64]}>
                        <MeshDistortMaterial
                            color="#06b6d4"
                            distort={0.4}
                            speed={4}
                            roughness={0.2}
                            metalness={0.8}
                            transparent
                            opacity={1 - Math.max(0, (scroll.offset - 0.2) * 5)}
                        />
                    </Sphere>
                </group>

                {/* Stage 2: The Design (Wireframe Octahedron) */}
                <group visible={scroll.offset > 0.2 && scroll.offset < 0.8}>
                    <Octahedron args={[1, 2]} ref={wireframeRef}>
                        <meshStandardMaterial
                            color="#8b5cf6"
                            wireframe
                            transparent
                            opacity={scroll.offset < 0.5 ? (scroll.offset - 0.2) * 3.3 : 1 - (scroll.offset - 0.6) * 5}
                            emissive="#8b5cf6"
                            emissiveIntensity={2}
                        />
                    </Octahedron>
                </group>

                {/* Stage 3: The Product (Polished Icosahedron) */}
                <group visible={scroll.offset > 0.6}>
                    <Icosahedron args={[1, 15]}>
                        <MeshWobbleMaterial
                            color="#22d3ee"
                            factor={0.2}
                            speed={2}
                            roughness={0}
                            metalness={1}
                            transparent
                            opacity={Math.max(0, (scroll.offset - 0.6) * 2.5)}
                        />
                    </Icosahedron>
                </group>
            </Float>

            {/* Decorative Particles */}
            {[...Array(30)].map((_, i) => (
                <Particle key={i} index={i} />
            ))}
        </group>
    )
}

function Particle({ index }) {
    const ref = useRef()
    const scroll = useScroll()
    const pos = useMemo(() => [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 12,
    ], [])

    useFrame((state) => {
        const t = state.clock.elapsedTime + index
        if (ref.current) {
            ref.current.position.y = pos[1] + Math.sin(t) * 0.5
            ref.current.rotation.x = t
            ref.current.rotation.z = t / 2

            // Particles converge as we scroll
            const offset = scroll.offset
            ref.current.position.x = THREE.MathUtils.lerp(pos[0], pos[0] * 0.2, offset)
            ref.current.position.z = THREE.MathUtils.lerp(pos[2], pos[2] * 0.2, offset)
        }
    })

    return (
        <mesh ref={ref} position={pos}>
            <boxGeometry args={[0.05, 0.05, 0.05]} />
            <meshStandardMaterial
                color={index % 2 === 0 ? "#06b6d4" : "#8b5cf6"}
                emissive={index % 2 === 0 ? "#06b6d4" : "#8b5cf6"}
                emissiveIntensity={1}
            />
        </mesh>
    )
}
