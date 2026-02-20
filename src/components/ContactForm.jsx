import { motion } from 'framer-motion'

export default function ContactForm() {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass"
            style={{
                padding: '3rem',
                maxWidth: '800px',
                margin: '0 auto',
                border: '1px solid var(--glass-border)'
            }}
        >
            <form style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'left' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--neon-cyan)' }}>Name</label>
                    <input
                        type="text"
                        placeholder="Identity"
                        style={{
                            padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            color: '#fff',
                            outline: 'none'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--neon-cyan)' }}>Email</label>
                    <input
                        type="email"
                        placeholder="Frequency"
                        style={{
                            padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            color: '#fff',
                            outline: 'none'
                        }}
                    />
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--neon-cyan)' }}>Project Brief</label>
                    <textarea
                        rows="4"
                        placeholder="Vision Details..."
                        style={{
                            padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            color: '#fff',
                            outline: 'none',
                            resize: 'none'
                        }}
                    />
                </div>
                <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                    <button style={{ width: '100%', padding: '1.25rem' }}>Initiate Sequence</button>
                </div>
            </form>
        </motion.div>
    )
}
