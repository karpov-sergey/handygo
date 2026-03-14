<script setup lang="ts"></script>

<template>
	<div>
		<UContainer>
			<UPageHero
				:title="$t('home.heroTitle')"
				:description="$t('home.heroDescription')"
				:links="[
					{
						label: $t('home.findSpecialist'),
						to: '/signup',
						trailingIcon: 'i-lucide-search',
						size: 'xl',
					},
					{
						label: $t('home.findOrder'),
						to: '/signup',
						trailingIcon: 'i-lucide-briefcase-business',
						size: 'xl',
					},
				]"
			/>
		</UContainer>
	</div>
</template>
