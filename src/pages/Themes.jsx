import { useRef, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, RoundedBox, Edges, Environment } from '@react-three/drei'
import { ArrowRight, Sparkles, Layers, Palette, MousePointer2 } from 'lucide-react'

// ─── Theme data lives in themes/themeData.js and is applied site-wide ────────
import { THEMES } from '../themes/themeData'
import { useTheme } from '../context/ThemeContext'

// ─── 3D object per theme ──────────────────────────────────────────────────────
function ThemeObject({ variant, palette }) {
    const ref = useRef()

    useFrame((state, delta) => {
        if (!ref.current) return
        const t = state.clock.elapsedTime
        if (variant === 'aurora') {
            ref.current.rotation.y += delta * 0.35
            ref.current.rotation.x = Math.sin(t * 0.4) * 0.3
        } else if (variant === 'monolith') {
            ref.current.rotation.y = t * 0.5
            ref.current.rotation.x = 0.35
        } else if (variant === 'solaris') {
            ref.current.rotation.y += delta * 0.2
            ref.current.rotation.z = Math.sin(t * 0.3) * 0.15
        } else if (variant === 'obsidian') {
            ref.current.rotation.y += delta * 0.4
            ref.current.rotation.x += delta * 0.12
        } else if (variant === 'paper') {
            ref.current.rotation.y = Math.sin(t * 0.5) * 0.5
            ref.current.rotation.x = Math.sin(t * 0.3) * 0.15
        }
    })

    return (
        <>
            <ambientLight intensity={variant === 'paper' ? 1.1 : 0.5} />
            <directionalLight position={[4, 6, 5]} intensity={variant === 'paper' ? 1.6 : 1.2} color="#ffffff" />
            <pointLight position={[-5, -2, 3]} intensity={2.4} color={palette.accent} />
            <pointLight position={[5, 3, -2]} intensity={1.4} color={palette.accent2} />

            <Float speed={1.6} rotationIntensity={0.25} floatIntensity={0.8}>
                {variant === 'aurora' && (
                    <mesh ref={ref} scale={1.15}>
                        <icosahedronGeometry args={[1, 5]} />
                        <MeshDistortMaterial
                            color={palette.accent}
                            distort={0.38}
                            speed={2.2}
                            roughness={0.08}
                            metalness={0.75}
                            emissive={palette.accent2}
                            emissiveIntensity={0.25}
                        />
                    </mesh>
                )}

                {variant === 'monolith' && (
                    <mesh ref={ref}>
                        <boxGeometry args={[1.5, 1.5, 1.5]} />
                        <meshStandardMaterial color="#141414" metalness={0.9} roughness={0.25} />
                        <Edges threshold={15} color="#ffffff" />
                    </mesh>
                )}

                {variant === 'solaris' && (
                    <mesh ref={ref} scale={1.05}>
                        <torusKnotGeometry args={[0.72, 0.24, 220, 32]} />
                        <meshStandardMaterial
                            color={palette.accent}
                            metalness={0.6}
                            roughness={0.18}
                            emissive={palette.accent2}
                            emissiveIntensity={0.18}
                        />
                    </mesh>
                )}

                {variant === 'obsidian' && (
                    <mesh ref={ref}>
                        <icosahedronGeometry args={[1.25, 1]} />
                        <meshBasicMaterial color={palette.accent} wireframe transparent opacity={0.85} />
                    </mesh>
                )}

                {variant === 'paper' && (
                    <group ref={ref}>
                        {[0, 1, 2].map((i) => (
                            <RoundedBox
                                key={i}
                                args={[2.1, 0.16, 2.9]}
                                radius={0.09}
                                smoothness={4}
                                position={[0, i * 0.22 - 0.25, i * -0.06]}
                                rotation={[0, i * 0.16 - 0.12, 0]}
                            >
                                <meshStandardMaterial color="#ffffff" roughness={0.9} metalness={0} />
                                <Edges threshold={15} color="#d8d2c4" />
                            </RoundedBox>
                        ))}
                    </group>
                )}
            </Float>
        </>
    )
}

// ─── Live website mock, styled per theme ──────────────────────────────────────
function SiteMock({ theme }) {
    const p = theme.palette

    const baseStyle = {
        position: 'relative',
        overflow: 'hidden',
        background: p.bg,
        color: p.fg,
        fontFamily: theme.font,
        borderRadius: theme.radius,
        border: `1px solid ${p.line}`,
        padding: 'clamp(1.25rem, 3vw, 2.25rem)',
        minHeight: 'clamp(340px, 46vw, 440px)',
        display: 'flex',
        flexDirection: 'column',
        transformPerspective: '900px',
        boxShadow: theme.id === 'paper' ? '0 30px 60px -20px rgba(0,0,0,0.35)' : 'none'
    }

    const motionProps =
        theme.id === 'aurora'
            ? {
                initial: { opacity: 0, y: 22, filter: 'blur(14px)' },
                animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
                transition: { duration: 0.8, ease: 'easeOut' }
            }
            : theme.id === 'monolith'
                ? {
                    initial: { clipPath: 'inset(0 100% 0 0)' },
                    animate: { clipPath: 'inset(0 0% 0 0)' },
                    transition: { duration: 0.9, ease: [0.85, 0, 0.15, 1] }
                }
                : theme.id === 'solaris'
                    ? {
                        initial: { opacity: 0, y: 46 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 1.1, ease: 'easeOut' }
                    }
                    : theme.id === 'obsidian'
                        ? {
                            initial: { opacity: 0 },
                            animate: { opacity: 1 },
                            transition: { duration: 0.4 }
                        }
                        : {
                            initial: { opacity: 0, rotateX: -20, y: 26 },
                            animate: { opacity: 1, rotateX: 0, y: 0 },
                            transition: { duration: 0.85, ease: 'easeOut' }
                        }

    const Nav = (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingBottom: '1rem', borderBottom: `1px solid ${p.line}`, marginBottom: '1.6rem'
        }}>
            <span style={{
                fontWeight: 800, letterSpacing: theme.id === 'obsidian' ? '0.02em' : '0.14em',
                textTransform: theme.id === 'monolith' || theme.id === 'obsidian' ? 'uppercase' : 'none',
                fontSize: theme.id === 'monolith' ? '0.85rem' : '0.95rem'
            }}>
                {theme.id === 'obsidian' ? '~/corvexis' : 'CORVEXIS'}
            </span>
            <div style={{ display: 'flex', gap: '0.9rem', alignItems: 'center' }}>
                {(theme.id === 'obsidian' ? ['work', 'build', 'contact'] : ['Work', 'Studio', 'Contact']).map((n) => (
                    <span key={n} style={{
                        fontSize: '0.72rem', color: p.muted,
                        letterSpacing: theme.id === 'monolith' ? '0.12em' : '0.02em',
                        textTransform: theme.id === 'monolith' ? 'uppercase' : 'none'
                    }}>{n}</span>
                ))}
                <span style={{
                    fontSize: '0.7rem', fontWeight: 700,
                    padding: '0.28rem 0.7rem',
                    borderRadius: theme.id === 'monolith' ? '0' : '999px',
                    background: theme.id === 'paper' ? p.accent : `${p.accent}1f`,
                    color: theme.id === 'paper' ? '#fff' : p.accent,
                    border: theme.id === 'paper' ? 'none' : `1px solid ${p.accent}44`
                }}>
                    {theme.id === 'obsidian' ? 'run' : 'Start'}
                </span>
            </div>
        </div>
    )

    if (theme.id === 'obsidian') {
        const lines = [
            '$ corvexis deploy --theme obsidian',
            '> compiling interface ...',
            '> motion: typewriter.stagger',
            '> status: ready',
        ]
        return (
            <motion.div {...motionProps} style={baseStyle}>
                {Nav}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.35rem' }}>
                    <div style={{ fontSize: 'clamp(1.3rem, 3.4vw, 2rem)', fontWeight: 700, marginBottom: '0.6rem' }}>
                        Ship<span style={{ color: p.accent }}>_</span>faster
                    </div>
                    {lines.map((l, i) => (
                        <motion.div
                            key={l}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + i * 0.18 }}
                            style={{ fontSize: '0.72rem', color: i === 3 ? p.accent : p.muted }}
                        >
                            {l}
                        </motion.div>
                    ))}
                </div>
                <div style={{
                    marginTop: '1.2rem', paddingTop: '0.9rem', borderTop: `1px solid ${p.line}`,
                    fontSize: '0.68rem', color: p.muted, letterSpacing: '0.08em'
                }}>
                    ENGINEERED · MINIMAL · REAL
                </div>
            </motion.div>
        )
    }

    if (theme.id === 'paper') {
        return (
            <motion.div {...motionProps} style={baseStyle}>
                {Nav}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ fontSize: '0.66rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: p.accent2, fontWeight: 700 }}>
                        Studio Notes · 05
                    </span>
                    <h3 style={{ fontSize: 'clamp(1.7rem, 4.6vw, 2.7rem)', lineHeight: 1.05, margin: '0.7rem 0', fontWeight: 800, letterSpacing: '-0.02em' }}>
                        Design that reads like paper.
                    </h3>
                    <p style={{ color: p.muted, fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '34ch' }}>
                        Cream surfaces, honest shadows and typographic rhythm — clarity first, decoration never.
                    </p>
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.3rem' }}>
                        <span style={{ background: p.accent, color: '#fff', padding: '0.6rem 1.1rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 700 }}>
                            Read issue
                        </span>
                        <span style={{ border: `1px solid ${p.line}`, color: p.fg, padding: '0.6rem 1.1rem', borderRadius: '8px', fontSize: '0.78rem', fontWeight: 600 }}>
                            Archive
                        </span>
                    </div>
                </div>
            </motion.div>
        )
    }

    // aurora / monolith / solaris — marketing hero
    const headline = {
        aurora: 'Light, depth, motion.',
        monolith: 'LESS, BUT BETTER.',
        solaris: 'Warmth in every pixel.'
    }[theme.id]

    return (
        <motion.div {...motionProps} style={baseStyle}>
            {theme.id === 'aurora' && (
                <div style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none',
                    background: `radial-gradient(ellipse 60% 50% at 80% 0%, ${p.accent}22, transparent 60%), radial-gradient(ellipse 50% 50% at 0% 100%, ${p.accent2}1f, transparent 60%)`
                }} />
            )}
            <div style={{ position: 'relative' }}>
                {Nav}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '0.4rem' }}>
                    <span style={{
                        fontSize: '0.64rem', letterSpacing: '0.22em', textTransform: 'uppercase',
                        color: p.accent, fontWeight: 700, marginBottom: '0.8rem'
                    }}>
                        {theme.id === 'monolith' ? '01 — Identity' : 'Digital Studio'}
                    </span>
                    <h3 style={{
                        fontSize: theme.id === 'monolith' ? 'clamp(1.9rem, 6vw, 3.4rem)' : 'clamp(1.7rem, 4.8vw, 2.8rem)',
                        lineHeight: theme.id === 'monolith' ? 0.98 : 1.06,
                        margin: '0 0 0.9rem', fontWeight: theme.id === 'monolith' ? 800 : 700,
                        letterSpacing: theme.id === 'monolith' ? '-0.03em' : '-0.01em',
                        color: theme.id === 'aurora' ? p.fg : undefined,
                        background: theme.id === 'aurora' ? `linear-gradient(100deg, ${p.fg}, ${p.accent})` : undefined,
                        WebkitBackgroundClip: theme.id === 'aurora' ? 'text' : undefined,
                        WebkitTextFillColor: theme.id === 'aurora' ? 'transparent' : undefined
                    }}>
                        {headline}
                    </h3>
                    <p style={{ color: p.muted, fontSize: '0.86rem', lineHeight: 1.65, maxWidth: '36ch' }}>
                        {theme.aesthetic}
                    </p>
                    <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.4rem', flexWrap: 'wrap' }}>
                        <span style={{
                            background: theme.id === 'monolith' ? '#ffffff' : p.accent,
                            color: theme.id === 'monolith' ? '#000' : '#02121a',
                            padding: '0.62rem 1.2rem',
                            borderRadius: theme.id === 'monolith' ? '0' : '999px',
                            fontSize: '0.78rem', fontWeight: 700
                        }}>
                            Get started
                        </span>
                        <span style={{
                            border: `1px solid ${p.line}`, color: p.fg,
                            padding: '0.62rem 1.2rem',
                            borderRadius: theme.id === 'monolith' ? '0' : '999px',
                            fontSize: '0.78rem', fontWeight: 600
                        }}>
                            View work
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

// ─── CSS 3D object for the small cards ────────────────────────────────────────
const cssKeyframes = `
@keyframes tl-float { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
@keyframes tl-spin { from { transform: rotate3d(1,1,0,0deg) } to { transform: rotate3d(1,1,0,360deg) } }
@keyframes tl-wobble { 0%,100% { transform: rotateZ(-6deg) } 50% { transform: rotateZ(6deg) } }
@keyframes tl-flip { 0%,100% { transform: rotateX(-12deg) rotateY(-14deg) } 50% { transform: rotateX(-6deg) rotateY(14deg) } }
@keyframes tl-orbit { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
`

function Css3D({ theme }) {
    const p = theme.palette
    const wrap = {
        width: '76px', height: '76px',
        perspective: '500px',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
    }

    if (theme.id === 'monolith') {
        return (
            <div style={wrap}>
                <div style={{
                    width: '46px', height: '46px',
                    transformStyle: 'preserve-3d',
                    animation: 'tl-spin 9s linear infinite',
                    position: 'relative'
                }}>
                    {[
                        'rotateY(0deg) translateZ(23px)',
                        'rotateY(90deg) translateZ(23px)',
                        'rotateY(180deg) translateZ(23px)',
                        'rotateY(270deg) translateZ(23px)',
                        'rotateX(90deg) translateZ(23px)',
                        'rotateX(-90deg) translateZ(23px)'
                    ].map((t, i) => (
                        <div key={i} style={{
                            position: 'absolute', inset: 0,
                            border: '1px solid rgba(255,255,255,0.6)',
                            background: 'rgba(255,255,255,0.03)',
                            transform: t
                        }} />
                    ))}
                </div>
            </div>
        )
    }

    if (theme.id === 'solaris') {
        return (
            <div style={wrap}>
                <div style={{
                    width: '54px', height: '54px', borderRadius: '50%',
                    border: `3px solid ${p.accent}`,
                    borderTopColor: 'transparent', borderRightColor: p.accent2,
                    animation: 'tl-orbit 6s linear infinite',
                    boxShadow: `0 0 24px ${p.accent}55`
                }} />
            </div>
        )
    }

    if (theme.id === 'obsidian') {
        return (
            <div style={wrap}>
                <div style={{
                    width: '48px', height: '48px',
                    border: `1px solid ${p.accent}`,
                    transformStyle: 'preserve-3d',
                    animation: 'tl-spin 11s linear infinite',
                    position: 'relative',
                    boxShadow: `inset 0 0 18px ${p.accent}44`
                }}>
                    {[
                        'rotateY(0deg) translateZ(24px)',
                        'rotateY(90deg) translateZ(24px)',
                        'rotateX(90deg) translateZ(24px)'
                    ].map((t, i) => (
                        <div key={i} style={{
                            position: 'absolute', inset: 0,
                            border: `1px solid ${p.accent}77`,
                            transform: t
                        }} />
                    ))}
                </div>
            </div>
        )
    }

    if (theme.id === 'paper') {
        return (
            <div style={wrap}>
                <div style={{ position: 'relative', transformStyle: 'preserve-3d', animation: 'tl-flip 7s ease-in-out infinite' }}>
                    {[0, 1, 2].map((i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: '52px', height: '38px',
                            left: `${i * 3}px`, top: `${i * 5}px`,
                            background: '#ffffff',
                            border: '1px solid #ded8ca',
                            borderRadius: '6px',
                            boxShadow: '0 6px 14px rgba(0,0,0,0.12)',
                            transform: `translateZ(${i * 10}px)`
                        }} />
                    ))}
                </div>
            </div>
        )
    }

    // aurora — glowing orb
    return (
        <div style={wrap}>
            <div style={{
                width: '52px', height: '52px', borderRadius: '50%',
                background: `radial-gradient(circle at 32% 28%, #ffffff, ${p.accent} 42%, ${p.accent2} 100%)`,
                boxShadow: `0 0 30px ${p.accent}66`,
                animation: 'tl-float 4s ease-in-out infinite'
            }} />
        </div>
    )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Themes() {
    const navigate = useNavigate()
    // Selecting a theme applies it to the entire site via ThemeContext
    const { themeId: activeId, theme: active, setTheme } = useTheme()

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ padding: 'clamp(6rem, 10vh, 8rem) clamp(1rem, 4vw, 2rem) 5rem', maxWidth: '1280px', margin: '0 auto' }}
        >
            <style>{cssKeyframes}</style>

            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    background: 'rgba(34,211,238,0.08)', border: '1px solid rgba(34,211,238,0.25)',
                    borderRadius: '100px', padding: '5px 16px', marginBottom: '1.2rem',
                    color: 'var(--neon-cyan)', fontSize: '11px', fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase'
                }}>
                    <Sparkles size={12} /> Design Lab
                </div>
                <h1 style={{
                    fontSize: 'clamp(2rem, 6vw, 4rem)', marginBottom: '1rem',
                    background: 'none', WebkitTextFillColor: 'initial', color: 'var(--text-primary)'
                }}>
                    Five themes. <span style={{ color: 'var(--neon-cyan)' }}>Infinite</span> expression.
                </h1>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '620px', margin: '0 auto', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', lineHeight: 1.7 }}>
                    Minimal systems with real 3D elements. Each theme pairs a distinct palette with its own motion language —
                    switch between them and watch the interface rebuild itself.
                </p>
            </div>

            {/* Selector */}
            <div style={{
                display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem'
            }}>
                {THEMES.map((t) => {
                    const isActive = t.id === activeId
                    return (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                padding: '0.5rem 1rem', borderRadius: '100px',
                                border: `1px solid ${isActive ? t.palette.accent : 'rgba(255,255,255,0.12)'}`,
                                background: isActive ? `${t.palette.accent}1a` : 'rgba(255,255,255,0.03)',
                                color: isActive ? t.palette.accent : 'var(--text-secondary)',
                                fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer',
                                transition: 'all 0.2s', minHeight: 'auto'
                            }}
                        >
                            <span style={{
                                width: '10px', height: '10px', borderRadius: '50%',
                                background: t.palette.accent, boxShadow: `0 0 8px ${t.palette.accent}`
                            }} />
                            {t.name}
                        </button>
                    )
                })}
            </div>

            {/* Stage */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
                gap: 'clamp(1rem, 2.5vw, 2rem)',
                alignItems: 'stretch',
                marginBottom: 'clamp(2.5rem, 5vw, 4rem)'
            }} className="theme-stage">
                {/* 3D half */}
                <div style={{
                    position: 'relative',
                    borderRadius: '24px',
                    border: '1px solid var(--glass-border)',
                    background: `radial-gradient(ellipse at 50% 30%, ${active.palette.accent}14, #05070d 70%)`,
                    overflow: 'hidden',
                    minHeight: 'clamp(320px, 44vw, 440px)'
                }}>
                    <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
                        <Suspense fallback={null}>
                            <ThemeObject variant={active.id} palette={active.palette} />
                            <Environment preset="city" />
                        </Suspense>
                    </Canvas>
                    <div style={{
                        position: 'absolute', bottom: '1rem', left: '1.1rem',
                        fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase',
                        color: 'rgba(255,255,255,0.4)', fontWeight: 700
                    }}>
                        3D Element · {active.name}
                    </div>
                </div>

                {/* Mock half */}
                <div>
                    <AnimatePresence mode="wait">
                        <SiteMock key={active.id} theme={active} />
                    </AnimatePresence>
                </div>
            </div>

            {/* Theme detail row */}
            <div style={{
                display: 'flex', gap: '1rem', flexWrap: 'wrap',
                justifyContent: 'space-between', alignItems: 'center',
                padding: '1.1rem 1.4rem', marginBottom: '3rem',
                borderRadius: '16px', border: '1px solid var(--glass-border)',
                background: 'var(--glass)'
            }}>
                {[
                    { icon: Palette, label: 'Motion', value: active.motion },
                    { icon: Layers, label: 'Radius', value: active.radius },
                    { icon: MousePointer2, label: 'Pairing', value: active.tagline }
                ].map(({ icon: Icon, label, value }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <Icon size={16} color={active.palette.accent} />
                        <div>
                            <div style={{ fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{label}</div>
                            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{value}</div>
                        </div>
                    </div>
                ))}
                <div style={{ display: 'flex', gap: '0.35rem' }}>
                    {[active.palette.bg, active.palette.accent, active.palette.accent2, active.palette.fg].map((c, i) => (
                        <span key={i} title={c} style={{
                            width: '22px', height: '22px', borderRadius: '6px',
                            background: c, border: '1px solid rgba(255,255,255,0.18)'
                        }} />
                    ))}
                </div>
            </div>

            {/* All themes grid */}
            <h2 style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', color: 'var(--text-primary)',
                marginBottom: '1.5rem', textTransform: 'none', letterSpacing: 'normal'
            }}>
                The collection
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
                gap: '1.25rem'
            }}>
                {THEMES.map((t) => {
                    const isActive = t.id === activeId
                    return (
                        <motion.button
                            key={t.id}
                            onClick={() => {
                                setTheme(t.id)
                                window.scrollTo({ top: 260, behavior: 'smooth' })
                            }}
                            whileHover={{ y: -6 }}
                            style={{
                                textAlign: 'left', cursor: 'pointer',
                                padding: '1.25rem',
                                borderRadius: '18px',
                                border: `1px solid ${isActive ? t.palette.accent : 'var(--glass-border)'}`,
                                background: `linear-gradient(150deg, ${t.palette.accent}0d, rgba(255,255,255,0.02))`,
                                display: 'flex', flexDirection: 'column', gap: '0.6rem',
                                minHeight: 'auto'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Css3D theme={t} />
                                {isActive && (
                                    <span style={{
                                        fontSize: '9px', fontWeight: 700, letterSpacing: '0.12em',
                                        color: t.palette.accent, border: `1px solid ${t.palette.accent}55`,
                                        padding: '2px 8px', borderRadius: '100px', textTransform: 'uppercase'
                                    }}>
                                        Active
                                    </span>
                                )}
                            </div>
                            <div>
                                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>{t.name}</div>
                                <div style={{ fontSize: '0.78rem', color: t.palette.accent, fontWeight: 600 }}>{t.tagline}</div>
                            </div>
                            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.55, margin: 0 }}>
                                {t.aesthetic}
                            </p>
                            <div style={{
                                fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase',
                                color: 'rgba(255,255,255,0.35)', fontWeight: 700, marginTop: 'auto'
                            }}>
                                {t.motion}
                            </div>
                        </motion.button>
                    )
                })}
            </div>

            {/* CTA */}
            <div style={{
                marginTop: 'clamp(3rem, 6vw, 4.5rem)',
                borderRadius: '24px',
                border: '1px solid var(--glass-border)',
                background: 'linear-gradient(135deg, rgba(34,211,238,0.08), rgba(168,85,247,0.08))',
                padding: 'clamp(2rem, 5vw, 3rem)',
                textAlign: 'center'
            }}>
                <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2.2rem)', color: 'var(--text-primary)', marginBottom: '0.7rem', textTransform: 'none', letterSpacing: 'normal' }}>
                    Applied to real products, not just concepts.
                </h2>
                <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 1.6rem', fontSize: '0.95rem', lineHeight: 1.65 }}>
                    These systems run in production — from the mARK retail platform and Student Connect academic suite
                    to the CLIPPING AI video engine and the Forge site builder.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/projects')}
                        style={{
                            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.75rem 1.6rem', borderRadius: '10px', border: 'none',
                            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                            color: '#fff', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer'
                        }}
                    >
                        Explore Projects <ArrowRight size={16} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => navigate('/services')}
                        style={{
                            padding: '0.75rem 1.6rem', borderRadius: '10px',
                            border: '1px solid rgba(168,85,247,0.5)', background: 'transparent',
                            color: '#c4b5fd', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer'
                        }}
                    >
                        Start a project
                    </motion.button>
                </div>
            </div>
        </motion.div>
    )
}
