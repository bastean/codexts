<script lang="ts">
	import TechStack from '../footer/TechStack.svelte';

	export let title: string;
</script>

<main class="flex h-full w-full flex-col items-center justify-center">
	<div class="flex -translate-y-10 flex-col items-center gap-12">
		<h1 class="text-center text-5xl sm:text-6xl font-black uppercase">{title}</h1>
		<slot />
		<TechStack />
	</div>
</main>
