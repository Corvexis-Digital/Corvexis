import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
    const location = useLocation()
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'App Hub', path: '/hub' },
    ]

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            style={{
                position: 'fixed',
                top: '1.5rem',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 1000,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 'calc(100% - 2rem)',
                maxWidth: '1200px',
                padding: '1rem 2rem',
                borderRadius: '100px',
                background: 'var(--glass)',
                backdropFilter: 'blur(12px)',
                border: '1px solid var(--glass-border)'
            }}
        >
            <Link to="/" style={{ textDecoration: 'none' }}>
                <div style={{ fontSize: '2.4rem', fontWeight: 'bold', fontFamily: 'Outfit', letterSpacing: '2px', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                    CORVEXIS <span style={{ color: 'var(--neon-cyan)' }}>DIGITAL</span>
                </div>
            </Link>

            {/* Desktop Nav */}
            <div style={{ display: 'none', gap: '20px', alignItems: 'center' }} className="desktop-nav">
                {navLinks.map((link) => (
                    <Link
                        key={link.path}
                        to={link.path}
                        style={{
                            color: location.pathname === link.path ? 'var(--neon-cyan)' : 'var(--text-primary)',
                            textDecoration: 'none',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '1px',
                            fontWeight: location.pathname === link.path ? 'bold' : 'normal',
                            transition: 'color 0.3s'
                        }}
                    >
                        {link.name}
                    </Link>
                ))}
                <button style={{ padding: '0.5rem 1.5rem', fontSize: '0.75rem', marginLeft: '1rem' }}>Initiate</button>
            </div>

            {/* Mobile Toggle */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{ display: 'none', cursor: 'pointer', zIndex: 1001, color: 'var(--text-primary)' }}
                className="mobile-toggle"
            >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        style={{
                            position: 'fixed',
                            top: '5rem',
                            left: '0',
                            width: '100%',
                            background: 'var(--bg-dark)',
                            zIndex: 999,
                            display: 'flex',
                            flexDirection: 'column',
                            padding: '2rem',
                            gap: '1.5rem',
                            borderRadius: '24px',
                            border: '1px solid var(--glass-border)',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    color: location.pathname === link.path ? 'var(--neon-cyan)' : 'var(--text-primary)',
                                    textDecoration: 'none',
                                    fontSize: '1.5rem',
                                    textTransform: 'uppercase',
                                    fontFamily: 'Outfit',
                                    fontWeight: 'bold'
                                }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

        </motion.nav>
    )
}
