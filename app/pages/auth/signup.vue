<script setup lang="ts">
import * as z from 'zod';
import type { FormError } from '@nuxt/ui';
import { signUp } from '~/features/auth';

definePageMeta({
	layout: 'auth',
	alias: '/signup',
});

const { t } = useI18n();
const supabase = useSupabaseClient();
const toast = useToast();

const isPasswordVisible = ref(false);
const isLoading = ref(false);

const signupSchema = z.object({
	name: z
		.string()
		.min(2, 'Must be at least 2 characters')
		.max(50, 'Must be at max 50 characters'),
	email: z.string().email('Must be a valid email'),
	password: z
		.string()
		.min(8, 'Must be at least 8 characters')
		.max(50, 'Must be at max 50 characters'),
});

type signupSchema = z.output<typeof signupSchema>;

const userData = reactive<Partial<signupSchema>>({
	name: '',
	email: '',
	password: '',
});

const onPasswordShow = () => {
	isPasswordVisible.value = !isPasswordVisible.value;
};

const onSubmit = async () => {
	isLoading.value = true;

	try {
		await signUp(supabase, userData.email!, userData.password!, userData.name!);

		toast.add({
			title: t('auth.successTitle'),
			description: t('auth.successSignup'),
			color: 'success',
		});
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

const validate = (state: Partial<signupSchema>): FormError[] => {
	const errors: FormError[] = [];

	return errors;
};
</script>

<template>
	<UPageCard
		:title="$t('auth.signupTitle')"
		:description="$t('auth.signupDescription')"
		variant="subtle"
	>
		<UForm
			:schema="signupSchema"
			:state="userData"
			:validate="validate"
			class="flex flex-col gap-4 max-w-xs"
			@submit="onSubmit"
		>
			<UFormField name="name">
				<UInput
					v-model="userData.name"
					type="text"
					:placeholder="$t('auth.namePlaceholder')"
					class="w-full"
					autocomplete="name"
				/>
			</UFormField>

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
					autocomplete="new-password"
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
				<UButton
					:label="$t('auth.signup')"
					type="submit"
					:loading="isLoading"
				/>
				<UButton
					to="/login"
					:label="$t('auth.hasAccount')"
					variant="link"
					size="sm"
				/>
			</div>
		</UForm>
	</UPageCard>
</template>
