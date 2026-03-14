<script setup lang="ts">
const user = useSupabaseUser();
</script>

<template>
	<UHeader mode="slideover">
		<template #left>
			<NuxtLink to="/" class="text-2xl font-bold"> HandyGo </NuxtLink>
		</template>

		<template #right>
			<UColorModeButton />
			<template v-if="user">
				<ProfileDropdown />
			</template>
			<template v-else>
				<UButton to="/login" variant="ghost"> {{ $t('auth.login') }} </UButton>
				<UButton to="/signup"> {{ $t('auth.signup') }} </UButton>
			</template>
		</template>

		<template #body>
			<NavMenu orientation="vertical" />
		</template>
	</UHeader>
</template>

<style scoped></style>
