<script setup lang="ts">
import * as z from 'zod';
import type { FormError } from '@nuxt/ui';

definePageMeta({
	layout: 'auth',
	alias: '/signup',
});

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
		await supabase.auth.signUp({
			email: userData.email!,
			password: userData.password!,
			options: {
				data: {
					full_name: userData.name,
				},
			},
		});

		toast.add({
			title: 'Success',
			description: 'Check your email for the confirmation link',
			color: 'success',
		});
	} catch (error: any) {
		toast.add({
			title: 'Error',
			description: error.message || 'Something went wrong',
			color: 'error',
		});
	} finally {
		isLoading.value = false;
	}
};

const validate = (state: Partial<signupSchema>): FormError[] => {
	const errors: FormError[] = [];
	// if (state.current && state.new && state.current === state.new) {
	// 	errors.push({ name: 'new', message: 'Passwords must be different' });
	// }
	return errors;
};
</script>

<template>
	<UPageCard
		title="Sign up"
		description="Enter your information to create an account"
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
					placeholder="Name"
					class="w-full"
					autocomplete="name"
				/>
			</UFormField>

			<UFormField name="email">
				<UInput
					v-model="userData.email"
					type="email"
					placeholder="Email"
					class="w-full"
					autocomplete="email"
				/>
			</UFormField>

			<UFormField name="password">
				<UInput
					v-model="userData.password"
					:type="isPasswordVisible ? 'text' : 'password'"
					placeholder="Password"
					class="w-full"
					autocomplete="new-password"
				>
					<template #trailing>
						<UButton
							variant="link"
							size="sm"
							:icon="isPasswordVisible ? 'i-lucide-eye-closed' : 'i-lucide-eye'"
							aria-label="Show password"
							type="button"
							@click.stop.prevent="onPasswordShow"
						/>
					</template>
				</UInput>
			</UFormField>

			<div class="flex items-center justify-between">
				<UButton label="Sign Up" type="submit" :loading="isLoading" />
				<UButton
					to="/login"
					label="Already have an account?"
					variant="link"
					size="sm"
				/>
			</div>
		</UForm>
	</UPageCard>
</template>
