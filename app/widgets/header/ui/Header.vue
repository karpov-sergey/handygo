<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const route = useRoute();

const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

const logout = async () => {
	await supabase.auth.signOut();
	await router.push('/');
};

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
								label: user.email || 'Profile',
								icon: 'i-lucide-user',
							},
						],
						[
							{
								label: 'Log out',
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
				<UButton to="/login" variant="ghost"> Log in </UButton>
				<UButton to="/signup"> Sign Up </UButton>
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
