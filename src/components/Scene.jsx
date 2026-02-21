import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Stars, useScroll, ScrollControls, Float } from '@react-three/drei'
import Hero3D from './Hero3D'
import { useRef, Suspense } from 'react'
import * as THREE from 'three'

// Import 3D Service Elements
import Camera from './3d/Camera'
import Pen from './3d/Pen'
import Laptop from './3d/Laptop'
import TechModule from './3d/TechModule'

function SceneContent() {
    const scroll = useScroll()
    const groupRef = useRef()
    const heroRef = useRef()
    const servicesRef = useRef()

    useFrame((state) => {
        if (!scroll) return
        const offset = scroll.offset // 0 to 1

        // Global group movement/parallax
        if (groupRef.current) {
            groupRef.current.position.y = offset * 2
        }

        // Hero 3D handling
        if (heroRef.current) {
            // Move hero out of the way as we scroll to services
            heroRef.current.position.x = THREE.MathUtils.lerp(0, -10, Math.max(0, (offset - 0.2) * 4))
            heroRef.current.position.y = THREE.MathUtils.lerp(0, 5, Math.max(0, (offset - 0.2) * 4))
        }

        // Services elements handling (appearing around 0.3 - 0.7)
        if (servicesRef.current) {
            servicesRef.current.position.y = THREE.MathUtils.lerp(10, 0, Math.max(0, (offset - 0.25) * 5))
            servicesRef.current.rotation.y = offset * Math.PI
        }
    })

    return (
        <group ref={groupRef}>
            {/* Hero Section Element */}
            <group ref={heroRef}>
                <Hero3D />
            </group>

            {/* Services Section Elements */}
            <group ref={servicesRef} position={[0, 10, 0]}>
                <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <group position={[-3, 2, -2]}>
                        <Camera color="#06b6d4" />
                    </group>
                </Float>
                <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                    <group position={[3, 1, -3]}>
                        <Pen color="#8b5cf6" />
                    </group>
                </Float>
                <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.5}>
                    <group position={[-2, -2, -4]}>
                        <Laptop color="#06b6d4" />
                    </group>
                </Float>
                <Float speed={2.5} rotationIntensity={1} floatIntensity={1}>
                    <group position={[4, -3, -2]}>
                        <TechModule color="#8b5cf6" />
                    </group>
                </Float>
            </group>
        </group>
    )
}

export default function Scene() {
    return (
        <Canvas
            shadows={{ type: 1 }}
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            }}
            dpr={[1, 2]}
            style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
        >
            <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

            <Suspense fallback={null}>
                <ambientLight intensity={0.8} />
                <pointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
                <pointLight position={[-10, -10, 10]} intensity={1.5} color="#8b5cf6" />
                <spotLight position={[0, 5, 10]} angle={0.5} penumbra={1} intensity={2} castShadow />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Environment preset="night" />

                <ScrollControls pages={5} damping={0.3}>
                    <SceneContent />
                </ScrollControls>
            </Suspense>
        </Canvas>
    )
}
