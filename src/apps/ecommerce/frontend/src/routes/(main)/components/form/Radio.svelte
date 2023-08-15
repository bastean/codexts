<script lang="ts">
	export let currentChecked: string = '';
	export let isChecked: boolean = false;

	export let value: string;

	export let onClick: () => void = () => {};

	export let style: string = '';
</script>

<input
	bind:group={currentChecked}
	on:click={onClick}
	type="radio"
	name="options"
	class={`join-item btn ${style}`}
	checked={isChecked}
	value={value.charAt(0).toUpperCase() + value.slice(1)}
	aria-label={value.toUpperCase()}
/>
