<script setup lang="ts">
import type { NavigationMenuItem, DropdownMenuItem } from '@nuxt/ui';
import { signOut } from '~/features/auth';

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

const profileItems = computed<DropdownMenuItem[]>(() => [
	[
		{
			label: user.value?.email || t('profile.title'),
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
]);

const avatarAlt = computed(
	() => user.value?.user_metadata?.full_name || user.value?.email || ''
);

const logout = async () => {
	await signOut(supabase);
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
				<UDropdownMenu :items="profileItems">
					<UAvatar :alt="avatarAlt" size="sm" class="cursor-pointer" />
				</UDropdownMenu>
			</template>
			<template v-else>
				<div class="hidden lg:contents">
					<LanguageSwitcher />
					<UButton to="/login" variant="ghost">
						{{ $t('auth.login') }}
					</UButton>
					<UButton to="/signup"> {{ $t('auth.signup') }} </UButton>
				</div>
			</template>
		</template>
		<template #body>
			<template v-if="!user">
				<div class="mt-4 flex flex-col gap-2">
					<LanguageSwitcher />
					<UButton to="/login" variant="ghost" block>
						{{ $t('auth.login') }}
					</UButton>
					<UButton to="/signup" block> {{ $t('auth.signup') }} </UButton>
				</div>
			</template>
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
