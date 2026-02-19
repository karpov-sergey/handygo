<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: 'Docs',
		to: '/docs/getting-started',
		active: route.path.startsWith('/docs/getting-started'),
	},
	{
		label: 'Components',
		to: '/docs/components',
		active: route.path.startsWith('/docs/components'),
	},
	{
		label: 'Figma',
		to: 'https://go.nuxt.com/figma-ui',
		target: '_blank',
	},
	{
		label: 'Releases',
		to: 'https://github.com/nuxt/ui/releases',
		target: '_blank',
	},
]);
</script>

<template>
	<UHeader>
		<template #left>
			<NuxtLink to="/" class="text-2xl font-black"> HandyGo </NuxtLink>
		</template>

		<template #right>
			<UColorModeButton />
			<UButton>Login</UButton>
			<UNavigationMenu :items="items" />
		</template>
	</UHeader>
</template>

<style scoped></style>
