import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Stars, useScroll, ScrollControls } from '@react-three/drei'
import Hero3D from './Hero3D'
import { useRef } from 'react'

function SceneContent() {
    const scroll = useScroll()
    const groupRef = useRef()

    useFrame((state) => {
        if (groupRef.current && scroll) {
            // Rotate based on scroll progress
            const offset = scroll.offset
            groupRef.current.rotation.y = offset * Math.PI * 2
            groupRef.current.position.y = -offset * 5
            groupRef.current.scale.setScalar(1 - offset * 0.5)
        }
    })

    return (
        <group ref={groupRef}>
            <Hero3D />
        </group>
    )
}

export default function Scene() {
    return (
        <Canvas
            shadows={{ type: 1 }} // 1 is THREE.PCFShadowMap
            gl={{
                antialias: true,
                alpha: true,
                stencil: false,
                depth: true
            }}
            dpr={[1, 1.5]} // Capping dpr slightly for stability
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />

            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#818cf8" />
            <spotLight position={[0, 10, 0]} intensity={1.5} angle={0.3} penumbra={1} color="#22d3ee" />

            {/* Environment */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <Environment preset="city" />

            <ScrollControls pages={3} damping={0.2}>
                <SceneContent />
            </ScrollControls>
        </Canvas>
    )
}
