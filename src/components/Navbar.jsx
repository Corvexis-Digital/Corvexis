import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, ArrowUpRight, Mail, Gamepad2 } from 'lucide-react'
import { useState, useEffect } from 'react'

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Themes', path: '/themes' },
    { name: 'Projects', path: '/projects' },
    { name: 'App Hub', path: '/hub' }
]

export default function Navbar() {
    const location = useLocation()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close on route change
    useEffect(() => { setIsOpen(false) }, [location.pathname])

    // Lock page scroll + allow Escape to close while the mobile sheet is open
    useEffect(() => {
        if (!isOpen) return
        const prev = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false) }
        window.addEventListener('keydown', onKey)
        return () => {
            document.body.style.overflow = prev
            window.removeEventListener('keydown', onKey)
        }
    }, [isOpen])

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="site-nav"
                style={{
                    position: 'fixed',
                    top: 'max(0.75rem, env(safe-area-inset-top))',
                    left: 0,
                    right: 0,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    zIndex: 1000,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    width: 'calc(100% - 1.5rem)',
                    maxWidth: '1200px',
                    padding: 'clamp(0.5rem, 1.2vw, 0.75rem) clamp(0.7rem, 2vw, 1.25rem)',
                    borderRadius: '100px',
                    background: scrolled || isOpen ? 'var(--nav-bg)' : 'var(--glass)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid var(--glass-border)',
                    transition: 'background 0.3s ease',
                    boxSizing: 'border-box'
                }}
            >
                <Link to="/" style={{ textDecoration: 'none', flexShrink: 0, minWidth: 0 }}>
                    <div style={{
                        fontSize: 'clamp(0.95rem, 3.4vw, 1.6rem)',
                        fontWeight: 'bold',
                        fontFamily: 'Outfit',
                        letterSpacing: 'clamp(0.5px, 0.3vw, 2px)',
                        color: 'var(--text-primary)',
                        whiteSpace: 'nowrap',
                        lineHeight: 1.1
                    }}>
                        CORVEXIS <span style={{ color: 'var(--neon-cyan)' }}>DIGITAL</span>
                    </div>
                </Link>

                {/* Desktop links */}
                <div className="desktop-nav" style={{ display: 'none', gap: 'clamp(0.9rem, 1.6vw, 1.5rem)', alignItems: 'center' }}>
                    {navLinks.map((link) => {
                        const active = location.pathname === link.path
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    color: active ? 'var(--neon-cyan)' : 'var(--text-primary)',
                                    textDecoration: 'none',
                                    fontSize: 'clamp(0.68rem, 1vw, 0.85rem)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    fontWeight: active ? 'bold' : 'normal',
                                    transition: 'color 0.3s',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                    <button
                        onClick={() => navigate('/#contact')}
                        className="nav-cta"
                        style={{ padding: '0.5rem 1.1rem', fontSize: 'clamp(0.62rem, 0.9vw, 0.75rem)', whiteSpace: 'nowrap' }}
                    >
                        Initiate
                    </button>
                </div>

                {/* Mobile / tablet toggle */}
                <button
                    onClick={() => setIsOpen((v) => !v)}
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                    className="mobile-toggle"
                    style={{
                        display: 'none',
                        background: 'transparent',
                        border: '1px solid var(--glass-border)',
                        borderRadius: '50%',
                        width: '42px',
                        height: '42px',
                        minHeight: '42px',
                        padding: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        flexShrink: 0
                    }}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </motion.nav>

            {/* Full-screen mobile menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="mobile-sheet"
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 999,
                            background: 'color-mix(in srgb, var(--bg-dark) 92%, transparent)',
                            backdropFilter: 'blur(22px)',
                            WebkitBackdropFilter: 'blur(22px)',
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 'calc(5.5rem + env(safe-area-inset-top)) clamp(1.25rem, 6vw, 2rem) calc(1.5rem + env(safe-area-inset-bottom))',
                            overflowY: 'auto',
                            overscrollBehavior: 'contain'
                        }}
                    >
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.35rem', justifyContent: 'center' }}>
                            {navLinks.map((link, i) => {
                                const active = location.pathname === link.path
                                return (
                                    <motion.div
                                        key={link.path}
                                        initial={{ opacity: 0, y: 18 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.05 + i * 0.06 }}
                                    >
                                        <Link
                                            to={link.path}
                                            onClick={() => setIsOpen(false)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: '1rem',
                                                padding: 'clamp(0.7rem, 2.4vw, 1rem) 0',
                                                borderBottom: '1px solid var(--glass-border)',
                                                color: active ? 'var(--neon-cyan)' : 'var(--text-primary)',
                                                textDecoration: 'none',
                                                fontFamily: 'Outfit',
                                                fontWeight: 700,
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.06em',
                                                fontSize: 'clamp(1.35rem, 6.5vw, 2.1rem)',
                                                lineHeight: 1.15
                                            }}
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                                {active && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--neon-cyan)' }} />}
                                                {link.name}
                                            </span>
                                            <ArrowUpRight size={20} style={{ opacity: 0.45, flexShrink: 0 }} />
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingTop: '1.5rem' }}
                        >
                            <button
                                onClick={() => { setIsOpen(false); navigate('/hub') }}
                                style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                <Gamepad2 size={16} /> Launch App Hub
                            </button>
                            <button
                                onClick={() => { setIsOpen(false); navigate('/#contact') }}
                                style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            >
                                <Mail size={16} /> Start a project
                            </button>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', textAlign: 'center', marginTop: '0.4rem' }}>
                                Corvexis Digital · South Africa
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
