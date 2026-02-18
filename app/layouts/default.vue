<script setup lang="ts">
import { AppHeader } from '~/widgets/header';
</script>

<template>
	<div class="min-h-dvh flex flex-col">
		<main class="flex-1">
			<AppHeader />
			<slot />
		</main>
	</div>
</template>
