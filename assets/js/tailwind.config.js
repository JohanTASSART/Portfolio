/* Configuration Tailwind (Play CDN) — chargée juste après le script du CDN.
   Un seul endroit pour l'accent : g1 / g2. */
tailwind.config = {
   theme: {
      screens: { 'xs': '480px', 'sd': '540px', 'md': '768px', 'lg': '1200px', 'xl': '1500px' },
      extend: {
         colors: {
            /* Thème sombre (dominant) */
            night: '#0b0b0d',   /* fond de page sombre */
            panel: '#141418',   /* carte sombre */
            panel2: '#1b1c21',  /* carte sombre alt */
            edge: '#2a2b31',    /* bordure sombre */
            fog: '#a1a1aa',     /* texte attenue sur sombre */
            cloud: '#f4f4f5',   /* texte clair */
            /* Sections claires (alternance) */
            paper: '#f4f4f3',   /* fond clair */
            ink: '#0f1115',     /* texte sur clair */
            ash: '#6b7280',     /* texte attenue sur clair */
            line: '#e4e4e7',    /* bordure claire */
            /* Accent (un seul endroit a changer : g1 / g2) */
            g1: '#ff7a1a',      /* orange */
            g2: '#ff2d55',      /* rouge */
         },
         fontFamily: {
            sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
            display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
         },
         keyframes: {
            marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
            blink: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0' } },
         },
         animation: {
            marquee: 'marquee 26s linear infinite',
            'marquee-slow': 'marquee 50s linear infinite',
            blink: 'blink .7s step-end infinite',
         },
      },
   },
}
