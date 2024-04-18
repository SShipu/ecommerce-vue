// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
    ssr: false,
    css: [
        '@/assets/css/main.css',
    ],
    plugins: [
        // {src: '', mode: 'client'}
        // {src: '~/plugins/scroll.js', mode: 'client'},
        {src: '~/plugins/scroll-to-top.js', mode: 'client'}
    ],
    modules: ['@pinia/nuxt'],

    routeRules: {
        // Homepage pre-rendered at build time
        '/': { prerender: true },
        // Product page generated on-demand, revalidates in background
        // '/products/**': { swr: true },
        // Blog post generated on-demand once until next deploy
        // '/blog/**': { isr: true },
        // Admin dashboard renders only on client-side
        // '/login': { ssr: false },
        // Add cors headers on API routes
        // '/api/**': { cors: true },
        // Redirects legacy urls
        // '/old-page': { redirect: '/new-page' }
    },
    build: {},
    sourcemap: {
        server: true,
        client: true
    },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1', // or useHead in pages (see nuxt3 SEO and Meta docs)
            // /* integrate fb chat script */
            // script: [{ src: '@/assets/js/facebook-chat.js'}]
            script: [
                // {
                //   src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/js/bootstrap.min.js",
                //   integrity: "sha384-mQ93GR66B00ZXjt0YO5KlohRA5SY2XofN4zfuZxLkoj1gXtW8ANNCe9d5Y3eG5eD",
                //   crossorigin: "anonymous"
                // },
            ],
            
            link: [
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com'
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: ''
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
                },
            ],
            meta: [
                {
                    hid: 'keywords',
                    name: 'keywords',
                    content: ''
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: ''
                }
            ]
        },
        // pageTransition: {
        //     name: 'fade',
        //     mode: 'out-in' // default or definePageMeta in pages (see nuxt3 Transitions docs)
        // },
        // layoutTransition: {
        //     name: 'slide',
        //     mode: 'out-in' // default or definePageMeta in pages (see nuxt3 Transitions docs)
        // },
        // router: {
        //     scrollBehavior(to, from, savedPosition) {
        //       // If a saved position is available (e.g., when navigating back)
        //       if (savedPosition) {
        //         return savedPosition;
        //       }
        //       // Otherwise, scroll to the top of the page
        //       return { top: 0, behavior: 'smooth' };
        //     }
        //   }
    },
    
})
