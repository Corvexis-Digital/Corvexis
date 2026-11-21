import { useRef, useState, useEffect, Suspense, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, useGLTF, Text, Environment, Lightformer, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import { useTheme } from '../context/ThemeContext'

// ─── All tool/platform badges ─────────────────────────────────────────────────
const badges = [
  { label: 'WordPress', color: '#21759B', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM3.5 12c0-1.232.253-2.405.7-3.472L7.942 19.4A8.517 8.517 0 013.5 12zm8.5 8.5a8.49 8.49 0 01-2.41-.347l2.56-7.433 2.624 7.19a.4.4 0 00.03.058A8.5 8.5 0 0112 20.5zm1.172-11.633l2.18 6.325.6-2.005c.26-.82.46-1.408.46-1.917 0-.736-.264-1.244-.49-1.643-.3-.49-.58-.906-.58-1.397 0-.547.415-1.056.998-1.056.026 0 .051.003.076.004A8.503 8.503 0 0120.5 12a8.47 8.47 0 01-1.252 4.47l-1.624-5.426c-.27-.847-.54-1.015-.54-1.015-.27 0-.54.68-.54.68zM12 3.5a8.5 8.5 0 015.84 2.3c-.018 0-.035-.002-.053-.002-.547 0-1.056.464-1.056 1.012 0 .49.283.904.583 1.394.226.4.49.907.49 1.643 0 .51-.184 1.098-.437 1.918l-.572 1.907-2.07-6.158c.344-.018.655-.056.655-.056.308-.036.273-.49-.036-.473 0 0-.924.072-1.52.072-.56 0-1.5-.072-1.5-.072-.31-.017-.344.455-.036.473 0 0 .298.038.614.056l.912 2.498-1.28 3.838-2.13-6.336c.344-.018.656-.056.656-.056.308-.036.272-.49-.037-.473 0 0-.923.072-1.52.072a10.7 10.7 0 01-.38-.007A8.498 8.498 0 0112 3.5zm-6.868 2.63a8.502 8.502 0 00-1.63 5.87l3.57-10.333A8.472 8.472 0 005.132 6.13z"/></svg> },
  { label: 'WooCommerce', color: '#96588A', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M22.332 0H1.668C.747 0 0 .747 0 1.668v13.336C0 15.925.747 16.5 1.668 16.5H8.25l-.9 3.75 4.65-3.75h10.332C23.253 16.5 24 15.925 24 15.004V1.668C24 .747 23.253 0 22.332 0z"/></svg> },
  { label: 'Figma', color: '#F24E1E', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4zm0-12H4C1.792 12 0 13.792 0 16s1.792 4 4 4h4V12zm0-4c-2.208 0-4-1.792-4-4s1.792-4 4-4h4v8H8zm8-8h-4v8h4c2.208 0 4-1.792 4-4s-1.792-4-4-4zm0 10c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4z"/></svg> },
  { label: 'Canva', color: '#00C4CC', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.4a9.6 9.6 0 110 19.2A9.6 9.6 0 0112 2.4zm-1.2 4.8a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6z"/></svg> },
  { label: 'Twilio', color: '#F22F46', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm3.429 15.429a1.714 1.714 0 110-3.429 1.714 1.714 0 010 3.429zm0-5.143a1.714 1.714 0 110-3.429 1.714 1.714 0 010 3.429zm-6.858 5.143a1.714 1.714 0 110-3.429 1.714 1.714 0 010 3.429zm0-5.143a1.714 1.714 0 110-3.429 1.714 1.714 0 010 3.429z"/></svg> },
  { label: 'Stripe', color: '#635BFF', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg> },
  { label: 'PayFast', color: '#00B4D8', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg> },
  { label: 'React', color: '#61DAFB', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 9.861a2.139 2.139 0 100 4.278 2.139 2.139 0 000-4.278zm-5.992 6.394l-.472-.12C2.018 15.246 0 13.737 0 11.996s2.018-3.25 5.536-4.139l.472-.119.133.468a23.53 23.53 0 001.363 3.578 23.526 23.526 0 00-1.363 3.578l-.133.467zm5.99 1.869l-.375.063-.375-.063c-1.939-.333-3.916-1.09-5.722-2.21a24.07 24.07 0 01-1.47-3.616 24.07 24.07 0 011.47-3.616c1.806-1.12 3.783-1.877 5.722-2.21l.375-.063.375.063c1.939.333 3.916 1.09 5.722 2.21a24.07 24.07 0 011.47 3.616 24.07 24.07 0 01-1.47 3.616c-1.806 1.12-3.783 1.877-5.722 2.21zm5.99-1.869l-.133-.467a23.526 23.526 0 00-1.363-3.578 23.53 23.53 0 001.363-3.578l.133-.468.472.119c3.518.889 5.536 2.398 5.536 4.139s-2.018 3.25-5.536 4.139l-.472.12z"/></svg> },
  { label: 'Firebase', color: '#FFCA28', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.838zM21.616 11.105L19.3 4.481a.421.421 0 00-.79.065l-2.516 6.96L21.616 11.105zM7.457 3.512L4.887 11.47l9.013 5.189zM2.088 17.502l1.937-1.17 9.863 5.68a.457.457 0 01-.16.831L7.11 23.985a.46.46 0 01-.524-.32z"/></svg> },
  { label: 'Supabase', color: '#3ECF8E', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M11.9 1.036c-.015-.986-1.26-1.41-1.874-.637L.764 12.05C.111 12.957.753 14.23 1.846 14.23h6.95l.11.636 1.14 8.098c.015.986 1.26 1.41 1.874.637l9.262-11.652c.653-.907.011-2.18-1.082-2.18h-6.95L11.9 1.036z"/></svg> },
  { label: 'Node.js', color: '#339933', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 1.85c-.27 0-.54.07-.78.2l-7.44 4.3c-.48.28-.78.8-.78 1.36v8.58c0 .56.3 1.08.78 1.36l1.95 1.12c.95.46 1.27.46 1.71.46 1.4 0 2.21-.85 2.21-2.33V8.44c0-.12-.1-.22-.22-.22H8.5c-.13 0-.23.1-.23.22v8.47c0 .66-.68 1.31-1.77.76L4.59 16.5a.26.26 0 01-.13-.22V7.71c0-.09.04-.17.13-.22l7.44-4.29c.08-.05.18-.05.26 0l7.44 4.29c.09.05.13.13.13.22v8.57c0 .09-.04.17-.13.22l-7.44 4.3c-.08.04-.18.04-.26 0L10.45 20c-.07-.04-.16-.05-.23-.01-.64.36-.76.41-1.36.58-.15.04-.37.1.08.33l1.9 1.12c.23.14.5.21.77.21s.54-.07.78-.21l7.44-4.3c.48-.28.78-.8.78-1.36V7.71c0-.56-.3-1.08-.78-1.36l-7.44-4.3c-.24-.13-.51-.2-.79-.2z"/></svg> },
  { label: 'Shopify', color: '#96BF48', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M15.337 23.979l7.831-1.684S20.753 7.519 20.737 7.391c-.017-.128-.128-.21-.225-.21-.099 0-1.812-.033-1.812-.033s-1.2-1.168-1.329-1.296v-.016L15.337 23.979zM13.5 5.896s-.577-.176-1.537-.176c-1.602 0-2.374.978-2.374 1.891 0 1.04.753 1.555 1.44 2.005.639.421 1.212.818 1.212 1.555 0 .77-.619 1.249-1.471 1.249a3.69 3.69 0 01-1.956-.561l-.353 1.084s.721.431 1.907.431c1.812 0 3.08-1.001 3.08-2.57 0-1.1-.769-1.717-1.44-2.153-.608-.398-1.153-.752-1.153-1.407 0-.578.449-1.009 1.185-1.009.544 0 1.025.161 1.025.161L13.5 5.896z"/></svg> },
  { label: 'Python', color: '#3776AB', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.959 3.403 5.959h2.03v-2.867s-.109-3.402 3.35-3.402h5.766s3.24.052 3.24-3.131V3.26S18.28 0 11.914 0zm-3.21 1.874a1.051 1.051 0 110 2.103 1.051 1.051 0 010-2.103zM12.021 24c6.094 0 5.715-2.656 5.715-2.656l-.008-2.752h-5.814v-.826h8.12S24 18.211 24 12.031c0-6.18-3.403-5.959-3.403-5.959h-2.03v2.867s.109 3.402-3.35 3.402H9.451s-3.24-.052-3.24 3.131v5.236S5.655 24 12.021 24zm3.21-1.874a1.051 1.051 0 110-2.103 1.051 1.051 0 010 2.103z"/></svg> },
  { label: 'Blender', color: '#E87D0D', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12.51 13.214c.355-.43.566-.977 1.044-.977.558 0 1.044.419 1.044.977s-3.887-2.853-9.108-6.724C4.117 4.251 3.44 4 2.785 4 1.245 4 0 5.266 0 6.838c0 .866.391 1.638 1.004 2.153l7.746 5.692c.015-.013.03-.025.044-.038.4-.354.95-.533 1.502-.503.46.025.877.198 1.21.472zm-.467 2.943c-.024.133-.037.272-.037.413 0 1.316 1.057 2.383 2.36 2.383s2.36-1.067 2.36-2.383-1.057-2.383-2.36-2.383a2.35 2.35 0 00-1.73.761 2.41 2.41 0 00-.593 1.209zm7.185-1.861c1.726-1.344 2.772-3.288 2.772-5.46 0-4.019-3.449-7.278-7.705-7.278-.83 0-1.628.13-2.376.37l5.758 4.247c1.07.788 1.701 2.012 1.701 3.316 0 1.142-.46 2.178-1.199 2.925-.114.117-.234.228-.358.333z"/></svg> },
  { label: 'Three.js', color: '#000000', bg: '#ffffff22', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M.38 0L6.52 24l17.1-10.42L.38 0zm5.32 3.78l9.73 5.9-5.86 3.57L5.7 3.78zm-.44 10.69l3.07-1.87 1.46 5.46-4.53-3.59zm5.28-3.22l5.84-3.56 1.33 4.98-5.84 3.56-1.33-4.98zm2.76 7.47l-1.52-5.69 5.84-3.56 1.52 5.69-5.84 3.56z"/></svg> },
  { label: 'Divi', color: '#8A2BE2', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 20.4A8.4 8.4 0 1112 3.6a8.4 8.4 0 010 16.8zm0-13.2a4.8 4.8 0 100 9.6 4.8 4.8 0 000-9.6z"/></svg> },
  { label: 'MQL5', color: '#FF6B00', icon: <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13"><path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v2H7V7zm0 4h10v2H7v-2zm0 4h7v2H7v-2z"/></svg> },
]

// ─── Realistic device materials + orientation ─────────────────────────────────
function useRealDevice(url, screenTint, dim = 1) {
    const gltf = useGLTF(url)
    return useMemo(() => {
        const model = gltf.scene.clone(true)
        const translucent = dim < 1
        model.traverse((o) => {
            if (!o.isMesh) return
            const n = (o.name || '').toLowerCase()
            o.castShadow = true
            o.receiveShadow = true
            if (n.includes('screen')) {
                o.material = new THREE.MeshPhysicalMaterial({
                    color: '#0a1622',
                    metalness: 0.0,
                    roughness: 0.07,
                    clearcoat: 1,
                    clearcoatRoughness: 0.05,
                    envMapIntensity: 1.4,
                    emissive: new THREE.Color(screenTint),
                    emissiveIntensity: 0.55,
                })
            } else if (n.includes('lens')) {
                o.material = new THREE.MeshPhysicalMaterial({
                    color: '#0a0d14', metalness: 0.6, roughness: 0.14, clearcoat: 1, envMapIntensity: 1.4,
                })
            } else if (n.includes('logo') || n.includes('glow')) {
                o.material = new THREE.MeshStandardMaterial({
                    color: '#22d3ee', emissive: new THREE.Color('#22d3ee'), emissiveIntensity: 2.4, roughness: 0.3,
                })
            } else if (n.includes('neck') || n.includes('base') || n.includes('button') || n.includes('stand')) {
                o.material = new THREE.MeshPhysicalMaterial({
                    color: '#c9d0d8', metalness: 0.45, roughness: 0.24, clearcoat: 0.3, envMapIntensity: 1.5,
                })
            } else if (n.includes('camera') || n.includes('module')) {
                o.material = new THREE.MeshPhysicalMaterial({
                    color: '#2a3038', metalness: 0.3, roughness: 0.45, clearcoat: 0.5, envMapIntensity: 1.2,
                })
            } else {
                // chassis: mostly diffuse so direct light actually reads on it
                o.material = new THREE.MeshPhysicalMaterial({
                    color: '#7b8592',
                    metalness: 0.28,
                    roughness: 0.32,
                    clearcoat: 0.6,
                    clearcoatRoughness: 0.25,
                    envMapIntensity: 1.3,
                })
            }
            if (translucent && o.material) {
                o.material.transparent = true
                o.material.opacity = dim
            }
        })
        return model
    }, [gltf.scene, screenTint, dim])
}

function DeviceModel({ url, position, scale = 1, phase = 0, screenTint = '#0a5b73', dim = 1, children }) {
    const model = useRealDevice(url, screenTint, dim)
    const ref = useRef()

    useFrame(({ clock }) => {
        if (!ref.current) return
        const t = clock.elapsedTime
        ref.current.rotation.y = Math.sin(t * 0.35 + phase) * 0.16
        ref.current.position.y = position[1] + Math.sin(t * 0.55 + phase) * 0.05
    })

    // scale the whole group so screen UI scales with the device body
    return (
        <group ref={ref} position={position} scale={scale}>
            <primitive object={model} rotation={[0, Math.PI, 0]} />
            {children}
        </group>
    )
}

// ─── Screen interfaces rendered in 3D ────────────────────────────────────────
function PulseBar({ x, y, w, h, delay, color = '#22d3ee', z = 0.095, opacity = 1 }) {
    const ref = useRef()
    useFrame(({ clock }) => {
        if (!ref.current) return
        const t = (clock.elapsedTime * 0.35 + delay) % 1
        ref.current.scale.x = 0.25 + Math.abs(Math.sin(t * Math.PI)) * 0.75
        ref.current.scale.y = 1
    })
    return (
        <mesh ref={ref} position={[x + w / 2, y, z]}>
            <planeGeometry args={[w, h]} />
            <meshBasicMaterial color={color} transparent opacity={0.9 * opacity} />
        </mesh>
    )
}

function MonitorUI({ opacity = 1 }) {
    const panel = (x, y, w, h, color, z = 0.092) => (
        <mesh key={`${x}-${y}-${w}-${h}`} position={[x, y, z]}>
            <planeGeometry args={[w, h]} />
            <meshBasicMaterial color={color} transparent opacity={0.95 * opacity} />
        </mesh>
    )

    return (
        <group>
            {/* screen base */}
            <mesh position={[0, 0.02, 0.088]}>
                <planeGeometry args={[2.06, 1.16]} />
                <meshBasicMaterial color="#050d14" transparent opacity={opacity} />
            </mesh>
            {/* top bar */}
            {panel(0, 0.545, 2.06, 0.07, '#0c2230')}
            {panel(-0.83, 0.545, 0.04, 0.07, '#22d3ee')}
            {/* sidebar */}
            {panel(-0.86, -0.02, 0.32, 1.04, '#0a1a24', 0.09)}
            {[-0.42, -0.28, -0.14, 0].map((y) =>
                panel(-0.86, y, 0.2, 0.03, y === -0.42 ? '#22d3ee' : '#1c3a48')
            )}
            {/* headline */}
            {panel(-0.2, 0.34, 0.9, 0.05, '#1e4a5c')}
            {panel(-0.38, 0.24, 0.55, 0.03, '#16323f')}
            {/* stat cards */}
            {panel(-0.46, 0.02, 0.44, 0.18, '#0d2431')}
            {panel(0.04, 0.02, 0.44, 0.18, '#0d2431')}
            {panel(0.54, 0.02, 0.44, 0.18, '#0d2431')}
            <PulseBar x={-0.6} y={0.02} w={0.16} h={0.07} delay={0} opacity={opacity} />
            <PulseBar x={-0.1} y={0.02} w={0.16} h={0.07} delay={0.3} color="#a855f7" opacity={opacity} />
            <PulseBar x={0.4} y={0.02} w={0.16} h={0.07} delay={0.6} opacity={opacity} />
            {/* chart rows */}
            {[-0.28, -0.36, -0.44].map((y, i) =>
                <PulseBar key={y} x={-0.6} y={y} w={1.05} h={0.045} delay={i * 0.45} color={i === 1 ? '#a855f7' : '#22d3ee'} opacity={opacity} />
            )}
        </group>
    )
}

function PhoneUI({ opacity = 1 }) {
    const panel = (x, y, w, h, color, z = 0.078) => (
        <mesh key={`${x}-${y}-${h}`} position={[x, y, z]}>
            <planeGeometry args={[w, h]} />
            <meshBasicMaterial color={color} transparent opacity={0.95 * opacity} />
        </mesh>
    )
    return (
        <group>
            <mesh position={[0, 0, 0.074]}>
                <planeGeometry args={[0.52, 1.06]} />
                <meshBasicMaterial color="#060d16" transparent opacity={opacity} />
            </mesh>
            {/* status pill */}
            {panel(0, 0.47, 0.16, 0.025, '#2a1f4d')}
            {/* header */}
            {panel(-0.02, 0.33, 0.42, 0.05, '#2c2350')}
            {panel(-0.08, 0.25, 0.3, 0.025, '#1d1836')}
            {/* cards */}
            {panel(0, 0.08, 0.44, 0.16, '#141026')}
            {panel(0, -0.12, 0.44, 0.16, '#141026')}
            <PulseBar x={-0.16} y={0.08} w={0.32} h={0.05} delay={0.2} color="#a855f7" z={0.08} opacity={opacity} />
            <PulseBar x={-0.16} y={-0.12} w={0.32} h={0.05} delay={0.55} z={0.08} opacity={opacity} />
            {/* bottom nav */}
            {[-0.15, 0, 0.15].map((x, i) => (
                <mesh key={x} position={[x, -0.45, 0.08]}>
                    <circleGeometry args={[0.022, 16]} />
                    <meshBasicMaterial color={i === 0 ? '#a855f7' : '#26324a'} transparent opacity={0.95 * opacity} />
                </mesh>
            ))}
        </group>
    )
}

// Floating orbs that orbit
function Orb({ radius, speed, color, yOffset }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime * speed
    ref.current.position.x = Math.cos(t) * radius
    ref.current.position.z = Math.sin(t) * radius
    ref.current.position.y = yOffset + Math.sin(t * 2) * 0.2
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  )
}

// Grid floor
function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.07} />
    </mesh>
  )
}

// Mouse-interactive camera rig
function CameraRig({ mouse }) {
  const { camera } = useThree()
  useFrame(() => {
    camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.03
    camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.03
    camera.lookAt(0, 0, 0)
  })
  return null
}

function BuildScene({ mouse, paper }) {
  const aspect = useThree((s) => s.viewport.aspect)
  const narrow = aspect < 1.05
  const wide = aspect >= 1.5

  const monPos = narrow ? [-1.15, 1.2, 0] : [wide ? -1.7 : -1.35, wide ? 0.3 : 0.45, 0]
  const phoPos = narrow ? [1.2, 1.05, 0.15] : [wide ? 1.9 : 1.45, wide ? -0.1 : 0.05, 0.2]
  const monScale = narrow ? 0.66 : wide ? 1.15 : 0.92
  const phoScale = narrow ? 0.68 : wide ? 1.2 : 0.96
  const dim = narrow ? 0.7 : 1
  // Paperlight is a light, print-like theme — dark 3D props would fight the copy
  const showDevices = !paper

  return (
    <>
      <ambientLight intensity={0.85} />
      <hemisphereLight args={['#cfe9ff', '#221a3a', 0.9]} />
      <directionalLight position={[4, 7, 6]} intensity={2.6} color="#ffffff" />
      <directionalLight position={[-4, 3, 6]} intensity={1.6} color="#e8f6ff" />
      <pointLight position={[6, 4, 5]} intensity={2.6} color="#06b6d4" />
      <pointLight position={[-6, 2, 3]} intensity={2.0} color="#8b5cf6" />

      {/* Local studio environment gives metals realistic reflections */}
      <Environment resolution={256}>
        <Lightformer intensity={6} color="#ffffff" position={[0, 6, -5]} scale={[14, 9, 1]} />
        <Lightformer intensity={4} color="#22d3ee" position={[-7, 1, 4]} scale={[7, 8, 1]} />
        <Lightformer intensity={3.4} color="#a855f7" position={[7, -1, 4]} scale={[7, 8, 1]} />
        <Lightformer intensity={2.6} color="#ffffff" position={[0, 2, 7]} scale={[12, 6, 1]} />
        <Lightformer intensity={2} color="#ffffff" position={[0, -6, 2]} scale={[10, 3, 1]} />
      </Environment>

      <CameraRig mouse={mouse} />
      <GridFloor />
      <ContactShadows position={[0, -1.95, 0]} opacity={0.5} scale={16} blur={2.8} far={5} color="#000000" />

      {showDevices && (
        <Suspense fallback={null}>
          <DeviceModel
            url="/models/monitor.glb"
            position={monPos}
            scale={monScale}
            phase={0}
            dim={dim}
            screenTint="#0d6b86"
          >
            <MonitorUI opacity={dim} />
          </DeviceModel>

          <DeviceModel
            url="/models/phone.glb"
            position={phoPos}
            scale={phoScale}
            phase={1.6}
            dim={dim}
            screenTint="#5b2bb0"
          >
            <PhoneUI opacity={dim} />
          </DeviceModel>
        </Suspense>
      )}

      {/* Orbiting orbs */}
      <Orb radius={3.1} speed={0.5} color="#06b6d4" yOffset={0.6} />
      <Orb radius={2.6} speed={-0.4} color="#8b5cf6" yOffset={-0.3} />
      <Orb radius={3.6} speed={0.3} color="#22d3ee" yOffset={1.1} />
      <Orb radius={2.1} speed={0.7} color="#a855f7" yOffset={-1} />

      {!narrow && showDevices && (
        <>
          <Float speed={2} floatIntensity={0.3}>
            <Text position={[monPos[0], wide ? 1.62 : 1.5, 0.1]} fontSize={0.16} color="#22d3ee" anchorX="center" fontWeight={700}>
              WEB BUILD
            </Text>
          </Float>
          <Float speed={2.4} floatIntensity={0.3}>
            <Text position={[phoPos[0], wide ? 1.12 : 1.05, 0.2]} fontSize={0.14} color="#a855f7" anchorX="center" fontWeight={700}>
              APP BUILD
            </Text>
          </Float>
        </>
      )}
    </>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CodeCollapseHero() {
  const navigate = useNavigate()
  const { themeId } = useTheme()
  const [phase, setPhase] = useState('intro')
  const [typedText, setTypedText] = useState('')
  const targetText = '</>'

  // Mouse tracking for 3D camera interaction
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = -(e.clientY / window.innerHeight - 0.5) * 2
      mouseX.set(x)
      mouseY.set(y)
      mouseRef.current = { x, y }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  // Typing effect
  useEffect(() => {
    if (phase !== 'intro') return
    let i = 0
    const timer = setInterval(() => {
      if (i < targetText.length) {
        setTypedText(targetText.slice(0, i + 1))
        i++
      } else {
        clearInterval(timer)
        setTimeout(() => setPhase('collapse'), 700)
      }
    }, 180)
    return () => clearInterval(timer)
  }, [phase])

  useEffect(() => {
    if (phase === 'collapse') {
      const t = setTimeout(() => setPhase('hero'), 900)
      return () => clearTimeout(t)
    }
  }, [phase])

  return (
    <div
      style={{ position: 'relative', width: '100%', minHeight: '100vh', background: 'var(--hero-bg)', overflow: 'hidden', transition: 'background 0.4s ease' }}
    >
      {/* 3D Background — always present */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Canvas
          camera={{ position: [0, 1, 7], fov: 55 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <BuildScene mouse={mouseRef.current} paper={themeId === 'paper'} />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 60% 60% at 80% 80%, rgba(139,92,246,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />
      {/* Bottom fade so content reads over 3D */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50%', zIndex: 2, background: 'linear-gradient(to top, var(--hero-bg) 0%, transparent 100%)', pointerEvents: 'none' }} />

      {/* ── INTRO OVERLAY ── */}
      <AnimatePresence>
        {(phase === 'intro' || phase === 'collapse') && (
          <motion.div
            key="intro-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--nav-bg)' }}
          >
            <motion.span
              initial={{ x: '-40vw', opacity: 0 }}
              animate={phase === 'collapse' ? { x: 0, scaleX: 0, opacity: 0 } : { x: 0, opacity: 1 }}
              transition={phase === 'collapse' ? { duration: 0.6, ease: 'easeInOut' } : { duration: 0.6, ease: 'easeOut' }}
              style={{ fontSize: 'clamp(60px, 12vw, 140px)', fontWeight: 900, color: '#06b6d4', fontFamily: "'Courier New', monospace", lineHeight: 1, display: 'inline-block', textShadow: '0 0 40px rgba(6,182,212,0.6)', transformOrigin: 'right center' }}
            >
              &lt;
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={phase === 'collapse' ? { scale: [1, 2.5, 0], opacity: [1, 1, 0] } : { opacity: 1, scale: 1 }}
              transition={phase === 'collapse' ? { duration: 0.7 } : { duration: 0.3, delay: 0.4 }}
              style={{ fontSize: 'clamp(60px, 12vw, 140px)', fontWeight: 900, color: '#ffffff', fontFamily: "'Courier New', monospace", lineHeight: 1, display: 'inline-block', textShadow: '0 0 40px rgba(255,255,255,0.4)', minWidth: '0.6em', textAlign: 'center' }}
            >
              {typedText.slice(1, 2)}
            </motion.span>
            <motion.span
              initial={{ x: '40vw', opacity: 0 }}
              animate={phase === 'collapse' ? { x: 0, scaleX: 0, opacity: 0 } : { x: 0, opacity: 1 }}
              transition={phase === 'collapse' ? { duration: 0.6, ease: 'easeInOut' } : { duration: 0.6, ease: 'easeOut' }}
              style={{ fontSize: 'clamp(60px, 12vw, 140px)', fontWeight: 900, color: '#06b6d4', fontFamily: "'Courier New', monospace", lineHeight: 1, display: 'inline-block', textShadow: '0 0 40px rgba(6,182,212,0.6)', transformOrigin: 'left center' }}
            >
              &gt;
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO CONTENT ── */}
      <AnimatePresence>
        {phase === 'hero' && (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{
              position: 'relative', zIndex: 5,
              minHeight: '100vh',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              padding: 'clamp(80px, 12vh, 120px) clamp(16px, 5vw, 48px) clamp(60px, 10vh, 100px)',
              textAlign: 'center',
            }}
          >
            {/* Tag badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: '100px', padding: '6px 18px', marginBottom: '24px', color: 'var(--neon-cyan)', fontSize: 'clamp(10px, 2vw, 13px)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}
            >
              <span style={{ fontFamily: 'monospace' }}>&lt;/&gt;</span>
              Corvexis Digital
            </motion.div>

            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              style={{ fontSize: 'clamp(28px, 5.5vw, 76px)', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1, margin: '0 0 20px 0', maxWidth: '860px', letterSpacing: '-0.02em' }}
            >
              Revolutionizing Digital{' '}
              <span style={{ color: 'var(--neon-cyan)', textShadow: '0 0 30px rgba(6,182,212,0.5)' }}>Excellence</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
              style={{ fontSize: 'clamp(14px, 1.8vw, 18px)', color: 'var(--text-secondary)', lineHeight: 1.7, maxWidth: '580px', margin: '0 0 36px 0' }}
            >
              Corvexis Digital builds high-performance web applications, e-commerce platforms, and communication systems — engineered with precision for South African and global businesses.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '48px' }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6,182,212,0.4)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/services')}
                style={{ padding: 'clamp(10px,2vh,14px) clamp(20px,4vw,36px)', background: 'linear-gradient(135deg, var(--neon-cyan), var(--neon-purple))', border: 'none', borderRadius: '8px', color: 'var(--bg-dark)', fontSize: 'clamp(13px,1.5vw,16px)', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em' }}
              >
                Explore Services
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, borderColor: 'rgba(139,92,246,0.8)', boxShadow: '0 0 30px rgba(139,92,246,0.3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/hub')}
                style={{ padding: 'clamp(10px,2vh,14px) clamp(20px,4vw,36px)', background: 'transparent', border: '1.5px solid var(--glass-border)', borderRadius: '8px', color: 'var(--neon-purple)', fontSize: 'clamp(13px,1.5vw,16px)', fontWeight: 700, cursor: 'pointer', letterSpacing: '0.02em', transition: 'border-color 0.2s, box-shadow 0.2s' }}
              >
                App Hub
              </motion.button>
            </motion.div>

            {/* Tools & Integrations — scrolling marquee */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
              style={{ width: '100%', maxWidth: '900px' }}
            >
              <p style={{ fontSize: 'clamp(9px,1.5vw,11px)', fontWeight: 700, letterSpacing: '0.15em', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '12px' }}>
                Tools & Integrations We Support
              </p>

              {/* Row 1 — first half */}
              <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', marginBottom: '8px' }}>
                <motion.div
                  animate={{ x: ['0%', '-50%'] }}
                  transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                  style={{ display: 'flex', gap: '8px', width: 'max-content' }}
                >
                  {[...badges.slice(0, 9), ...badges.slice(0, 9)].map((badge, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: badge.bg || 'var(--glass)', border: `1px solid ${badge.color}44`, borderRadius: '100px', color: badge.color, fontSize: 'clamp(10px,1.5vw,12px)', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
                      <span style={{ color: badge.color, display: 'flex', alignItems: 'center' }}>{badge.icon}</span>
                      {badge.label}
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Row 2 — second half, opposite direction */}
              <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
                <motion.div
                  animate={{ x: ['-50%', '0%'] }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  style={{ display: 'flex', gap: '8px', width: 'max-content' }}
                >
                  {[...badges.slice(9), ...badges.slice(9)].map((badge, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: badge.bg || 'var(--glass)', border: `1px solid ${badge.color}44`, borderRadius: '100px', color: badge.color, fontSize: 'clamp(10px,1.5vw,12px)', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
                      <span style={{ color: badge.color, display: 'flex', alignItems: 'center' }}>{badge.icon}</span>
                      {badge.label}
                    </div>
                  ))}
                </motion.div>
              </div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              style={{ position: 'absolute', bottom: 'clamp(16px, 4vh, 32px)', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
            >
              <span style={{ color: 'var(--text-secondary)', fontSize: '10px', letterSpacing: '0.12em' }}>SCROLL</span>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }} style={{ width: '1px', height: '28px', background: 'linear-gradient(to bottom, rgba(6,182,212,0.6), transparent)' }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
