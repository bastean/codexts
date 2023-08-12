<script lang="ts">
	import TechStack from './components/footer/TechStack.svelte';
	import Login from './components/section/Login.svelte';
	import Register from './components/section/Register.svelte';

	let currentChecked = 'Register';
</script>

<svelte:head>
	<title>Welcome</title>
</svelte:head>

<main class="flex h-full w-full flex-col items-center justify-center">
	<div class="flex -translate-y-10 flex-col items-center gap-12">
		<h1 class="text-center text-6xl font-black">Welcome</h1>

		<form class="join join-horizontal">
			<input
				bind:group={currentChecked}
				type="radio"
				name="options"
				aria-label="REGISTER"
				value="Register"
				checked
				class="join-item btn"
			/>
			<input
				bind:group={currentChecked}
				type="radio"
				name="options"
				aria-label="LOGIN"
				value="Login"
				class="join-item btn"
			/>
		</form>

		{#if currentChecked === 'Register'}
			<Register />
		{:else if currentChecked === 'Login'}
			<Login />
		{/if}

		<TechStack />
	</div>
</main>
