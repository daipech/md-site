/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: '#333',
						a: {
							color: '#2563eb',
							'&:hover': {
								color:  '#1d4ed8'
							}
						}
					}
				}
			}
		}
	},
	plugins:  []
};