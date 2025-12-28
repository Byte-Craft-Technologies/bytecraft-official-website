import type { Config } from "tailwindcss";

/**
 * DESIGN SYSTEM GUIDELINES - ByteCraft Futuristic
 *
 * 8PT GRID SYSTEM (NON-NEGOTIABLE)
 * All spacing values MUST be divisible by 8 or 4
 * Valid values: 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96, 128, 160, 192, 256
 * Tailwind utilities: p-1 (4px), p-2 (8px), p-3 (12px), p-4 (16px), p-6 (24px), p-8 (32px), etc.
 *
 * TYPOGRAPHY SYSTEM (4 sizes, 2 weights)
 * Sizes:
 *   - display: Large headings (hero titles)
 *   - heading: Subheadings (section titles)
 *   - body: Body text (default content)
 *   - caption: Small text (labels, metadata)
 *
 * Weights:
 *   - semibold (600): Headings, emphasis, CTAs
 *   - regular (400): Body text, general content
 *
 * 60/30/10 COLOR RULE
 * - 60%: Neutral backgrounds (bg-dark-950, bg-dark-900)
 * - 30%: Complementary (text-light, text-gray)
 * - 10%: Accent/brand (primary, neon colors for CTAs and highlights)
 */

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "inter": ["Inter", "sans-serif"]
      },
      fontSize: {
        // STRICT 4-SIZE SYSTEM
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],      // 56px - Hero titles
        'heading': ['1.75rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],     // 28px - Section titles
        'body': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],                 // 16px - Body text
        'caption': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em', fontWeight: '400' }],     // 14px - Small text/labels
      },
      fontWeight: {
        // STRICT 2-WEIGHT SYSTEM
        'regular': '400',  // Body text, general content
        'semibold': '600', // Headings, emphasis, CTAs
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-aurora": "linear-gradient(120deg, #5EA1D6 0%, #22d3ee 25%, #a78bfa 50%, #22d3ee 75%, #5EA1D6 100%)",
        "gradient-neon": "linear-gradient(135deg, #22d3ee 0%, #5EA1D6 50%, #818cf8 100%)",
        "gradient-holographic": "linear-gradient(45deg, #22d3ee, #5EA1D6, #a78bfa, #f472b6, #22d3ee)",
      },
      colors: {
        // EXISTING COLORS (preserved for backwards compatibility)
        "primary": "#5EA1D6",
        "black": "#252432",
        "navLinkActive": "#8987A1",
        "customWhite": "#FBFBFB",

        // SEMANTIC COLOR TOKENS - Futuristic Palette
        // 60% - Neutral backgrounds
        "dark": {
          950: "#0a0a1a",
          900: "#0d1525",
          800: "#1a1f35",
          700: "#252a45",
        },
        // 30% - Complementary text colors
        "light": {
          DEFAULT: "#FBFBFB",
          100: "#e5e7eb",
          200: "#d1d5db",
          300: "#9ca3af",
          400: "#6b7280",
        },
        // 10% - Accent/Brand colors (futuristic neon palette)
        "neon": {
          cyan: "#22d3ee",      // Electric cyan
          blue: "#5EA1D6",      // Primary brand blue
          purple: "#a78bfa",    // Violet accent
          pink: "#f472b6",      // Rose neon
          green: "#10b981",     // Success green
          orange: "#f59e0b",    // Warning orange
        },
        // SEMANTIC COLORS
        "success": "#10b981",
        "error": "#ef4444",
        "warning": "#f59e0b",
        "info": "#22d3ee",
      },
      animation: {
        'spin-slow': 'spin-slow 20s linear infinite',
        'spin-reverse': 'spin-reverse 25s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'aurora': 'aurora 8s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 4s linear infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        aurora: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(94, 161, 214, 0.3)',
        'glow-lg': '0 0 40px rgba(94, 161, 214, 0.4)',
        'neon-cyan': '0 0 24px rgba(34, 211, 238, 0.4), 0 0 48px rgba(34, 211, 238, 0.2)',
        'neon-blue': '0 0 24px rgba(94, 161, 214, 0.4), 0 0 48px rgba(94, 161, 214, 0.2)',
        'neon-purple': '0 0 24px rgba(167, 139, 250, 0.4), 0 0 48px rgba(167, 139, 250, 0.2)',
        'holographic': '0 8px 32px rgba(34, 211, 238, 0.15), 0 16px 64px rgba(94, 161, 214, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;