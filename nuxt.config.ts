// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	future: {
		compatibilityVersion: 4,
	},
	devtools: { enabled: false },
	modules: ['@nuxt/ui', '@nuxtjs/supabase', '@nuxtjs/i18n'],
	components: [
		{ path: '~/components', pathPrefix: false, extensions: ['vue'] },
		{ path: '~/shared/ui', pathPrefix: false, extensions: ['vue'] },
		{ path: '~/widgets', pathPrefix: false, extensions: ['vue'] },
		{ path: '~/features', pathPrefix: false, extensions: ['vue'] },
		{ path: '~/entities', pathPrefix: false, extensions: ['vue'] },
	],
	i18n: {
		locales: [
			{ code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
			{ code: 'pl', language: 'pl-PL', name: 'Polski', file: 'pl.json' },
		],
		defaultLocale: 'en',
		langDir: 'locales/',
		strategy: 'no_prefix',
	},
	supabase: {
		redirectOptions: {
			login: '/login',
			callback: '/confirm',
			exclude: ['/', '/signup', '/auth/login', '/auth/signup'],
		},
	},
	css: ['~/assets/css/main.css', '~/assets/css/ui.css'],
});
