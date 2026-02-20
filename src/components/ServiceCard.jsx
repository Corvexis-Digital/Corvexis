import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function ServiceCard({ icon: Icon, title, description, delay = 0 }) {
    const navigate = useNavigate()
    return (
        <motion.div
            onClick={() => navigate('/services')}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            whileHover={{
                y: -10,
                borderColor: 'var(--neon-cyan)',
                boxShadow: '0 0 30px rgba(34, 211, 238, 0.2)'
            }}
            className="glass"
            style={{
                padding: '2.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: '1px solid var(--glass-border)',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background Glow */}
            <div style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle at center, var(--neon-cyan), transparent 70%)',
                opacity: 0,
                transition: 'opacity 0.5s ease',
                pointerEvents: 'none',
                zIndex: 0
            }} className="hover-glow" />

            <div style={{ position: 'relative', zIndex: 1 }}>
                <Icon size={40} color="var(--neon-cyan)" strokeWidth={1.5} />
                <h3 style={{ marginTop: '1.5rem', fontSize: '1.5rem', color: '#fff' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem', fontSize: '1rem', lineHeight: '1.6' }}>
                    {description}
                </p>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        .glass:hover .hover-glow {
          opacity: 0.05;
        }
      `}} />
        </motion.div>
    )
}
