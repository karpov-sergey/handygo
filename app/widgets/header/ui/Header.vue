<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const { t } = useI18n();
const route = useRoute();
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

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

const logout = async () => {
	await supabase.auth.signOut();
	await router.push('/');
};
</script>
<template>
	<UHeader mode="slideover">
		<template #left>
			<NuxtLink to="/" class="text-2xl font-bold"> HandyGo </NuxtLink>
		</template>
		<UNavigationMenu
			variant="link"
			highlight
			:items="items"
			:ui="{ link: 'hover:text-primary data-[active]:font-bold' }"
		/>
		<template #right>
			<UColorModeButton />
			<template v-if="user">
				<UDropdownMenu
					:items="[
						[
							{
								label: user.email || t('profile.title'),
								icon: 'i-lucide-user',
								to: '/profile',
							},
						],
						[
							{
								label: t('auth.logout'),
								icon: 'i-lucide-log-out',
								onSelect: logout,
							},
						],
					]"
				>
					<UAvatar
						:alt="user.user_metadata?.full_name || user.email"
						size="sm"
						class="cursor-pointer"
					/>
				</UDropdownMenu>
			</template>
			<template v-else>
				<LanguageSwitcher />
				<UButton to="/login" variant="ghost"> {{ $t('auth.login') }} </UButton>
				<UButton to="/signup"> {{ $t('auth.signup') }} </UButton>
			</template>
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
