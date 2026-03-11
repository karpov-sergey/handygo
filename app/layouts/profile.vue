<script setup lang="ts">
import { ProfileHeader } from '~/widgets/header';
import { AppFooter } from '~/widgets/footer';

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
	<div class="min-h-dvh flex flex-col">
		<ProfileHeader />
		<main class="flex-1 flex flex-col">
			<UContainer class="flex-1 flex flex-col">
				<UPage class="flex-1">
					<template #left>
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
					<template #default>
						<div class="py-4">
							<slot />
						</div>
					</template>
				</UPage>
			</UContainer>
		</main>
		<AppFooter />
	</div>
</template>
