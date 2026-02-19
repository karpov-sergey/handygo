<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: 'Home',
		to: '/',
	},
	{
		label: 'Offers',
		to: '/offers',
		active: route.path.startsWith('/offers'),
	},
]);
</script>

<template>
	<UHeader mode="slideover">
		<template #left>
			<NuxtLink to="/" class="text-2xl"> HandyGo </NuxtLink>
		</template>

		<UNavigationMenu
			variant="link"
			highlight
			:items="items"
			:ui="{ link: 'hover:text-primary data-[active]:font-bold' }"
		/>

		<template #right>
			<UColorModeButton />
			<UButton>Login</UButton>
		</template>

		<template #body>
			<UNavigationMenu
				class="-mx-2.5"
				variant="link"
				orientation="vertical"
				highlight
				:items="items"
				:ui="{
					link: 'mb-2',
					linkLabel: 'pb-1 group-data-[active]:border-b border-primary',
				}"
			/>
		</template>
	</UHeader>
</template>

<style scoped></style>
