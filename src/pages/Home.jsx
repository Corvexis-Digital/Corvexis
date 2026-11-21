import { Suspense } from 'react'
import Scene from '../components/Scene'
import ServiceCard from '../components/ServiceCard'
import ProcessSection from '../components/ProcessSection'
import ContactForm from '../components/ContactForm'
import ThreeDImageGallery from '../components/ThreeDImageGallery' // Fixed casing if needed
import TechAnimation from '../components/TechAnimation'
import CodeCollapseHero from '../components/CodeCollapseHero'
import IntegrationsSection from '../components/IntegrationsSection'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Video, Palette, Monitor, Laptop, Code, Cpu, Terminal, Globe, Rocket, Zap, Gamepad2, Brain } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const navigate = useNavigate()
    const { scrollYProgress } = useScroll()
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

    const services = [
        {
            icon: Video,
            title: "Videography",
            description: "Cinematic production and storytelling that captures the essence of your brand in motion.",
            delay: 0.1
        },
        {
            icon: Palette,
            title: "Graphic Design",
            description: "Next-gen visual identities and digital assets that push the boundaries of creativity.",
            delay: 0.2
        },
        {
            icon: Monitor,
            title: "Web & App Dev",
            description: "High-performance, scalable digital solutions built with state-of-the-art frameworks.",
            delay: 0.3
        },
        {
            icon: Zap,
            title: "AI & Automation",
            description: "Intelligent systems and workflow automation powered by advanced neural networks.",
            delay: 0.4
        },
        {
            icon: Gamepad2,
            title: "Interactive & EdTech",
            description: "Custom-built interactive experiences, gaming engines, and educational platforms.",
            delay: 0.5
        },
        {
            icon: Laptop,
            title: "Precision Hardware",
            description: "Expert level software and hardware replacement for high-performance computing.",
            delay: 0.6
        },
        {
            icon: Globe,
            title: "Enterprise Architecture",
            description: "Scalable cloud infrastructure and robust backend systems joined for global reach.",
            delay: 0.7
        }
    ]

    const projects = [
        { image: "/portfolio/project-studybuddy.png", title: "Study Buddy AI", description: "AI-Powered Educational Platform" },
        { image: "/portfolio/project-acadamate.png", title: "Acadamate", description: "Academic Performance Laboratory" },
        { image: "/portfolio/project-neonsnake.png", title: "Neon Snake 3D", description: "Futuristic 3D Arcade Game" },
        { image: "/portfolio/project-fluffyjump.png", title: "Fluffy Jump", description: "Physics-Based Mobile Game" },
        { image: "/portfolio/project-wordquest.png", title: "Word Quest", description: "Gamified Language Learning" },
        { image: "/portfolio/project-medibook.png", title: "Medibook", description: "Healthcare Appointment Ecosystem" },
        { image: "/portfolio/project-govjobs.png", title: "GovJobs SA", description: "Government Jobs Aggregator" },
        { image: "/portfolio/project1.jpg", title: "mARK Marketplace", description: "SA Ecommerce SaaS Platform" },
        { image: "/portfolio/project2.jpg", title: "MELTDOWN Game", description: "Blender 3D Arcade Experience" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{ position: 'relative' }}
        >
            {/* Decorative Tech Elements */}
            <div style={{ position: 'fixed', width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1, overflow: 'hidden' }}>
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0.1, x: Math.random() * 100 + '%', y: Math.random() * 100 + '%' }}
                        animate={{
                            y: [null, (Math.random() - 0.5) * 100 + 'px'],
                            rotate: [0, 360]
                        }}
                        transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                        style={{ position: 'absolute', color: 'var(--neon-cyan)', filter: 'blur(1px)' }}
                    >
                        {i % 3 === 0 ? <Cpu size={100} /> : i % 3 === 1 ? <Terminal size={80} /> : <Code size={120} />}
                    </motion.div>
                ))}
            </div>

            {/* Background Parallax Layer */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '120%',
                    zIndex: -2,
                    y: bgY,
                    background: 'radial-gradient(circle at 70% 20%, rgba(6, 182, 212, 0.1), transparent 40%), radial-gradient(circle at 10% 80%, rgba(139, 92, 246, 0.1), transparent 40%)',
                    pointerEvents: 'none'
                }}
            />

            <div className="canvas-container" style={{ position: 'fixed', zIndex: -1 }}>
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </div>

            {/* Hero Section */}
            <CodeCollapseHero />

            {/* Services Section */}
            <section id="services" style={{ background: 'var(--bg-accent)', position: 'relative' }}>
                <div className="content-wrapper">
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                fontSize: 'clamp(2.5rem, 8vw, 4rem)',
                                marginBottom: '1.5rem',
                                textShadow: '0 0 20px rgba(34, 211, 238, 0.3)'
                            }}
                        >
                            Our <span style={{ color: 'var(--neon-cyan)' }}>Excellence</span>
                        </motion.h2>
                        <div style={{ width: '80px', height: '4px', background: 'var(--neon-cyan)', margin: '0 auto 2rem' }} />
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>From concept to reality, we deliver elite digital services.</p>
                    </div>

                    <div className="services-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(max(250px, 100% / 4), 1fr))',
                        gap: '2rem'
                    }}>
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </section>

            <IntegrationsSection />

            {/* Theme Lab teaser */}
            <section id="themes" style={{ position: 'relative' }}>
                <div className="content-wrapper">
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{ fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', marginBottom: '1rem' }}
                        >
                            Five <span style={{ color: 'var(--neon-cyan)' }}>Themes</span>. One Studio.
                        </motion.h2>
                        <div style={{ width: '80px', height: '4px', background: 'var(--neon-cyan)', margin: '0 auto 1.5rem' }} />
                        <p style={{ color: 'var(--text-secondary)', maxWidth: '560px', margin: '0 auto', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.7 }}>
                            Minimal design systems, each with its own motion language and a real 3D element. Pick a direction — we build the rest.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 190px), 1fr))',
                        gap: '1rem',
                        marginBottom: '2.5rem'
                    }}>
                        {[
                            { name: 'Aurora Glass', color: '#22d3ee', motion: 'Blur-in + float' },
                            { name: 'Monolith', color: '#ffffff', motion: 'Clip wipe' },
                            { name: 'Solaris', color: '#f59e0b', motion: 'Slow rise' },
                            { name: 'Obsidian Grid', color: '#34d399', motion: 'Typewriter' },
                            { name: 'Paperlight', color: '#1d4ed8', motion: 'Paper flip' }
                        ].map((t, i) => (
                            <motion.div
                                key={t.name}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.08 }}
                                whileHover={{ y: -6 }}
                                onClick={() => navigate('/themes')}
                                style={{
                                    padding: '1.4rem',
                                    borderRadius: '16px',
                                    border: `1px solid ${t.color}33`,
                                    background: `linear-gradient(155deg, ${t.color}10, rgba(255,255,255,0.02))`,
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{
                                    width: '34px', height: '34px', borderRadius: '10px',
                                    background: t.color, opacity: 0.85,
                                    boxShadow: `0 0 22px ${t.color}55`,
                                    marginBottom: '1rem'
                                }} />
                                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</div>
                                <div style={{
                                    fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                                    color: 'var(--text-secondary)', fontWeight: 700, marginTop: '0.4rem'
                                }}>
                                    {t.motion}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <motion.button
                            whileHover={{ scale: 1.04, boxShadow: '0 0 28px rgba(6,182,212,0.35)' }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => navigate('/themes')}
                            style={{
                                padding: '0.8rem 2rem',
                                borderRadius: '10px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                                color: '#fff', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer'
                            }}
                        >
                            Open the Theme Lab →
                        </motion.button>
                    </div>
                </div>
            </section>

            <section id="portfolio" style={{ overflow: 'hidden' }}>
                <div className="content-wrapper">
                    <div className="portfolio-header">
                        <div>
                            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)' }}>Visual <span style={{ color: 'var(--neon-purple)' }}>Innovations</span></h2>
                            <p style={{ color: 'var(--text-secondary)' }}>A glimpse into our future-ready solutions.</p>
                        </div>
                        <div style={{ width: '120px', display: 'flex', justifyContent: 'center' }}>
                            <TechAnimation type="globe" size={120} />
                        </div>
                    </div>
                    <ThreeDImageGallery projects={projects} />
                </div>
            </section>

            <ProcessSection />

            <section id="contact" style={{ background: 'var(--bg-accent)' }}>
                <div className="content-wrapper">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}>Initiate <span style={{ color: 'var(--neon-cyan)' }}>Contact</span></h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1rem' }}>Interested in working together? Launch your project here.</p>
                    </div>

                    <ContactForm />
                </div>
            </section>
        </motion.div >
    )
}
