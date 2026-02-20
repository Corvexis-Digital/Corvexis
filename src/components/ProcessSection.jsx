import { motion } from 'framer-motion'
import { Lightbulb, PenTool, Code, CheckCircle, Zap } from 'lucide-react'
import TechAnimation from './TechAnimation'

export default function ProcessSection() {
    const steps = [
        {
            icon: Lightbulb,
            title: "Concept",
            description: "We dive deep into your vision to understand the core objective.",
            color: "var(--neon-purple)"
        },
        {
            icon: PenTool,
            title: "Design",
            description: "Crafting a futuristic aesthetic that aligns with your brand identity.",
            color: "var(--neon-cyan)"
        },
        {
            icon: Code,
            title: "Develop",
            description: "Implementing cutting-edge technology to bring the design to life.",
            color: "var(--neon-purple)"
        },
        {
            icon: CheckCircle,
            title: "Impact",
            description: "Launching the final product and ensuring peak performance.",
            color: "var(--neon-cyan)"
        }
    ]

    return (
        <section id="process">
            <div className="content-wrapper">
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                    <TechAnimation type="zap" size={150} color="var(--neon-purple)" />
                </div>
                <h2 style={{ fontSize: '3.5rem', textAlign: 'center', marginBottom: '5rem' }}>
                    Our <span style={{ color: 'var(--neon-purple)' }}>Symphony</span> of Creation
                </h2>

                <div style={{ position: 'relative' }}>
                    {/* Vertical Line */}
                    <div style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: 'linear-gradient(to bottom, var(--neon-purple), var(--neon-cyan))',
                        transform: 'translateX(-50%)',
                        opacity: 0.3
                    }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
                                }}
                            >
                                {/* Content Side */}
                                <div style={{ width: '45%', textAlign: index % 2 === 0 ? 'right' : 'left' }}>
                                    <h3 style={{ fontSize: '2rem', color: step.color }}>{step.title}</h3>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginTop: '0.5rem' }}>
                                        {step.description}
                                    </p>
                                </div>

                                {/* Center Icon */}
                                <div style={{
                                    width: '10%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    zIndex: 2,
                                    position: 'relative'
                                }}>
                                    <div className="glass" style={{
                                        width: '60px',
                                        height: '60px',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        border: `2px solid ${step.color}`,
                                        borderRadius: '50%',
                                        background: 'var(--bg-dark)'
                                    }}>
                                        <step.icon color={step.color} size={30} />
                                    </div>
                                </div>

                                {/* Empty Side for Spacing */}
                                <div style={{ width: '45%' }} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
