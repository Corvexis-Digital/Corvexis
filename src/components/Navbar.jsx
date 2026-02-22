import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close menu on route change
    useEffect(() => { setIsOpen(false) }, [location.pathname])

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'App Hub', path: '/hub' },
    ]

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{
                    position: 'fixed',
                    top: '1rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: 'calc(100% - 1.5rem)',
                    maxWidth: '1200px',
                    padding: '0.75rem 1.25rem',
                    borderRadius: '100px',
                    background: scrolled ? 'rgba(2, 2, 23, 0.92)' : 'var(--glass)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid var(--glass-border)',
                    transition: 'background 0.3s ease',
                    boxSizing: 'border-box'
                }}
            >
                {/* Logo — scales with clamp */}
                <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
                    <div style={{
                        fontSize: 'clamp(1rem, 3.5vw, 1.6rem)',
                        fontWeight: 'bold',
                        fontFamily: 'Outfit',
                        letterSpacing: '2px',
                        color: 'var(--text-primary)',
                        whiteSpace: 'nowrap'
                    }}>
                        CORVEXIS <span style={{ color: 'var(--neon-cyan)' }}>DIGITAL</span>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div style={{ display: 'none', gap: '1.5rem', alignItems: 'center' }} className="desktop-nav">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            style={{
                                color: location.pathname === link.path ? 'var(--neon-cyan)' : 'var(--text-primary)',
                                textDecoration: 'none',
                                fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                fontWeight: location.pathname === link.path ? 'bold' : 'normal',
                                transition: 'color 0.3s',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        onClick={() => navigate('/#contact')}
                        style={{ padding: '0.5rem 1.25rem', fontSize: 'clamp(0.65rem, 1vw, 0.75rem)', marginLeft: '0.5rem', whiteSpace: 'nowrap' }}
                    >
                        Initiate
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ display: 'none', cursor: 'pointer', zIndex: 1001, color: 'var(--text-primary)', padding: '0.25rem' }}
                    className="mobile-toggle"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </motion.nav>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.25 }}
                        style={{
                            position: 'fixed',
                            top: '5rem',
                            left: '0.75rem',
                            right: '0.75rem',
                            background: 'rgba(2, 2, 23, 0.97)',
                            zIndex: 998,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '2rem',
                            gap: '2rem',
                            borderRadius: '24px',
                            border: '1px solid var(--glass-border)',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.div
                                key={link.path}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                            >
                                <Link
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    style={{
                                        color: location.pathname === link.path ? 'var(--neon-cyan)' : 'var(--text-primary)',
                                        textDecoration: 'none',
                                        fontSize: '2rem',
                                        textTransform: 'uppercase',
                                        fontFamily: 'Outfit',
                                        fontWeight: 'bold',
                                        letterSpacing: '2px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '1rem'
                                    }}
                                >
                                    {location.pathname === link.path && (
                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-cyan)', display: 'inline-block' }} />
                                    )}
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}
                        >
                            <button
                                onClick={() => { setIsOpen(false); navigate('/hub') }}
                                style={{ width: '100%', padding: '1rem', fontSize: '1rem' }}
                            >
                                Launch App Hub
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
