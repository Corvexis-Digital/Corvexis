import { motion } from 'framer-motion'
import { Cpu, Terminal, Code, Zap, Globe, Rocket, Palette } from 'lucide-react'

const icons = {
    cpu: Cpu,
    terminal: Terminal,
    code: Code,
    zap: Zap,
    globe: Globe,
    rocket: Rocket,
    palette: Palette
}

export default function TechAnimation({ type = 'cpu', color = 'var(--neon-cyan)', size = 100 }) {
    const Icon = icons[type] || Cpu

    return (
        <div style={{
            width: size,
            height: size,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
        }}>
            <motion.div
                animate={{
                    rotate: 360,
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    border: `2px solid ${color}`,
                    opacity: 0.2
                }}
            />
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <Icon size={size * 0.6} color={color} style={{ filter: `drop-shadow(0 0 10px ${color})` }} />
            </motion.div>
        </div>
    )
}
