<script lang="ts">
	import { getContext } from 'svelte';

	import type { Readable } from 'svelte/store';

	export let name: string;
	export let type = 'text';
	export let placeholder: string;

	interface Input {
		[key: string]: null | string[];
	}

	const errors: Readable<Input> = getContext('errors');

	let value: string;
	let hasNotErrors: undefined | null | string[];
	let hasBlurValidation: boolean = false;
	let hasKeyupValidation: boolean = false;

	$: if (hasBlurValidation || hasKeyupValidation) {
		hasNotErrors = $errors[`${name}`];
	}
</script>

<input
	on:blur={() => {
		if (!hasBlurValidation) {
			hasBlurValidation = true;
		}
	}}
	on:keyup={() => {
		if (hasBlurValidation) {
			hasKeyupValidation = true;
		}
	}}
	bind:value
	{name}
	{...{ type }}
	{placeholder}
	class={`input input-bordered w-full max-w-xs 
    ${hasNotErrors === null && 'input-success'}
    ${hasNotErrors !== undefined && hasNotErrors !== null && 'input-error'}`}
/>
