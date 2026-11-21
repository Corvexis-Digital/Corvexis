// ─── Single source of truth for design themes ────────────────────────────────
// Used by the Theme Lab for previews AND applied site-wide via CSS variables.

export const THEMES = [
    {
        id: 'aurora',
        name: 'Aurora Glass',
        tagline: 'Fluid light, depth & glass',
        aesthetic: 'Soft gradients, blurred glass and floating 3D forms. Calm, premium, modern.',
        motion: 'Blur-in + float',
        radius: '20px',
        font: "'Space Grotesk', sans-serif",
        palette: {
            bg: '#050b16',
            surface: 'rgba(255,255,255,0.05)',
            fg: '#eaf6ff',
            muted: 'rgba(234,246,255,0.55)',
            accent: '#22d3ee',
            accent2: '#a855f7',
            line: 'rgba(34,211,238,0.22)'
        }
    },
    {
        id: 'monolith',
        name: 'Monolith',
        tagline: 'Pure black, pure form',
        aesthetic: 'Swiss-style brutalism. Hairline rules, oversized type, zero decoration.',
        motion: 'Clip wipe reveal',
        radius: '2px',
        font: "'Outfit', sans-serif",
        palette: {
            bg: '#0a0a0a',
            surface: 'transparent',
            fg: '#fafafa',
            muted: 'rgba(250,250,250,0.45)',
            accent: '#ffffff',
            accent2: 'rgba(255,255,255,0.5)',
            line: 'rgba(255,255,255,0.16)'
        }
    },
    {
        id: 'solaris',
        name: 'Solaris',
        tagline: 'Warm editorial minimalism',
        aesthetic: 'Amber and terracotta on deep dusk. Slow, generous, human.',
        motion: 'Slow rise',
        radius: '28px',
        font: "'Outfit', sans-serif",
        palette: {
            bg: '#120b07',
            surface: 'rgba(245,158,11,0.06)',
            fg: '#fdf3e6',
            muted: 'rgba(253,243,230,0.55)',
            accent: '#f59e0b',
            accent2: '#fb7185',
            line: 'rgba(245,158,11,0.25)'
        }
    },
    {
        id: 'obsidian',
        name: 'Obsidian Grid',
        tagline: 'Terminal precision',
        aesthetic: 'Mono type, emerald signal, grid lines. Engineered, technical, honest.',
        motion: 'Typewriter stagger',
        radius: '6px',
        font: "'Courier New', monospace",
        palette: {
            bg: '#04080a',
            surface: 'rgba(52,211,153,0.05)',
            fg: '#d7fff1',
            muted: 'rgba(215,255,241,0.45)',
            accent: '#34d399',
            accent2: '#22d3ee',
            line: 'rgba(52,211,153,0.22)'
        }
    },
    {
        id: 'paper',
        name: 'Paperlight',
        tagline: 'Print-inspired clarity',
        aesthetic: 'Cream paper, ink blue, real shadows. Editorial, readable, timeless.',
        motion: 'Paper flip',
        radius: '10px',
        font: "'Space Grotesk', sans-serif",
        palette: {
            bg: '#f4f1ea',
            surface: '#ffffff',
            fg: '#1b1b1f',
            muted: 'rgba(27,27,31,0.55)',
            accent: '#1d4ed8',
            accent2: '#b45309',
            line: 'rgba(27,27,31,0.14)'
        }
    }
]

// CSS variable values applied to :root for each theme
export const THEME_VARS = {
    aurora: {
        '--bg-dark': '#050b16',
        '--bg-accent': '#0a1424',
        '--text-primary': '#eaf6ff',
        '--text-secondary': '#93aec2',
        '--neon-cyan': '#22d3ee',
        '--neon-purple': '#a855f7',
        '--glass': 'rgba(255,255,255,0.05)',
        '--glass-border': 'rgba(255,255,255,0.10)',
        '--hero-bg': '#050b16',
        '--nav-bg': 'rgba(5,11,22,0.92)'
    },
    monolith: {
        '--bg-dark': '#0a0a0a',
        '--bg-accent': '#141414',
        '--text-primary': '#fafafa',
        '--text-secondary': '#a1a1aa',
        '--neon-cyan': '#ffffff',
        '--neon-purple': '#9ca3af',
        '--glass': 'rgba(255,255,255,0.04)',
        '--glass-border': 'rgba(255,255,255,0.18)',
        '--hero-bg': '#0a0a0a',
        '--nav-bg': 'rgba(10,10,10,0.93)'
    },
    solaris: {
        '--bg-dark': '#120b07',
        '--bg-accent': '#1c110b',
        '--text-primary': '#fdf3e6',
        '--text-secondary': '#c8ab8d',
        '--neon-cyan': '#f59e0b',
        '--neon-purple': '#fb7185',
        '--glass': 'rgba(245,158,11,0.07)',
        '--glass-border': 'rgba(245,158,11,0.24)',
        '--hero-bg': '#120b07',
        '--nav-bg': 'rgba(18,11,7,0.93)'
    },
    obsidian: {
        '--bg-dark': '#04080a',
        '--bg-accent': '#071014',
        '--text-primary': '#d7fff1',
        '--text-secondary': '#89b3a4',
        '--neon-cyan': '#34d399',
        '--neon-purple': '#22d3ee',
        '--glass': 'rgba(52,211,153,0.06)',
        '--glass-border': 'rgba(52,211,153,0.20)',
        '--hero-bg': '#04080a',
        '--nav-bg': 'rgba(4,8,10,0.94)'
    },
    paper: {
        '--bg-dark': '#f4f1ea',
        '--bg-accent': '#ffffff',
        '--text-primary': '#1b1b1f',
        '--text-secondary': '#5f6068',
        '--neon-cyan': '#1d4ed8',
        '--neon-purple': '#b45309',
        '--glass': 'rgba(255,255,255,0.92)',
        '--glass-border': 'rgba(27,27,31,0.14)',
        '--hero-bg': '#f4f1ea',
        '--nav-bg': 'rgba(255,255,255,0.88)'
    }
}

export const DEFAULT_THEME_ID = 'aurora'
