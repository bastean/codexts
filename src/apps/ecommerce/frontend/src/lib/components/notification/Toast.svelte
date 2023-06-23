<script lang="ts">
	import { fade } from 'svelte/transition';

	export let type: string;
	export let notification: string;
</script>

<div
	transition:fade
	class="toast toast-top toast-center z-50 w-full max-w-xs"
>
	<div class={`${type} alert flex w-full justify-center shadow-lg`}>
		<div class="flex gap-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 flex-shrink-0 stroke-current"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d={type === 'alert-success'
						? 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
						: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'}
				/></svg
			>
			<span>{notification}</span>
		</div>
	</div>
</div>
