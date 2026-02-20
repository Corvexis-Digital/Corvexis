import { motion } from 'framer-motion'
import { Video, Palette, Monitor, Laptop, Zap, CheckCircle, ArrowRight, Globe, Gamepad2 } from 'lucide-react'
import TechAnimation from '../components/TechAnimation'

export default function Services() {
    const detailedServices = [
        {
            id: 'video',
            icon: Video,
            title: 'Cinematic Videography',
            desc: 'High-end production, color grading, and visual storytelling for digital brands.',
            features: ['4K/8K Production', 'Drone Cinematography', 'Post-Production VFX', 'Social Media Strategy'],
            color: '#06b6d4'
        },
        {
            id: 'design',
            icon: Palette,
            title: 'Graphic Architecture',
            desc: 'Minimalist and futuristic visual identities that build brand authority.',
            features: ['UI/UX Design', 'Brand Identity', '3D Asset Creation', 'Motion Graphics'],
            color: '#8b5cf6'
        },
        {
            id: 'web',
            icon: Monitor,
            title: 'Web & App Engineering',
            desc: 'Bespoke digital solutions built with state-of-the-art tech stacks like React and Three.js.',
            features: ['Performance Optimization', 'Interactive 3D Web', 'Progressive Web Apps', 'Cloud Architecture'],
            color: '#ec4899'
        },
        {
            id: 'hardware',
            icon: Laptop,
            title: 'Precision Hardware',
            desc: 'Expert level software and hardware replacement for high-performance computing.',
            features: ['Custom PC Builds', 'Laptop Component Repair', 'OS Optimization', 'Security Audits'],
            color: '#10b981'
        },
        {
            id: 'interactive',
            icon: Gamepad2,
            title: 'Interactive & EdTech',
            desc: 'Custom-built interactive experiences, gaming engines, and educational platforms.',
            features: ['Game Development', 'Educational Software', 'Interactive Simulators', 'Gamification Strategy'],
            color: '#f59e0b'
        }
    ]

    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="content-wrapper"
            style={{ padding: '8rem 2rem' }}
        >
            <div style={{ maxWidth: '800px', marginBottom: '6rem' }}>
                <h1 style={{ fontSize: '4.5rem', marginBottom: '2rem' }}>Engineered for <br /><span style={{ color: 'var(--neon-cyan)' }}>Impact</span></h1>
                <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    We provide a comprehensive suite of digital and physical services designed to scale your vision into the future.
                </p>
            </div>

            <div style={{ display: 'grid', gap: '6rem' }}>
                {detailedServices.map((service, index) => (
                    <motion.div
                        key={service.id}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '4rem',
                            alignItems: 'center'
                        }}
                    >
                        <div style={{ order: index % 2 === 0 ? 1 : 2 }}>
                            <service.icon size={60} color={service.color} style={{ marginBottom: '2rem' }} />
                            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{service.title}</h2>
                            <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>{service.desc}</p>

                            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                {service.features.map(f => (
                                    <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-primary)' }}>
                                        <CheckCircle size={18} color={service.color} /> {f}
                                    </li>
                                ))}
                            </ul>

                            <button style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                                Get Started <ArrowRight size={18} />
                            </button>
                        </div>

                        <div className="glass" style={{
                            padding: '2rem',
                            borderRadius: '32px',
                            border: `1px solid ${service.color}22`,
                            order: index % 2 === 0 ? 2 : 1,
                            aspectRatio: '16/9',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%'
                        }}>
                            <TechAnimation
                                type={
                                    index === 0 ? 'zap' :
                                        index === 1 ? 'palette' :
                                            index === 2 ? 'code' :
                                                index === 3 ? 'cpu' :
                                                    'globe'
                                }
                                color={service.color}
                                size={150}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
