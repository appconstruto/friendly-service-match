import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: '#FDD867',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: '#FFF7E1',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#FE4B01',
					light: '#FE6F34',
					dark: '#F73D00',
					foreground: '#FFF7E1',
				},
				secondary: {
					DEFAULT: '#FDD867',
					light: '#FEEFC2',
					dark: '#FE5D1A',
					foreground: '#FE4B01',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: '#FEEFC2',
				accent: {
					DEFAULT: '#FE9367',
					light: '#FFBEA3',
					dark: '#FE6F34',
					foreground: '#FE4B01',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: '#FFDFD1',
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				highlight: '#FE4B01',
				orange1: '#FE4B01',
				orange2: '#FDD867',
				orange3: '#FE5D1A',
				orange4: '#FE6F34',
				orange5: '#FE9367',
				orange6: '#FFBEA3',
				orange7: '#FFDFD1',
				orange8: '#FDD867',
				orange9: '#F73D00',
				orange10: '#FEEFC2',
				orange11: '#FFF7E1',
				glass: 'rgba(255,255,255,0.85)',
				border: '#E5EAF2',
				gray: {
					100: '#F3F8FF',
					200: '#E5EAF2',
					300: '#C9D6E6',
					400: '#A0AEC0',
					500: '#718096',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				xl: '1.5rem',
				'2xl': '2rem',
				full: '9999px',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			boxShadow: {
				glass: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
				card: '0 4px 24px 0 rgba(80, 112, 255, 0.08)',
				dock: '0 2px 16px 0 rgba(80, 112, 255, 0.10)',
			},
			fontFamily: {
				sans: ['Inter', 'Segoe UI', 'Arial', 'sans-serif'],
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
