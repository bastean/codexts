<script lang="ts">
	export let handler: () => void;
	export let btnTitle: string;
</script>

<form
	on:submit|preventDefault={handler}
	class="form-control items-center gap-4"
>
	<slot />

	<div class="mt-2 flex w-full flex-col items-center">
		<button
			type="submit"
			class="btn">{btnTitle}</button
		>
	</div>
</form>
