<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let value: Writable<unknown>;
	export let isInvalid: Writable<boolean>;
	export let type = 'text';
	export let placeholder: string;
</script>

<input
	bind:value={$value}
	on:focus={(e) => {
		if (e.target instanceof HTMLInputElement) {
			isInvalid.set(false);
		}
	}}
	{...{ type }}
	{placeholder}
	class={`input input-bordered w-full max-w-xs ${$isInvalid ? 'input-error' : ''}`}
/>
