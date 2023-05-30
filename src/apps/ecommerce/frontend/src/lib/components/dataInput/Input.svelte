<script lang="ts">
	export let value: unknown;
	export let isInvalid: boolean;
	export let type = 'text';
	export let placeholder: string;
</script>

<input
	bind:value
	on:focus={() => {
		isInvalid = false;
	}}
	{...{ type }}
	{placeholder}
	class={`input input-bordered w-full max-w-xs ${isInvalid ? 'input-error' : ''}`}
/>
