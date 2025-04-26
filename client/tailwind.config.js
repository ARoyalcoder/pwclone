/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
		  keyframes: {
			bounceBall: {
			  '0%': {
				top: '60px',
				height: '5px',
				borderRadius: '50px 50px 25px 25px',
				transform: 'scaleX(1.7)',
			  },
			  '40%': {
				height: '20px',
				borderRadius: '50%',
				transform: 'scaleX(1)',
			  },
			  '100%': {
				top: '0%',
			  },
			},
			shadowShrink: {
			  '0%': { transform: 'scaleX(1.5)' },
			  '40%': { transform: 'scaleX(1)', opacity: '0.7' },
			  '100%': { transform: 'scaleX(0.2)', opacity: '0.4' },
			},
		  },
		  animation: {
			bounceBall: 'bounceBall 0.5s alternate infinite ease-in-out',
			shadowShrink: 'shadowShrink 0.5s alternate infinite ease-in-out',
		  },
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

