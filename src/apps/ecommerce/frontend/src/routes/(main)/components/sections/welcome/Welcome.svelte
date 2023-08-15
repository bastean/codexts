<script lang="ts">
	import Radio from '../../form/Radio.svelte';
	import RadioForm from '../../form/RadioForm.svelte';
	import Main from '../../layouts/Main.svelte';

	import Login from './Login.svelte';
	import Register from './Register.svelte';

	let currentChecked = 'Register';
</script>

<Main title="Welcome">
	<RadioForm>
		<Radio
			bind:currentChecked
			isChecked={true}
			value="Register"
		/>

		<Radio
			bind:currentChecked
			value="Login"
		/>
	</RadioForm>

	{#if currentChecked === 'Register'}
		<Register bind:currentChecked />
	{:else if currentChecked === 'Login'}
		<Login />
	{/if}
</Main>
