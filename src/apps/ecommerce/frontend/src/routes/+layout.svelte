<script lang="ts">
	import '../app.css';
	import 'tippy.js/dist/tippy.css';
	import 'tippy.js/animations/scale.css';

	import { afterUpdate, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { themeChange } from 'theme-change';

	import Notification from '$lib/components/notification/Notification.svelte';

	let isNotMounted = true;

	onMount(() => {
		themeChange(false);
	});

	afterUpdate(() => {
		isNotMounted = false;
	});
</script>

{#if isNotMounted}
	<div
		out:fade
		class="fixed inset-0 z-50 flex items-center justify-center backdrop-brightness-0"
	>
		<progress class="progress w-full max-w-xs" />
	</div>
{/if}

<Notification />

<main class="container mx-auto flex h-screen flex-col overflow-x-auto overflow-y-hidden">
	<div class="flex w-full items-center justify-end p-2">
		<select
			data-choose-theme
			class="select select-ghost"
		>
			<option disabled>Theme</option>
			<option
				selected
				value="dark">Default</option
			>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
			<option value="cupcake">Cupcake</option>
			<option value="bumblebee">Bumblebee</option>
			<option value="emerald">Emerald</option>
			<option value="corporate">Corporate</option>
			<option value="synthwave">Synthwave</option>
			<option value="retro">Retro</option>
			<option value="cyberpunk">Cyberpunk</option>
			<option value="valentine">Valentine</option>
			<option value="halloween">Halloween</option>
			<option value="garden">Garden</option>
			<option value="forest">Forest</option>
			<option value="aqua">Aqua</option>
			<option value="lofi">Lofi</option>
			<option value="pastel">Pastel</option>
			<option value="fantasy">Fantasy</option>
			<option value="wireframe">Wireframe</option>
			<option value="black">Black</option>
			<option value="luxury">Luxury</option>
			<option value="dracula">Dracula</option>
			<option value="cmyk">Cmyk</option>
			<option value="autumn">Autumn</option>
			<option value="business">Business</option>
			<option value="acid">Acid</option>
			<option value="lemonade">Lemonade</option>
			<option value="night">Night</option>
			<option value="coffee">Coffee</option>
			<option value="winter">Winter</option>
		</select>
	</div>

	<div class="flex-1">
		<slot />
	</div>
</main>
