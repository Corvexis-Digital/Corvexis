import { Suspense } from 'react'
import Scene from '../components/Scene'
import ServiceCard from '../components/ServiceCard'
import ProcessSection from '../components/ProcessSection'
import ContactForm from '../components/ContactForm'
import ThreeDImageGallery from '../components/ThreeDImageGallery' // Fixed casing if needed
import TechAnimation from '../components/TechAnimation'
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
            icon: Laptop,
            title: "Hardware Upgrade",
            description: "Professional software and hardware replacement/repair for PCs and Laptops.",
            delay: 0.4
        },
        {
            icon: Gamepad2,
            title: "Interactive & EdTech",
            description: "Custom-built interactive experiences, gaming engines, and educational platforms.",
            delay: 0.5
        }
    ]

    const projectImages = [
        "/portfolio/project1.jpg",
        "/portfolio/project2.jpg",
        "/portfolio/project3.jpg",
        "/portfolio/project4.png",
        "/portfolio/project5.png"
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
            <section id="hero" style={{ width: '100vw', padding: 0, margin: 0, overflow: 'hidden' }}>
                <div style={{ width: '100%', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', alignItems: 'center', gap: '4rem', padding: '0 4rem' }}>
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 style={{ marginBottom: '1.5rem', lineHeight: 1 }}>Revolutionizing <br />Digital <span style={{ color: 'var(--neon-purple)' }}>Excellence</span></h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', lineHeight: '1.8' }}>
                            At Corvexis Digital, we merge futuristic technology with artistic vision to create immersive digital experiences that redefine industry standards.
                        </p>
                        <div style={{ marginTop: '3.5rem', display: 'flex', gap: '1.5rem' }}>
                            <button onClick={() => navigate('/services')}>Explore Services</button>
                            <button onClick={() => navigate('/hub')} style={{ borderColor: 'var(--neon-purple)', color: 'var(--neon-purple)' }}>App Hub</button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        style={{ width: '100%', maxWidth: '400px', display: 'flex', justifyContent: 'center' }}
                    >
                        <div className="glass hero-lottie-container" style={{ padding: '3rem', borderRadius: '50%', border: '1px solid var(--neon-cyan)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <TechAnimation type="rocket" size={180} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" style={{ background: 'var(--bg-accent)', position: 'relative' }}>
                <div className="content-wrapper">
                    <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            style={{
                                fontSize: '4rem',
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

            <section id="portfolio" style={{ overflow: 'hidden' }}>
                <div className="content-wrapper">
                    <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '3.5rem' }}>Visual <span style={{ color: 'var(--neon-purple)' }}>Innovations</span></h2>
                            <p style={{ color: 'var(--text-secondary)' }}>A glimpse into our future-ready solutions.</p>
                        </div>
                        <div style={{ width: '150px', display: 'flex', justifyContent: 'center' }}>
                            <TechAnimation type="globe" size={120} />
                        </div>
                    </div>
                    <ThreeDImageGallery images={projectImages} />
                </div>
            </section>

            <ProcessSection />

            <section id="contact" style={{ background: 'var(--bg-accent)' }}>
                <div className="content-wrapper">
                    <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                        <h2 style={{ fontSize: '4rem' }}>Initiate <span style={{ color: 'var(--neon-cyan)' }}>Contact</span></h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '1rem' }}>Interested in working together? Launch your project here.</p>
                    </div>

                    <ContactForm />
                </div>
            </section>
        </motion.div>
    )
}
