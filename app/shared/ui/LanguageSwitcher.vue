<script setup lang="ts">
const { locale, locales, setLocale } = useI18n();

const options = computed(() =>
	locales.value.map((locale) => ({
		label: locale.name,
		value: locale.code,
	}))
);

const current = computed(() =>
	options.value.find((option) => option.value === locale.value)
);
</script>

<template>
	<UDropdownMenu
		:items="
			options.map((option) => ({
				label: option.label,
				onSelect: () => setLocale(option.value),
			}))
		"
	>
		<UButton variant="ghost" trailing-icon="i-lucide-chevron-down">
			{{ current?.label }}
		</UButton>
	</UDropdownMenu>
</template>
