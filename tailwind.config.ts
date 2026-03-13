import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Roboto', 'sans-serif']
			},
			fontSize: {
				// [Default]/Text/XXS
				'text-xxs': ['11px', { lineHeight: '14px', fontWeight: '400' }],

				// [Default]/Text/XS
				'text-xs': ['12px', { lineHeight: '16px', fontWeight: '400' }],
				'text-xs-strong': ['12px', { lineHeight: '16px', fontWeight: '500' }],

				// [Default]/Text/S
				'text-s': ['14px', { lineHeight: '20px', fontWeight: '400' }],
				'text-s-strong': ['14px', { lineHeight: '20px', fontWeight: '500' }],

				// [Default]/Text/M
				'text-m': ['16px', { lineHeight: '24px', fontWeight: '400' }],
				'text-m-strong': ['16px', { lineHeight: '24px', fontWeight: '500' }],

				// [Default]/Text/L
				'text-l': ['18px', { lineHeight: '28px', fontWeight: '400' }],
				'text-l-strong': ['18px', { lineHeight: '28px', fontWeight: '500' }],

				// [Default]/Text/XL
				'text-xl': ['24px', { lineHeight: '32px', fontWeight: '400' }],
				'text-xl-strong': ['24px', { lineHeight: '32px', fontWeight: '500' }]
			},
			colors: {
				// Gosuslugi colors from Figma
				'gosuslugi-blue': '#0066B3',
				'gosuslugi-red': '#EE2F53',
				'gosblue': '#0D4CD3',

				// Base colors
				'content-base-primary': '#212121',
				'content-base-secondary': '#6e6d6d',
				'content-accent-default': '#009b3a',
				'content-error': '#e53935',
				'content-on-accent': '#ffffff',

				// Background colors
				'background-base-primary': '#ffffff',
				'background-base-secondary': '#f5f5f5'
			},
			spacing: {
				'1x': '4px',
				'2x': '8px',
				'3x': '12px',
				'4x': '16px',
				'5x': '20px',
				'6x': '24px',
				'7x': '28px',
				'8x': '32px',
				'9x': '36px',
				'10x': '40px',
				'11x': '44px',
				'12x': '48px',
				'13x': '52px',
				'14x': '56px'
			},
			borderRadius: {
				s: '4px',
				m: '8px',
				l: '12px',
				xl: '16px',
				'2xl': '24px'
			}
		}
	},
	plugins: []
} satisfies Config;
