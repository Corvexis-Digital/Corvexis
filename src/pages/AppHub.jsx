import { motion } from 'framer-motion'
import TechAnimation from '../components/TechAnimation'
import { Rocket, Gamepad2, Brain, Play, Zap, Monitor, Globe, Lock } from 'lucide-react'
import { useState } from 'react'

export default function AppHub() {
    const [activeApp, setActiveApp] = useState(null)

    const apps = [
        {
            id: 'fluffy-jump',
            name: 'Fluffy Jump',
            description: 'An addictive platform jumper with physics-based mechanics.',
            icon: Rocket,
            color: '#06b6d4'
        },
        {
            id: 'snake-game',
            name: 'Neon Snake',
            description: 'A futuristic 3D trivia-enhanced snake experience.',
            icon: Gamepad2,
            color: '#8b5cf6'
        },
        {
            id: 'word-quest',
            name: 'Word Quest',
            description: 'Master grammar through an immersive 3D board game journey.',
            icon: Brain,
            color: '#ec4899',
            locked: false
        },
        {
            id: 'study-buddy',
            name: 'Study Buddy',
            description: 'A comprehensive educational platform for collaborative learning.',
            icon: Globe,
            color: '#10b981',
            locked: false
        },
        {
            id: 'acadamate',
            name: 'Acadamate',
            description: 'Elite academic management and AI-driven study laboratory.',
            icon: Brain,
            color: '#8b5cf6',
            locked: false
        },
        {
            id: 'medibook',
            name: 'Medibook',
            description: 'Professional healthcare appointment and wellness ecosystem.',
            icon: Monitor,
            color: '#06b6d4',
            locked: true
        }
    ]

    return (
        <motion.div
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="content-wrapper"
            style={{ padding: '8rem 2rem' }}
        >
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem' }}>App <span style={{ color: 'var(--neon-cyan)' }}>Launchpad</span></h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>Experience our digital ecosystem directly in your browser.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {apps.map((app) => (
                    <motion.div
                        key={app.id}
                        whileHover={{ y: -10 }}
                        className="glass"
                        style={{
                            padding: '2.5rem',
                            borderRadius: '24px',
                            border: `1px solid ${app.color}33`,
                            background: `linear-gradient(135deg, ${app.color}05, transparent)`,
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {app.locked && (
                            <div style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                background: 'rgba(0,0,0,0.5)',
                                padding: '0.5rem 1rem',
                                borderRadius: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                zIndex: 10
                            }}>
                                <Lock size={14} color="#facc15" />
                                <span style={{ fontSize: '0.8rem', color: '#facc15', fontWeight: 'bold', textTransform: 'uppercase' }}>Premium</span>
                            </div>
                        )}

                        <div style={{ width: '100px', height: '100px', marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TechAnimation
                                type={
                                    app.id === 'fluffy-jump' ? 'rocket' :
                                        app.id === 'snake-game' ? 'zap' :
                                            app.id === 'study-buddy' ? 'globe' :
                                                app.id === 'word-quest' ? 'brain' :
                                                    app.id === 'acadamate' ? 'palette' :
                                                        app.id === 'medibook' ? 'monitor' : 'cpu'
                                }
                                color={app.locked ? '#475569' : app.color}
                                size={80}
                            />
                        </div>
                        <app.icon size={40} color={app.locked ? '#475569' : app.color} style={{ marginBottom: '1rem' }} />
                        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: app.locked ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{app.name}</h3>
                        <p style={{ color: 'var(--text-primary)', opacity: app.locked ? 0.4 : 0.8, marginBottom: '2rem', lineHeight: '1.6' }}>{app.description}</p>

                        <button
                            style={{
                                width: '100%',
                                background: app.locked ? 'transparent' : app.color,
                                border: app.locked ? `1px solid ${app.color}` : 'none',
                                color: app.locked ? app.color : 'white',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                            onClick={() => {
                                if (app.locked) {
                                    window.open('https://purchase-gateway-placeholder.com', '_blank')
                                } else {
                                    setActiveApp(app.id)
                                }
                            }}
                        >
                            {app.locked ? (
                                <>Unlock Premium</>
                            ) : (
                                <><Play size={18} /> Launch Application</>
                            )}
                        </button>
                    </motion.div>
                ))}
            </div>

            {activeApp && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 9999,
                        background: 'var(--bg-dark)',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}
                >


                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem 2rem',
                        background: 'var(--glass)',
                        backdropFilter: 'blur(10px)',
                        borderBottom: '1px solid var(--glass-border)',
                        zIndex: 10000
                    }}>
                        <h2 style={{ fontSize: '1.2rem', margin: 0 }}>
                            {apps.find(a => a.id === activeApp).name}
                            <span style={{ color: 'var(--neon-cyan)', fontSize: '0.8rem', marginLeft: '1rem' }}>FULLSCREEN ENGINE</span>
                        </h2>
                        <button
                            onClick={() => setActiveApp(null)}
                            style={{
                                padding: '0.5rem 1.5rem',
                                background: 'var(--text-primary)',
                                color: 'var(--bg-dark)',
                                borderRadius: '8px',
                                border: 'none',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            EXIT APP
                        </button>
                    </div>

                    <div style={{ flex: 1, position: 'relative' }}>
                        <iframe
                            src={`./${activeApp}/index.html`}
                            style={{ width: '100%', height: '100%', border: 'none' }}
                            title={activeApp}
                        />
                    </div>
                </motion.div>
            )}
        </motion.div>
    )
}
