import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

export default function GLBModel({ url, scale = 1, rotationSpeed = 0.01, color }) {
  const ref = useRef()
  const { scene } = useGLTF(url)
  
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed
      ref.current.rotation.x += rotationSpeed * 0.3
    }
  })
  
  return <primitive ref={ref} object={scene} scale={scale} />
}
