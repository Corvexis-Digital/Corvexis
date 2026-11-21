import { useRef, Suspense } from 'react'
import { motion } from 'framer-motion'
import { Globe, Phone, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial, useGLTF } from '@react-three/drei'

// Preload Blender-generated models
const MODEL_PATHS = {
  wordpress: '/models/wordpress-logo.glb',
  twilio: '/models/tech-chip.glb',
  payments: '/models/payment-card.glb',
}

function BlenderModel({ path, color }) {
  const ref = useRef()
  let result = null
  try { result = useGLTF(path) } catch { result = null }
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.5
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.3) * 0.2
    }
  })
  if (!result) return null
  return <primitive ref={ref} object={result.scene} scale={0.8} />
}

// ─── 3D Animated Shape ───────────────────────────────────────────────────────
function AnimatedShape({ color, geometry }) {
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.elapsedTime
      meshRef.current.rotation.x = t * 0.4
      meshRef.current.rotation.y = t * 0.6
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        {geometry === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
        {geometry === 'torus' && <torusGeometry args={[0.8, 0.35, 16, 60]} />}
        {geometry === 'octahedron' && <octahedronGeometry args={[1, 1]} />}
        <MeshDistortMaterial
          color={color}
          distort={0.35}
          speed={3}
          roughness={0.1}
          metalness={0.8}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

function ShapeCanvas({ color, geometry, modelKey }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 50 }}
      style={{ height: '200px', width: '100%', borderRadius: '10px' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color={color} />
      <pointLight position={[-5, -5, -5]} intensity={0.6} color="#ffffff" />
      <Suspense fallback={
        <AnimatedShape color={color} geometry={geometry} />
      }>
        <BlenderModel path={MODEL_PATHS[modelKey]} color={color} />
      </Suspense>
    </Canvas>
  )
}

// ─── Integration Cards Data ──────────────────────────────────────────────────
const integrations = [
  {
    id: 'wordpress',
    color: '#21759B',
    glowColor: 'rgba(33,117,155,0.25)',
    borderColor: 'rgba(33,117,155,0.35)',
    icon: Globe,
    geometry: 'sphere',
    modelKey: 'wordpress',
    title: 'WordPress & WooCommerce',
    description:
      'Full-stack WordPress development including custom themes (Divi), plugins, WooCommerce stores, and headless CMS solutions. We build fast, SEO-optimized WordPress sites.',
    features: [
      'Custom Divi Themes',
      'WooCommerce Stores',
      'Plugin Development',
      'Headless WordPress',
      'SEO Optimization',
    ],
  },
  {
    id: 'twilio',
    color: '#F22F46',
    glowColor: 'rgba(242,47,70,0.22)',
    borderColor: 'rgba(242,47,70,0.35)',
    icon: Phone,
    geometry: 'torus',
    modelKey: 'twilio',
    title: 'Twilio Communications',
    description:
      "SMS/WhatsApp automation, voice calls, 2FA OTP systems, and customer notification pipelines powered by Twilio's cloud communications platform.",
    features: [
      'SMS & WhatsApp API',
      'Voice Calls',
      'OTP / 2FA Systems',
      'Automated Notifications',
      'Chatbot Integration',
    ],
  },
  {
    id: 'payments',
    color: '#635BFF',
    glowColor: 'rgba(99,91,255,0.22)',
    borderColor: 'rgba(99,91,255,0.35)',
    icon: CreditCard,
    geometry: 'octahedron',
    modelKey: 'payments',
    title: 'Payment Gateway Integration',
    description:
      'Secure payment processing with Stripe, PayFast (South Africa), and other major gateways. Subscription billing, one-time payments, and multi-currency support.',
    features: [
      'Stripe Payments',
      'PayFast (ZAR)',
      'Subscription Billing',
      'Multi-currency',
      'Secure Checkout',
    ],
  },
]

// ─── Stats Data ───────────────────────────────────────────────────────────────
const stats = [
  { label: 'WordPress Sites', value: '50+' },
  { label: 'SMS Sent', value: '10K+' },
  { label: 'Processed', value: 'R2M+' },
  { label: 'Uptime', value: '99.9%' },
]

// ─── Integration Card ─────────────────────────────────────────────────────────
function IntegrationCard({ integration, index }) {
  const { color, glowColor, borderColor, icon: Icon, geometry, modelKey, title, description, features } = integration

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: 'easeOut' }}
      whileHover={{ y: -8, boxShadow: `0 24px 60px ${glowColor}` }}
      style={{
        background: 'var(--glass)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: `1px solid ${borderColor}`,
        borderRadius: '20px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        cursor: 'default',
      }}
    >
      {/* Top glow accent */}
      <div style={{
        height: '3px',
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      }} />

      {/* 3D Canvas */}
      <div style={{
        background: `radial-gradient(ellipse at center, ${glowColor} 0%, var(--hero-bg) 70%)`,
        padding: '8px 8px 0',
      }}>
        <ShapeCanvas color={color} geometry={geometry} modelKey={modelKey} />
      </div>

      {/* Card body */}
      <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Icon + Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
          <div style={{
            width: '44px', height: '44px',
            borderRadius: '12px',
            background: `${color}22`,
            border: `1px solid ${color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Icon size={20} color={color} />
          </div>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 700,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: 1.2,
          }}>
            {title}
          </h3>
        </div>

        {/* Description */}
        <p style={{
          fontSize: '14px',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          margin: '0 0 24px 0',
          flex: 1,
        }}>
          {description}
        </p>

        {/* Features */}
        <ul style={{ listStyle: 'none', margin: '0 0 24px 0', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {features.map((feature) => (
            <li key={feature} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle2 size={15} color={color} style={{ flexShrink: 0 }} />
              <span style={{ fontSize: '14px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* Learn more link */}
        <motion.div
          whileHover={{ x: 4 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: color,
            fontSize: '13px',
            fontWeight: 700,
            cursor: 'pointer',
            userSelect: 'none',
            letterSpacing: '0.03em',
            transition: 'color 0.2s',
          }}
        >
          Learn More <ArrowRight size={14} />
        </motion.div>
      </div>
    </motion.div>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function IntegrationsSection() {
  return (
    <section style={{
      background: 'var(--hero-bg)',
      padding: 'clamp(60px, 8vw, 120px) clamp(20px, 5vw, 80px)',
      position: 'relative',
      overflow: 'hidden',
      transition: 'background 0.4s ease',
    }}>
      {/* Background glows */}
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '800px', height: '400px',
        background: 'radial-gradient(ellipse at center, rgba(6,182,212,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '500px', height: '500px',
        background: 'radial-gradient(ellipse at center, rgba(99,91,255,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Section header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(40px, 6vw, 80px)', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(6,182,212,0.08)',
            border: '1px solid rgba(6,182,212,0.25)',
            borderRadius: '100px',
            padding: '5px 16px',
            color: 'var(--neon-cyan)',
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: '14px' }}>&lt;/&gt;</span>
          Integrations
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontSize: 'clamp(28px, 4.5vw, 54px)',
            fontWeight: 900,
            color: 'var(--text-primary)',
            margin: '0 0 16px 0',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Powerful{' '}
          <span style={{ color: 'var(--neon-cyan)', textShadow: '0 0 24px rgba(6,182,212,0.4)' }}>
            Integrations
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: 'clamp(14px, 1.6vw, 18px)',
            color: 'var(--text-secondary)',
            margin: '0 auto',
            maxWidth: '560px',
            lineHeight: 1.7,
          }}
        >
          We connect your business with industry-leading platforms
        </motion.p>
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
        gap: '24px',
        maxWidth: '1200px',
        margin: '0 auto 80px',
        position: 'relative',
      }}>
        {integrations.map((integration, index) => (
          <IntegrationCard key={integration.id} integration={integration} index={index} />
        ))}
      </div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: 'var(--glass)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '16px',
          padding: 'clamp(20px, 3vw, 36px) clamp(24px, 4vw, 60px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '24px',
          position: 'relative',
        }}
      >
        {/* Dividers between stats */}
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            style={{
              textAlign: 'center',
              borderRight: index < stats.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              paddingRight: index < stats.length - 1 ? '24px' : 0,
            }}
          >
            <div style={{
              fontSize: 'clamp(24px, 3vw, 36px)',
              fontWeight: 900,
              color: '#06b6d4',
              lineHeight: 1,
              marginBottom: '6px',
              textShadow: '0 0 20px rgba(6,182,212,0.4)',
            }}>
              {stat.value}
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--text-secondary)',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
