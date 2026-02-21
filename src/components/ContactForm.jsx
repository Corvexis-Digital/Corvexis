import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'

export default function ContactForm() {
    const [status, setStatus] = useState('idle') // idle, submitting, success, error

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('submitting')

        const form = e.target
        const data = new FormData(form)

        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (response.ok) {
                setStatus('success')
                form.reset()
            } else {
                setStatus('error')
            }
        } catch (error) {
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass"
                style={{
                    padding: '4rem 2rem',
                    maxWidth: '800px',
                    margin: '0 auto',
                    textAlign: 'center',
                    border: '1px solid var(--glass-border)'
                }}
            >
                <CheckCircle2 size={60} color="var(--neon-cyan)" style={{ margin: '0 auto 1.5rem' }} />
                <h3 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Transmission Received</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>
                    Your project brief has successfully reached our core. We will calculate the trajectory and contact you shortly.
                </p>
                <button
                    onClick={() => setStatus('idle')}
                    style={{ background: 'transparent', border: '1px solid var(--neon-cyan)', color: 'var(--neon-cyan)' }}
                >
                    Initiate New Sequence
                </button>
            </motion.div>
        )
    }

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
                border: '1px solid var(--glass-border)',
                position: 'relative'
            }}
        >
            <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/mgolnaov"
                method="POST"
                style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', textAlign: 'left' }}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--neon-cyan)' }}>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Identity"
                        required
                        disabled={status === 'submitting'}
                        style={{
                            padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            color: '#fff',
                            outline: 'none',
                            opacity: status === 'submitting' ? 0.5 : 1
                        }}
                    />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--neon-cyan)' }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Frequency"
                        required
                        disabled={status === 'submitting'}
                        style={{
                            padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            color: '#fff',
                            outline: 'none',
                            opacity: status === 'submitting' ? 0.5 : 1
                        }}
                    />
                </div>
                <div style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--neon-cyan)' }}>Project Brief</label>
                    <textarea
                        name="message"
                        rows="4"
                        placeholder="Vision Details..."
                        required
                        disabled={status === 'submitting'}
                        style={{
                            padding: '1rem',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--glass-border)',
                            borderRadius: '8px',
                            color: '#fff',
                            outline: 'none',
                            resize: 'none',
                            opacity: status === 'submitting' ? 0.5 : 1
                        }}
                    />
                </div>
                <div style={{ gridColumn: 'span 2', marginTop: '1rem' }}>
                    <button
                        type="submit"
                        disabled={status === 'submitting'}
                        style={{ width: '100%', padding: '1.25rem', position: 'relative' }}
                    >
                        {status === 'submitting' ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <Loader2 className="animate-spin" size={20} />
                                Synchronizing...
                            </span>
                        ) : 'Initiate Sequence'}
                    </button>

                    {status === 'error' && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={{ color: '#ef4444', fontSize: '0.9rem', marginTop: '1rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            <AlertCircle size={16} /> Connection Interrupted. Please try again.
                        </motion.div>
                    )}
                </div>
            </form>
        </motion.div>
    )
}
