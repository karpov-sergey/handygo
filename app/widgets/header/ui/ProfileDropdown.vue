<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui';
import { signOut } from '~/features/auth';

const { t } = useI18n();
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const router = useRouter();

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

const avatarAlt = computed<string>(
	() => user.value?.user_metadata?.full_name || user.value?.email || ''
);

const logout = async (): Promise<void> => {
	await signOut(supabase);
	await router.push('/');
};
</script>

<template>
	<UDropdownMenu :items="profileItems">
		<UAvatar :alt="avatarAlt" size="sm" class="cursor-pointer" />
	</UDropdownMenu>
</template>
