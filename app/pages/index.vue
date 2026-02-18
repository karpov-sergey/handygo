<script setup lang="ts"></script>

<template>
	<section class="py-10">
		<div class="text-center space-y-4 py-10">
			<h1 class="text-3xl font-bold">HandyGo</h1>
			<p class="text-gray-500">
				Добро пожаловать! Найдите подходящее предложение.
			</p>
			<UButton>Button</UButton>
			<UColorModeButton />
			<UFileUpload
				position="inside"
				layout="list"
				multiple
				label="Drop your images here"
				description="SVG, PNG, JPG or GIF (max. 2MB)"
				class="w-96"
				:ui="{
					base: 'min-h-48',
				}"
			/>
			<UIcon name="i-lucide-lightbulb" class="size-14 bg-yellow-400" />
		</div>
	</section>
</template>
