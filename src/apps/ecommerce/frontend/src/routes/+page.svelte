<script lang="ts">
	import TechStack from '$lib/components/footers/TechStack.svelte';
	import Delete from '$lib/sections/customer/Delete.svelte';
	import Find from '$lib/sections/customer/Find.svelte';
	import Register from '$lib/sections/customer/Register.svelte';

	let currentChecked = 'Register';
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<main class="flex h-full w-full flex-col items-center justify-center">
	<div class="flex -translate-y-10 flex-col items-center gap-12">
		<h1 class="text-center text-6xl font-black">Welcome</h1>

		<form class="btn-group">
			<input
				bind:group={currentChecked}
				type="radio"
				name="options"
				data-title="REGISTER"
				value="Register"
				checked
				class="btn"
			/>
			<input
				bind:group={currentChecked}
				type="radio"
				name="options"
				data-title="FIND"
				value="Find"
				class="btn"
			/>
			<input
				bind:group={currentChecked}
				type="radio"
				name="options"
				data-title="DELETE"
				value="Delete"
				class="btn"
			/>
		</form>

		{#if currentChecked === 'Register'}
			<Register />
		{:else if currentChecked === 'Find'}
			<Find />
		{:else}
			<Delete />
		{/if}

		<TechStack />
	</div>
</main>
