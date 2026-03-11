<script setup lang="ts">
definePageMeta({
	layout: 'profile',
});
</script>

<template>
	<div class="space-y-6">
		<h1 class="text-2xl font-bold">{{ $t('settings.title') }}</h1>

		<UCard>
			<template #header>
				<h2 class="text-lg font-semibold">{{ $t('settings.language') }}</h2>
			</template>
			<div class="flex items-center justify-between">
				<p class="text-sm text-muted">
					{{ $t('settings.languageDescription') }}
				</p>
				<LanguageSwitcher />
			</div>
		</UCard>
	</div>
</template>

<style scoped></style>
