<script setup lang="ts">
import { ProfileHeader } from '~/widgets/header';
import { AppFooter } from '~/widgets/footer';

import { ProfileNavigation } from '~/widgets/profile';
</script>

<template>
	<div class="min-h-dvh flex flex-col">
		<ProfileHeader />
		<main class="flex-1 flex flex-col">
			<UContainer class="flex-1 flex flex-col">
				<UPage class="flex-1">
					<template #left>
						<ProfileNavigation />
					</template>
					<template #default>
						<div class="py-4">
							<slot />
						</div>
					</template>
				</UPage>
			</UContainer>
		</main>
		<AppFooter />
	</div>
</template>
