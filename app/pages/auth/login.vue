<script setup lang="ts">
import * as z from 'zod';

definePageMeta({
	layout: 'auth',
	alias: '/login',
});

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
		await supabase.auth.signInWithPassword({
			email: userData.email!,
			password: userData.password!,
		});

		await router.push('/');
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
</script>

<template>
	<UPageCard
		title="Login"
		description="Enter your credentials to access your account"
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
					autocomplete="current-password"
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
				<UButton label="Login" type="submit" :loading="isLoading" />
				<UButton
					to="/signup"
					label="Don't have an account?"
					variant="link"
					size="sm"
				/>
			</div>
		</UForm>
	</UPageCard>
</template>
