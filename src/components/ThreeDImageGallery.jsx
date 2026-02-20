import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

export default function ThreeDImageGallery({ images }) {
    const containerRef = useRef(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    return (
        <div ref={containerRef} style={{ padding: '10vh 0', position: 'relative' }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '4rem',
                perspective: '1000px'
            }}>
                {images.map((img, index) => {
                    const rotateY = useTransform(
                        scrollYProgress,
                        [0, 1],
                        [index % 2 === 0 ? -25 : 25, index % 2 === 0 ? 25 : -25]
                    )
                    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
                    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

                    return (
                        <motion.div
                            key={index}
                            style={{
                                rotateY,
                                scale,
                                opacity,
                                width: '100%',
                                height: '400px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                position: 'relative',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                                border: '1px solid var(--glass-border)'
                            }}
                        >
                            <img
                                src={img}
                                alt={`Project ${index}`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '2rem',
                                background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                                color: '#fff'
                            }}>
                                <h4 style={{ fontSize: '1.5rem', fontFamily: 'Outfit' }}>Project {index + 1}</h4>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
