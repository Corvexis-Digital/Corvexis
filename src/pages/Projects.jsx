import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Code2, Layers, Zap } from 'lucide-react'

const SITE_BASE = import.meta.env.BASE_URL || '/'

const projects = [
    {
        id: 'lifment',
        name: 'LIFMENT Electrical',
        category: 'Website Build / 3D',
        color: '#f5a524',
        tech: ['Three.js', 'WebGL', 'glTF', 'Blender', 'HTML/CSS'],
        description: 'A live 3D product showcase for an electrical, solar and backup-power engineering company. Interactive distribution board, PV modules, inverters and lithium storage with exploded views, x-ray, wireframe, hotspot annotations and real-time WebGL.',
        status: 'Live',
        image: null,
        tags: ['Website', '3D', 'Energy'],
        link: `${SITE_BASE}sites/lifment/index.html`
    },
    {
        id: 'meltdown',
        name: 'MELTDOWN',
        category: 'Game Development',
        color: '#ef4444',
        tech: ['JavaScript', 'HTML5 Canvas', 'Android', 'Blender 3D'],
        description: 'An intense arcade game with physics-based mechanics and 3D Blender-rendered scenes. Features level management, mobile-first design, and was built with a custom Blender 3D scene.',
        status: 'Live',
        image: null,
        tags: ['Game', 'Mobile', '3D'],
        link: null
    },
    {
        id: 'sentimentpulse',
        name: 'SentimentPulse',
        category: 'AI / Mobile App',
        color: '#f59e0b',
        tech: ['React Native', 'Expo', 'AI/NLP', 'TypeScript'],
        description: 'A mobile sentiment analysis platform that reads emotional context from text, news, and social feeds in real-time. Aggregates sentiment scoring into a live pulse dashboard for brands and creators.',
        status: 'In Development',
        image: null,
        tags: ['AI', 'Mobile', 'NLP'],
        link: null
    },
    {
        id: 'mark',
        name: 'mARK',
        category: 'SaaS / Retail Platform',
        color: '#10b981',
        tech: ['JavaScript', 'Supabase', 'Vite', 'CSS', 'Chart.js'],
        description: 'Market Access & Retail Knowledge — bridging South Africa\'s informal retail supply chain gap. Full platform with marketplace, order desk, inventory, logistics, compliance advisor, community, business analytics and Supabase-backed data.',
        status: 'Beta',
        image: null,
        tags: ['SaaS', 'eCommerce', 'Dashboard'],
        link: null
    },
    {
        id: 'forge-builder',
        name: 'Forge Site Builder',
        category: 'SaaS / No-Code',
        color: '#8b5cf6',
        tech: ['Next.js', 'TypeScript', 'Prisma', 'Tailwind', 'NextAuth'],
        description: 'A multi-tenant no-code website builder with a drag-and-drop visual canvas, theme library, custom CSS studio, WhatsApp catalog automation, auctions, barter, checkout, ad studio and plugin system — exportable sites.',
        status: 'Beta',
        image: null,
        tags: ['SaaS', 'No-Code', 'Builder'],
        link: null
    },
    {
        id: 'student-connect',
        name: 'Student Connect',
        category: 'EdTech / Admin System',
        color: '#06b6d4',
        tech: ['PHP', 'MySQL', 'React', 'Node.js', 'Express', 'Material UI'],
        description: 'Full-stack student registration and academic management system with role-based auth (admin/student), dashboard analytics, course records, PDF report generation and prepared-statement security.',
        status: 'Live',
        image: null,
        tags: ['EdTech', 'Admin', 'Full-Stack'],
        link: null
    },
    {
        id: 'divi-wordpress',
        name: 'Divi WordPress Suite',
        category: 'WordPress Development',
        color: '#21759B',
        tech: ['WordPress', 'PHP', 'Divi Theme', 'CSS'],
        description: 'Custom Divi child themes and WordPress solutions built for client websites. Includes custom modules, layout packs, and WooCommerce integrations.',
        status: 'Deployed',
        image: null,
        tags: ['WordPress', 'Divi', 'PHP'],
        link: null
    },
    {
        id: 'teachers-pet',
        name: "Teacher's Pet",
        category: 'EdTech',
        color: '#8b5cf6',
        tech: ['React', 'Vite', 'JavaScript'],
        description: 'An interactive educational companion app for teachers featuring voice integration, game-based learning tools, and classroom management features.',
        status: 'Live',
        image: null,
        tags: ['EdTech', 'React', 'Education'],
        link: null
    },
    {
        id: 'clipping',
        name: 'CLIPPING Engine',
        category: 'AI Video Tool',
        color: '#06b6d4',
        tech: ['Python', 'Flask', 'Whisper', 'FFmpeg', 'Gemini', 'Groq'],
        description: 'AI video intelligence and viral shorts automation. Whisper word-level transcription, multimodal keyframe vision, multi-LLM directors (Gemini, Groq, OpenRouter, Ollama, Claude, DeepSeek), 9:16 cropping and burned-in subtitles.',
        status: 'Live',
        image: null,
        tags: ['AI', 'Python', 'Video'],
        link: null
    },
    {
        id: 'mzansi-voice',
        name: 'Mzansi Voice',
        category: 'Community Platform',
        color: '#ec4899',
        tech: ['HTML', 'JavaScript', 'CSS'],
        description: 'A South African community discussion and voice platform with topic management, charts/analytics, content moderation, and local language support.',
        status: 'Live',
        image: null,
        tags: ['Community', 'South Africa'],
        link: null
    },
    {
        id: 'study-buddy',
        name: 'Study Buddy',
        category: 'EdTech / PWA',
        color: '#10b981',
        tech: ['React', 'Firebase', 'AI', 'Electron'],
        description: 'A comprehensive AI-powered educational platform for collaborative learning, with PWA, Android, and Desktop (Electron) versions. Available on mobile and web.',
        status: 'Live',
        image: '/portfolio/project-studybuddy.png',
        tags: ['AI', 'PWA', 'Education'],
        link: 'https://corvexis.github.io/Corvexis/study-buddy/'
    },
    {
        id: 'acadamate',
        name: 'Acadamate',
        category: 'Academic Tools',
        color: '#8b5cf6',
        tech: ['React', 'AI/OCR', 'PDF.js'],
        description: 'Elite academic management platform with AI document tools, OCR scanning, assignment analysis, and study laboratory features.',
        status: 'Live',
        image: '/portfolio/project-acadamate.png',
        tags: ['AI', 'Academic', 'OCR'],
        link: 'https://corvexis.github.io/Corvexis/acadamate/'
    },
    {
        id: 'fluffy-jump',
        name: 'Fluffy Jump',
        category: 'Mobile Game',
        color: '#06b6d4',
        tech: ['React Native', 'Expo', 'JavaScript'],
        description: 'An addictive physics-based platform jumper for mobile. Fun cartoon character with procedurally generated levels.',
        status: 'Live',
        image: '/portfolio/project-fluffyjump.png',
        tags: ['Game', 'Mobile', 'React Native'],
        link: null
    },
    {
        id: 'neon-snake',
        name: 'Neon Snake 3D',
        category: 'Web Game',
        color: '#a855f7',
        tech: ['React', 'Three.js', 'JavaScript'],
        description: 'A futuristic 3D trivia-enhanced snake experience running in the browser. Features a React Three Fiber scene with tetris blocks and visual effects.',
        status: 'Live',
        image: '/portfolio/project-neonsnake.png',
        tags: ['Game', '3D', 'Three.js'],
        link: 'https://corvexis.github.io/Corvexis/snake-game/'
    },
    {
        id: 'ai-forex-bot',
        name: 'ICT AI Forex EA',
        category: 'AI / Trading',
        color: '#f59e0b',
        tech: ['MQL5', 'AI/ML', 'MetaTrader 5'],
        description: 'An AI-powered Expert Advisor (EA) for MetaTrader 5 implementing ICT (Inner Circle Trader) concepts including flag pattern recognition and automated trading signals.',
        status: 'Live',
        image: null,
        tags: ['AI', 'Trading', 'MQL5'],
        link: null
    }
]

const filters = [
    { label: 'All', value: 'all' },
    { label: 'SaaS', value: 'saas' },
    { label: 'Web', value: 'web' },
    { label: 'Mobile', value: 'mobile' },
    { label: 'AI', value: 'ai' },
    { label: 'Game', value: 'game' },
    { label: 'EdTech', value: 'edtech' },
    { label: 'WordPress', value: 'wordpress' }
]

function matchesFilter(project, filter) {
    if (filter === 'all') return true
    const haystack = [
        project.category,
        ...project.tags,
        ...project.tech
    ].map(s => s.toLowerCase()).join(' ')
    return haystack.includes(filter)
}

const statusColors = {
    'Live': '#10b981',
    'Beta': '#f59e0b',
    'In Development': '#94a3b8',
    'Deployed': '#22d3ee'
}

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.07
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
}

export default function Projects() {
    const [activeFilter, setActiveFilter] = useState('all')

    const filtered = projects.filter(p => matchesFilter(p, activeFilter))

    return (
        <motion.div
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="content-wrapper"
            style={{ padding: '8rem 2rem' }}
        >
            {/* Hero */}
            <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem' }}
                >
                    Our <span style={{ color: 'var(--neon-cyan)' }}>Projects</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '600px', margin: '0 auto' }}
                >
                    A full-service digital studio building games, AI tools, SaaS platforms, and mobile apps — all crafted in-house.
                </motion.p>
            </div>

            {/* Filter tabs */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                    marginBottom: '3rem'
                }}
            >
                {filters.map(f => (
                    <button
                        key={f.value}
                        onClick={() => setActiveFilter(f.value)}
                        style={{
                            padding: '0.5rem 1.4rem',
                            borderRadius: '999px',
                            border: activeFilter === f.value
                                ? '1px solid var(--neon-cyan)'
                                : '1px solid var(--glass-border)',
                            background: activeFilter === f.value
                                ? 'rgba(34,211,238,0.12)'
                                : 'var(--glass)',
                            color: activeFilter === f.value
                                ? 'var(--neon-cyan)'
                                : 'var(--text-secondary)',
                            fontWeight: activeFilter === f.value ? '700' : '400',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}
                    >
                        {f.label}
                    </button>
                ))}
            </motion.div>

            {/* Grid */}
            <motion.div
                key={activeFilter}
                variants={containerVariants}
                initial="hidden"
                animate="show"
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                    gap: '2rem'
                }}
            >
                {filtered.map(project => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </motion.div>

            {filtered.length === 0 && (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem 0' }}>
                    No projects match this filter yet.
                </div>
            )}
        </motion.div>
    )
}

function ProjectCard({ project }) {
    const statusColor = statusColors[project.status] || '#94a3b8'
    const hasLink = !!project.link
    const isInDev = project.status === 'In Development'

    return (
        <motion.div
            variants={cardVariants}
            whileHover={{ y: -8 }}
            style={{
                borderRadius: '20px',
                border: '1px solid var(--glass-border)',
                borderTop: `3px solid ${project.color}`,
                background: 'var(--glass)',
                backdropFilter: 'blur(12px)',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Subtle color gradient bg */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(ellipse at top left, ${project.color}08, transparent 60%)`,
                pointerEvents: 'none'
            }} />

            {/* Status badge */}
            <div style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: `${statusColor}20`,
                border: `1px solid ${statusColor}55`,
                color: statusColor,
                fontSize: '0.72rem',
                fontWeight: '700',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
            }}>
                {project.status}
            </div>

            {/* Category + Name */}
            <div style={{ paddingRight: '5.5rem' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    color: project.color,
                    fontSize: '0.78rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    marginBottom: '0.4rem'
                }}>
                    <Layers size={13} />
                    {project.category}
                </div>
                <h3 style={{
                    fontSize: '1.4rem',
                    fontWeight: '800',
                    color: 'var(--text-primary)',
                    margin: 0
                }}>
                    {project.name}
                </h3>
            </div>

            {/* Description */}
            <p style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: '1.6',
                margin: 0,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
            }}>
                {project.description}
            </p>

            {/* Tech stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {project.tech.map(t => (
                    <span key={t} style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'var(--text-secondary)',
                        fontSize: '0.75rem',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem'
                    }}>
                        <Code2 size={11} />
                        {t}
                    </span>
                ))}
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {project.tags.map(tag => (
                    <span key={tag} style={{
                        background: `${project.color}18`,
                        border: `1px solid ${project.color}33`,
                        color: project.color,
                        fontSize: '0.73rem',
                        fontWeight: '600',
                        padding: '0.2rem 0.65rem',
                        borderRadius: '999px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                    }}>
                        <Zap size={10} />
                        {tag}
                    </span>
                ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: 'auto', paddingTop: '0.5rem' }}>
                <a
                    href={hasLink ? project.link : undefined}
                    target={hasLink ? '_blank' : undefined}
                    rel={hasLink ? 'noopener noreferrer' : undefined}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        width: '100%',
                        padding: '0.75rem 1rem',
                        borderRadius: '12px',
                        border: hasLink
                            ? `1px solid ${project.color}`
                            : '1px solid rgba(255,255,255,0.1)',
                        background: hasLink
                            ? `${project.color}20`
                            : 'rgba(255,255,255,0.03)',
                        color: hasLink ? project.color : 'var(--text-secondary)',
                        fontWeight: '700',
                        fontSize: '0.88rem',
                        textDecoration: 'none',
                        cursor: hasLink ? 'pointer' : 'default',
                        opacity: hasLink ? 1 : 0.5,
                        transition: 'background 0.2s, opacity 0.2s',
                        pointerEvents: hasLink ? 'auto' : 'none'
                    }}
                >
                    <ExternalLink size={15} />
                    {isInDev ? 'In Development' : hasLink ? 'View Project' : 'View Project'}
                </a>
            </div>
        </motion.div>
    )
}
