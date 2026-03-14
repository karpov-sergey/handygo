<script setup lang="ts">
const user = useSupabaseUser();
</script>
<template>
	<UHeader mode="slideover">
		<template #left>
			<NuxtLink to="/" class="text-2xl font-bold"> HandyGo </NuxtLink>
		</template>
		<NavMenu />
		<template #right>
			<UColorModeButton />
			<template v-if="user">
				<ProfileDropdown />
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
			<NavMenu orientation="vertical" />
		</template>
	</UHeader>
</template>
<style scoped></style>
