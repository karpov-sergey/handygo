<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const items = ref<NavigationMenuItem[][]>([
	[
		{
			label: 'Profile',
			icon: 'i-lucide-circle-user',
			badge: '',
			to: '/profile',
		},
		{
			label: 'Settings',
			icon: 'i-lucide-settings',
			badge: '',
			to: '/profile/settings',
		},
	],
]);
</script>

<template>
	<div class="min-h-full py-3 lg:border-r border-default">
		<UNavigationMenu
			orientation="vertical"
			variant="link"
			:items="items"
			:ui="{
				link: 'flex gap-3 pl-0 mb-1',
			}"
		/>
	</div>
</template>

<style scoped></style>
