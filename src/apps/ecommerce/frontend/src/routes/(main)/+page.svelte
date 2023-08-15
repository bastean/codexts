<script lang="ts">
	import Dashboard from './components/sections/dashboard/Dashboard.svelte';
	import Welcome from './components/sections/welcome/Welcome.svelte';

	import { CustomerJWTStore } from '$lib/contexts/customer/stores/CustomerJWTStore';
</script>

<svelte:head>
	<title>codexts</title>
</svelte:head>

{#if $CustomerJWTStore}
	<Dashboard />
{:else}
	<Welcome />
{/if}
