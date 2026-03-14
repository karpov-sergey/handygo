<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { t } = useI18n();
const route = useRoute();

const props = withDefaults(
	defineProps<{
		orientation?: 'horizontal' | 'vertical';
	}>(),
	{ orientation: 'horizontal' }
);

const items = computed<NavigationMenuItem[]>(() => [
	{
		label: t('nav.home'),
		to: '/',
	},
	{
		label: t('nav.offers'),
		to: '/offers',
		active: route.path.startsWith('/offers'),
	},
]);
</script>

<template>
	<UNavigationMenu
		v-if="props.orientation === 'horizontal'"
		variant="link"
		highlight
		:items="items"
		:ui="{ link: 'hover:text-primary data-[active]:font-bold' }"
	/>
	<UNavigationMenu
		v-else
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
