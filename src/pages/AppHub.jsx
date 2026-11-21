import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    Play, X, Lock, Gamepad2, Brain, Globe, Monitor, Briefcase,
    Rocket, BookOpen, Zap, Cpu, Star, ExternalLink, Eye, CheckCircle2, ArrowRight
} from 'lucide-react'

// ─── App registry — iframeSrc must match actual path in /public/ ──────────────
const apps = [
    {
        id: 'fluffy-jump',
        name: 'Fluffy Jump',
        tagline: 'Physics-based arcade platformer',
        description: 'An addictive platform jumper with 3D effects, 9 unique characters, power-ups, combo system, and 100 levels. Supports mobile controls.',
        icon: Rocket,
        color: '#06b6d4',
        category: 'Game',
        // index.html lives at public/fluffy-jump/index.html
        iframeSrc: './fluffy-jump/index.html',
        status: 'live',
        badge: null
    },
    {
        id: 'snake-game',
        name: 'Neon Snake',
        tagline: 'Trivia-enhanced color mixing snake',
        description: 'A futuristic snake game with trivia categories, skin selector, speed controls, and neon visual effects. Answer questions to grow faster.',
        icon: Gamepad2,
        color: '#8b5cf6',
        category: 'Game',
        iframeSrc: './snake-game/index.html',
        status: 'live',
        badge: null
    },
    {
        id: 'word-quest',
        name: 'Word Quest',
        tagline: 'Gamified grammar & language learning',
        description: 'Master grammar through an immersive board game journey. Build vocabulary, tackle challenges, and level up your language skills.',
        icon: BookOpen,
        color: '#ec4899',
        category: 'EdTech',
        iframeSrc: './word-quest/index.html',
        status: 'live',
        badge: null
    },
    {
        id: 'study-buddy',
        name: 'Study Buddy',
        tagline: 'AI-powered collaborative learning',
        description: 'A comprehensive educational platform with AI tools, collaborative study rooms, flashcards, quizzes, and progress tracking. PWA-ready.',
        icon: Brain,
        color: '#10b981',
        category: 'EdTech',
        iframeSrc: './study-buddy/index.html',
        status: 'live',
        badge: null
    },
    {
        id: 'acadamate',
        name: 'Acadamate',
        tagline: 'Elite academic management & AI lab',
        description: 'AI-driven academic performance platform with OCR document scanning, assignment analysis, PDF tools, and a study laboratory.',
        icon: Cpu,
        color: '#8b5cf6',
        category: 'EdTech',
        iframeSrc: './acadamate/index.html',
        status: 'live',
        badge: null
    },
    {
        id: 'lifment',
        name: 'LIFMENT Electrical',
        tagline: 'Interactive 3D engineering showcase',
        description: 'A real-time WebGL product showcase for an electrical and solar engineering company. Orbit, open and explode distribution boards, PV modules, inverters and lithium storage — modelled in Blender.',
        icon: Monitor,
        color: '#f5a524',
        category: 'Web App',
        iframeSrc: './sites/lifment/index.html',
        status: 'live',
        badge: null
    },
    {
        id: 'medibook',
        name: 'Medibook',
        tagline: 'Healthcare appointment ecosystem',
        description: 'Professional healthcare appointment and wellness management platform for South African patients and providers.',
        icon: Monitor,
        color: '#06b6d4',
        category: 'Web App',
        iframeSrc: null,
        externalUrl: 'https://corvexis.github.io/Corvexis/medibook/',
        status: 'premium',
        badge: 'Premium'
    },
    {
        id: 'govjobs',
        name: 'GovJobs SA',
        tagline: 'Government jobs aggregator',
        description: 'Find public sector job opportunities across South Africa. Live job listings, department filters, and application tracking.',
        icon: Briefcase,
        color: '#f59e0b',
        category: 'Web App',
        iframeSrc: null,
        externalUrl: 'https://corvexis.github.io/Corvexis/govjobs/',
        status: 'premium',
        badge: 'Premium'
    },
    {
        id: 'meltdown',
        name: 'MELTDOWN',
        tagline: 'Blender 3D arcade game',
        description: 'Intense arcade game with physics-based mechanics, 3D Blender-rendered scenes, level management, and mobile-first design.',
        icon: Zap,
        color: '#ef4444',
        category: 'Game',
        iframeSrc: null,
        externalUrl: null,
        status: 'coming',
        badge: 'Coming Soon'
    },
    {
        id: 'teachers-pet',
        name: "Teacher's Pet",
        tagline: 'Classroom companion for teachers',
        description: 'Interactive educational companion with voice integration, game-based learning tools, timer, random student picker, and reward systems.',
        icon: Star,
        color: '#a855f7',
        category: 'EdTech',
        iframeSrc: null,
        externalUrl: null,
        status: 'coming',
        badge: 'Coming Soon'
    },
    {
        id: 'sentimentpulse',
        name: 'SentimentPulse',
        tagline: 'Real-time AI sentiment analysis',
        description: 'Mobile sentiment analysis platform reading emotional context from text, news, and social feeds in real-time. Built with React Native & AI/NLP.',
        icon: Brain,
        color: '#f59e0b',
        category: 'AI',
        iframeSrc: null,
        externalUrl: null,
        status: 'coming',
        badge: 'In Development'
    },
    {
        id: 'clipping',
        name: 'CLIPPING Engine',
        tagline: 'AI video highlight extraction',
        description: 'AI-powered video clipping and scoring engine that automatically extracts highlight reels from long-form content using Python and OpenAI.',
        icon: Zap,
        color: '#06b6d4',
        category: 'AI',
        iframeSrc: null,
        externalUrl: null,
        status: 'coming',
        badge: 'In Development'
    },
    {
        id: 'mzansi-voice',
        name: 'Mzansi Voice',
        tagline: 'SA community discussion platform',
        description: 'South African community platform with topic management, charts, analytics, content moderation, and local language support.',
        icon: Globe,
        color: '#ec4899',
        category: 'Web App',
        iframeSrc: null,
        externalUrl: null,
        status: 'coming',
        badge: 'Coming Soon'
    }
]

// ─── Category chip colors ──────────────────────────────────────────────────────
const catColors = {
    Game: '#06b6d4',
    EdTech: '#10b981',
    'Web App': '#f59e0b',
    AI: '#a855f7'
}

// ─── Status badge config ───────────────────────────────────────────────────────
const statusConfig = {
    live: { label: 'LIVE', bg: 'rgba(16,185,129,0.2)', color: '#10b981', border: 'rgba(16,185,129,0.4)' },
    premium: { label: 'PREMIUM', bg: 'rgba(245,158,11,0.2)', color: '#f59e0b', border: 'rgba(245,158,11,0.4)' },
    coming: { label: 'COMING SOON', bg: 'rgba(148,163,184,0.1)', color: '#94a3b8', border: 'rgba(148,163,184,0.2)' }
}

export default function AppHub() {
    const [activeApp, setActiveApp] = useState(null)
    const [showcase, setShowcase] = useState(null)
    const [filter, setFilter] = useState('All')

    const categories = ['All', 'Game', 'EdTech', 'Web App', 'AI']
    const filtered = filter === 'All' ? apps : apps.filter(a => a.category === filter)

    function launch(app) {
        if (app.status === 'coming') {
            setShowcase(app)
            return
        }
        if (app.iframeSrc) {
            setActiveApp(app)
        } else if (app.externalUrl) {
            window.open(app.externalUrl, '_blank', 'noopener')
        }
    }

    const activeAppData = activeApp ? apps.find(a => a.id === activeApp.id) : null

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ padding: 'clamp(5rem, 10vh, 8rem) clamp(1rem, 4vw, 2rem) 4rem' }}
        >
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)',
                    borderRadius: '100px', padding: '5px 16px', marginBottom: '1.2rem',
                    color: '#06b6d4', fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase'
                }}>
                    <Gamepad2 size={12} /> App Ecosystem
                </div>
                <h1 style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', marginBottom: '0.8rem', background: 'none', WebkitTextFillColor: 'initial', color: 'var(--text-primary)' }}>
                    App <span style={{ color: 'var(--neon-cyan)', textShadow: '0 0 20px rgba(6,182,212,0.4)' }}>Launchpad</span>
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', maxWidth: '500px', margin: '0 auto 1.5rem' }}>
                    Experience our digital ecosystem directly in your browser.
                </p>
                <Link
                    to="/projects"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                        color: 'var(--neon-cyan)', fontWeight: 700, fontSize: '0.9rem',
                        textDecoration: 'none', border: '1px solid rgba(34,211,238,0.3)',
                        padding: '0.45rem 1.2rem', borderRadius: '999px',
                        background: 'rgba(34,211,238,0.07)', transition: 'background 0.2s'
                    }}
                >
                    Browse All Projects →
                </Link>
            </div>

            {/* Category filter tabs */}
            <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{
                            padding: '0.4rem 1.1rem',
                            borderRadius: '100px',
                            border: `1px solid ${filter === cat ? (catColors[cat] || '#06b6d4') : 'rgba(255,255,255,0.1)'}`,
                            background: filter === cat ? `${catColors[cat] || '#06b6d4'}22` : 'transparent',
                            color: filter === cat ? (catColors[cat] || '#06b6d4') : 'rgba(255,255,255,0.5)',
                            fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                            transition: 'all 0.2s', letterSpacing: '0.04em',
                            minHeight: 'auto'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* App grid */}
            <motion.div
                layout
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
                    gap: '1.5rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                }}
            >
                {filtered.map((app) => {
                    const sc = statusConfig[app.status]
                    const canLaunch = app.status !== 'coming'
                    const isExternal = !app.iframeSrc && app.externalUrl
                    const AppIcon = app.icon

                    return (
                        <motion.div
                            key={app.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={canLaunch ? { y: -6, scale: 1.01 } : {}}
                            transition={{ duration: 0.3 }}
                            className="glass"
                            style={{
                                padding: '1.75rem',
                                borderRadius: '20px',
                                border: `1px solid ${app.color}30`,
                                background: `linear-gradient(135deg, ${app.color}08, transparent)`,
                                position: 'relative',
                                overflow: 'hidden',
                                opacity: app.status === 'coming' ? 0.75 : 1
                            }}
                        >
                            {/* Top glow strip */}
                            <div style={{
                                position: 'absolute', top: 0, left: 0, right: 0,
                                height: '2px', background: `linear-gradient(to right, transparent, ${app.color}, transparent)`
                            }} />

                            {/* Status badge */}
                            <div style={{
                                position: 'absolute', top: '1.1rem', right: '1.1rem',
                                background: sc.bg, border: `1px solid ${sc.border}`,
                                padding: '3px 10px', borderRadius: '100px',
                                fontSize: '9px', fontWeight: 700, color: sc.color,
                                letterSpacing: '0.1em', textTransform: 'uppercase'
                            }}>
                                {app.badge || sc.label}
                            </div>

                            {/* Icon */}
                            <div style={{
                                width: '52px', height: '52px', borderRadius: '14px',
                                background: `${app.color}20`, border: `1px solid ${app.color}40`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '1.1rem'
                            }}>
                                <AppIcon size={26} color={app.status === 'coming' ? '#475569' : app.color} />
                            </div>

                            {/* Category chip */}
                            <div style={{
                                display: 'inline-block',
                                background: `${catColors[app.category] || '#06b6d4'}18`,
                                border: `1px solid ${catColors[app.category] || '#06b6d4'}33`,
                                borderRadius: '100px', padding: '2px 10px',
                                fontSize: '10px', fontWeight: 600,
                                color: catColors[app.category] || '#06b6d4',
                                marginBottom: '0.6rem', letterSpacing: '0.06em'
                            }}>
                                {app.category}
                            </div>

                            {/* Name & tagline */}
                            <h3 style={{
                                fontSize: 'clamp(1.1rem, 3vw, 1.35rem)',
                                fontWeight: 800, margin: '0 0 0.3rem',
                                color: app.status === 'coming' ? 'var(--text-secondary)' : 'var(--text-primary)',
                                textTransform: 'none', letterSpacing: 'normal'
                            }}>
                                {app.name}
                            </h3>
                            <p style={{ fontSize: '0.78rem', color: app.color, fontWeight: 600, marginBottom: '0.75rem', opacity: 0.9 }}>
                                {app.tagline}
                            </p>
                            <p style={{
                                color: 'var(--text-secondary)', fontSize: '0.85rem',
                                lineHeight: 1.6, marginBottom: '1.5rem',
                                display: '-webkit-box', WebkitLineClamp: 3,
                                WebkitBoxOrient: 'vertical', overflow: 'hidden'
                            }}>
                                {app.description}
                            </p>

                            {/* Action button */}
                            <button
                                onClick={() => launch(app)}
                                style={{
                                    width: '100%',
                                    background: !canLaunch
                                        ? `${app.color}1f`
                                        : `linear-gradient(135deg, ${app.color}cc, ${app.color}88)`,
                                    border: !canLaunch ? `1px solid ${app.color}55` : 'none',
                                    color: !canLaunch ? app.color : '#fff',
                                    padding: '0.65rem 1rem',
                                    borderRadius: '10px',
                                    fontSize: '0.88rem', fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', gap: '0.5rem',
                                    transition: 'opacity 0.2s',
                                    letterSpacing: '0.04em',
                                    minHeight: '44px'
                                }}
                            >
                                {!canLaunch ? (
                                    <><Eye size={16} /> View Showcase</>
                                ) : isExternal ? (
                                    <><ExternalLink size={16} /> Open App</>
                                ) : (
                                    <><Play size={16} fill="white" /> Launch App</>
                                )}
                            </button>
                        </motion.div>
                    )
                })}
            </motion.div>

            {/* Fullscreen iframe viewer */}
            <AnimatePresence>
                {activeAppData && activeAppData.iframeSrc && (
                    <motion.div
                        key="iframe-viewer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 9999,
                            background: '#000',
                            display: 'flex', flexDirection: 'column'
                        }}
                    >
                        {/* Toolbar */}
                        <div style={{
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '0.75rem 1.5rem',
                            background: 'rgba(0,0,0,0.9)',
                            backdropFilter: 'blur(12px)',
                            borderBottom: `1px solid ${activeAppData.color}44`,
                            flexShrink: 0, zIndex: 10000
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <activeAppData.icon size={20} color={activeAppData.color} />
                                <span style={{ color: '#fff', fontWeight: 700, fontSize: '1rem' }}>{activeAppData.name}</span>
                                <span style={{
                                    background: `${activeAppData.color}22`, border: `1px solid ${activeAppData.color}44`,
                                    color: activeAppData.color, fontSize: '10px', fontWeight: 700,
                                    padding: '2px 10px', borderRadius: '100px', letterSpacing: '0.1em', textTransform: 'uppercase'
                                }}>
                                    FULLSCREEN ENGINE
                                </span>
                            </div>
                            <button
                                onClick={() => setActiveApp(null)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                                    padding: '0.45rem 1.1rem',
                                    background: 'rgba(255,255,255,0.1)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '8px', color: '#fff',
                                    fontSize: '0.85rem', fontWeight: 700,
                                    cursor: 'pointer', minHeight: '44px'
                                }}
                            >
                                <X size={14} /> EXIT
                            </button>
                        </div>

                        {/* iFrame */}
                        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                            <iframe
                                src={activeAppData.iframeSrc}
                                style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
                                title={activeAppData.name}
                                allow="autoplay; fullscreen"
                                sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-pointer-lock allow-popups"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Showcase modal for apps still in development / coming soon */}
            <AnimatePresence>
                {showcase && (() => {
                    const Icon = showcase.icon
                    const sc = statusConfig[showcase.status]
                    const roadmap = showcase.badge === 'In Development'
                        ? ['Architecture & data model', 'Core build in progress', 'Private beta', 'Public release']
                        : ['Design & prototyping', 'Engineering', 'Early access', 'Public launch']
                    return (
                        <motion.div
                            key="showcase"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowcase(null)}
                            style={{
                                position: 'fixed', inset: 0, zIndex: 9500,
                                background: 'rgba(0,0,0,0.72)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                padding: 'clamp(1rem, 4vw, 2rem)'
                            }}
                        >
                            <motion.div
                                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                                transition={{ duration: 0.25 }}
                                onClick={(e) => e.stopPropagation()}
                                style={{
                                    width: '100%', maxWidth: '560px', maxHeight: '88vh', overflowY: 'auto',
                                    background: 'var(--bg-dark)',
                                    border: `1px solid ${showcase.color}44`,
                                    borderRadius: '22px',
                                    padding: 'clamp(1.4rem, 4vw, 2rem)',
                                    position: 'relative'
                                }}
                            >
                                <button
                                    onClick={() => setShowcase(null)}
                                    aria-label="Close showcase"
                                    style={{
                                        position: 'absolute', top: '1rem', right: '1rem',
                                        width: '38px', height: '38px', minHeight: '38px', padding: 0,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: 'var(--glass)', border: '1px solid var(--glass-border)',
                                        borderRadius: '50%', color: 'var(--text-primary)', cursor: 'pointer'
                                    }}
                                >
                                    <X size={16} />
                                </button>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1.1rem', paddingRight: '2.5rem' }}>
                                    <div style={{
                                        width: '54px', height: '54px', borderRadius: '15px', flexShrink: 0,
                                        background: `${showcase.color}20`, border: `1px solid ${showcase.color}45`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                                    }}>
                                        <Icon size={26} color={showcase.color} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700 }}>
                                            {showcase.category}
                                        </div>
                                        <h2 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.7rem)', color: 'var(--text-primary)', margin: '0.15rem 0 0', textTransform: 'none', letterSpacing: 'normal' }}>
                                            {showcase.name}
                                        </h2>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                                    <span style={{
                                        background: sc.bg, border: `1px solid ${sc.border}`, color: sc.color,
                                        fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em',
                                        textTransform: 'uppercase', padding: '3px 10px', borderRadius: '100px'
                                    }}>
                                        {showcase.badge || sc.label}
                                    </span>
                                    <span style={{
                                        background: `${showcase.color}18`, border: `1px solid ${showcase.color}40`,
                                        color: showcase.color, fontSize: '9px', fontWeight: 700,
                                        letterSpacing: '0.1em', textTransform: 'uppercase',
                                        padding: '3px 10px', borderRadius: '100px'
                                    }}>
                                        {showcase.tagline}
                                    </span>
                                </div>

                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.75, marginBottom: '1.5rem' }}>
                                    {showcase.description}
                                </p>

                                <div style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: '0.7rem' }}>
                                    Roadmap
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', marginBottom: '1.6rem' }}>
                                    {roadmap.map((step, i) => (
                                        <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                                            <CheckCircle2 size={15} color={i === 0 ? showcase.color : 'var(--text-secondary)'} style={{ opacity: i === 0 ? 1 : 0.45 }} />
                                            <span style={{ fontSize: '0.86rem', color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                                {step}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                                    <Link
                                        to="/projects"
                                        onClick={() => setShowcase(null)}
                                        style={{
                                            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
                                            padding: '0.7rem 1.2rem', borderRadius: '10px',
                                            background: `linear-gradient(135deg, ${showcase.color}dd, ${showcase.color}99)`,
                                            color: '#fff', fontWeight: 700, fontSize: '0.86rem', textDecoration: 'none'
                                        }}
                                    >
                                        See related projects <ArrowRight size={15} />
                                    </Link>
                                    <button
                                        onClick={() => setShowcase(null)}
                                        style={{
                                            padding: '0.7rem 1.2rem', borderRadius: '10px',
                                            background: 'transparent', border: '1px solid var(--glass-border)',
                                            color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.86rem', cursor: 'pointer'
                                        }}
                                    >
                                        Close
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                })()}
            </AnimatePresence>
        </motion.div>
    )
}
