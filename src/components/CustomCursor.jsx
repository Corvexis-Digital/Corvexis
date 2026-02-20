import { useEffect, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false)

    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 150 }
    const x = useSpring(cursorX, springConfig)
    const y = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const handleHoverStart = (e) => {
            if (e.target.closest('button, a, .glass')) {
                setIsHovered(true)
            }
        }

        const handleHoverEnd = () => {
            setIsHovered(false)
        }

        window.addEventListener('mousemove', moveCursor)
        window.addEventListener('mouseover', handleHoverStart)
        window.addEventListener('mouseout', handleHoverEnd)

        return () => {
            window.removeEventListener('mousemove', moveCursor)
            window.removeEventListener('mouseover', handleHoverStart)
            window.removeEventListener('mouseout', handleHoverEnd)
        }
    }, [cursorX, cursorY])

    return (
        <>
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: 20,
                    height: 20,
                    backgroundColor: 'var(--neon-cyan)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    x,
                    y,
                    translateX: '-50%',
                    translateY: '-50%',
                    mixBlendMode: 'difference'
                }}
                animate={{
                    scale: isHovered ? 4 : 1,
                    opacity: isHovered ? 0.5 : 1
                }}
            />
            <motion.div
                style={{
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    width: 8,
                    height: 8,
                    backgroundColor: '#fff',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    x: cursorX,
                    y: cursorY,
                    translateX: '-50%',
                    translateY: '-50%'
                }}
            />
        </>
    )
}
