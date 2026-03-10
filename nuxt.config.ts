// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	future: {
		compatibilityVersion: 4,
	},
	devtools: { enabled: false },
	modules: ['@nuxt/ui', '@nuxtjs/supabase'],
	supabase: {
		redirectOptions: {
			login: '/login',
			callback: '/confirm',
			exclude: ['/', '/signup', '/auth/login', '/auth/signup'],
		},
	},
	css: ['~/assets/css/main.css', '~/assets/css/ui.css'],
});
