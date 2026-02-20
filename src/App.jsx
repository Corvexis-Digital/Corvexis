import { Suspense } from 'react'
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'
import Home from './pages/Home'
import Services from './pages/Services'
import AppHub from './pages/AppHub'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/hub" element={<AppHub />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Router>
      <main style={{ position: 'relative', minHeight: '100vh', background: 'var(--bg-dark)' }}>
        <CustomCursor />
        <Navbar />

        <AnimatedRoutes />

        <footer style={{ padding: '6rem 2rem', textAlign: 'center', borderTop: '1px solid var(--glass-border)', background: 'var(--bg-dark)', marginTop: 'auto' }}>
          <div className="content-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '3rem', fontWeight: 'bold', fontFamily: 'Outfit', color: 'var(--text-primary)' }}>
              CORVEXIS <span style={{ color: 'var(--neon-cyan)' }}>DIGITAL</span>
            </div>
            <p style={{ color: 'var(--text-secondary)' }}>&copy; 2026 Corvexis Digital. ALL SYSTEMS OPERATIONAL.</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Privacy</a>
              <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Terms</a>
            </div>
          </div>
        </footer>
      </main>
    </Router>
  )
}

export default App
