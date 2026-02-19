<script setup lang="ts">
import { AppHeader } from '~/widgets/header';
import { AppFooter } from '~/widgets/footer';
</script>

<template>
	<div class="min-h-dvh flex flex-col">
		<AppHeader />
		<main class="py-4 flex-1">
			<slot />
		</main>
		<AppFooter />
	</div>
</template>
