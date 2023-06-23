<script lang="ts">
	import Toast from '$lib/components/notification/Toast.svelte';
	import { showErrorNotification } from '$lib/stores/notification/ErrorNotification';
	import { showSuccessNotification } from '$lib/stores/notification/SuccessNotification';
</script>

{#if $showSuccessNotification}
	<Toast
		type="alert-success"
		notification={$showSuccessNotification}
	/>
{/if}

{#if $showErrorNotification}
	<Toast
		type="alert-error"
		notification={$showErrorNotification}
	/>
{/if}
