<script setup lang="ts">
import { AppHeader } from '~/widgets/header';
import { AppFooter } from '~/widgets/footer';
</script>

<template>
	<div class="min-h-dvh flex flex-col">
		<main class="flex-1">
			<AppHeader />
			<slot />
			<AppFooter />
		</main>
	</div>
</template>
