<script setup lang="ts">
import * as z from 'zod';
import { signIn } from '~/features/auth';

definePageMeta({
	layout: 'auth',
	alias: '/login',
});

const { t } = useI18n();
const supabase = useSupabaseClient();
const toast = useToast();
const router = useRouter();

const isPasswordVisible = ref(false);
const isLoading = ref(false);

const loginSchema = z.object({
	email: z.string().email('Must be a valid email'),
	password: z.string().min(8, 'Must be at least 8 characters'),
});

type loginSchema = z.output<typeof loginSchema>;

const userData = reactive<Partial<loginSchema>>({
	email: '',
	password: '',
});

const onPasswordShow = () => {
	isPasswordVisible.value = !isPasswordVisible.value;
};

const onSubmit = async () => {
	isLoading.value = true;

	try {
		await signIn(supabase, userData.email!, userData.password!);
		await router.push('/');
	} catch (error: unknown) {
		const message =
			error instanceof Error ? error.message : t('auth.errorGeneric');

		toast.add({
			title: t('auth.errorTitle'),
			description: message,
			color: 'error',
		});
	} finally {
		isLoading.value = false;
	}
};
</script>

<template>
	<UPageCard
		:title="$t('auth.loginTitle')"
		:description="$t('auth.loginDescription')"
		variant="subtle"
	>
		<UForm
			:schema="loginSchema"
			:state="userData"
			class="flex flex-col gap-4 max-w-xs"
			@submit="onSubmit"
		>
			<UFormField name="email">
				<UInput
					v-model="userData.email"
					type="email"
					:placeholder="$t('auth.emailPlaceholder')"
					class="w-full"
					autocomplete="email"
				/>
			</UFormField>

			<UFormField name="password">
				<UInput
					v-model="userData.password"
					:type="isPasswordVisible ? 'text' : 'password'"
					:placeholder="$t('auth.passwordPlaceholder')"
					class="w-full"
					autocomplete="current-password"
				>
					<template #trailing>
						<UButton
							variant="link"
							size="sm"
							:icon="isPasswordVisible ? 'i-lucide-eye-closed' : 'i-lucide-eye'"
							:aria-label="$t('auth.showPassword')"
							type="button"
							@click.stop.prevent="onPasswordShow"
						/>
					</template>
				</UInput>
			</UFormField>

			<div class="flex items-center justify-between">
				<UButton :label="$t('auth.login')" type="submit" :loading="isLoading" />
				<UButton
					to="/signup"
					:label="$t('auth.noAccount')"
					variant="link"
					size="sm"
				/>
			</div>
		</UForm>
	</UPageCard>
</template>
