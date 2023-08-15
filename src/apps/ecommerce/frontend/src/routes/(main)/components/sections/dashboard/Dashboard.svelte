<script lang="ts">
	import Radio from '../../form/Radio.svelte';
	import RadioForm from '../../form/RadioForm.svelte';
	import Main from '../../layouts/Main.svelte';

	import Delete from './Delete.svelte';
	import Update from './Update.svelte';

	import { CustomerJWTStore } from '$lib/contexts/customer/stores/CustomerJWTStore';
	import { CustomerStore } from '$lib/contexts/customer/stores/CustomerStore';

	let currentChecked = 'Update';

	const logout = () => {
		CustomerJWTStore.set(null);
		CustomerJWTStore.delete();

		CustomerStore.set(null);
		CustomerStore.delete();
	};
</script>

<Main title="Dashboard">
	<RadioForm>
		<Radio
			bind:currentChecked
			isChecked={true}
			value="Update"
		/>
		<Radio
			bind:currentChecked
			value="Delete"
		/>
		<Radio
			value="Logout"
			style="bg-secondary/50 hover:text-white hover:bg-secondary/75"
			onClick={logout}
		/>
	</RadioForm>

	{#if currentChecked === 'Update'}
		<Update />
	{:else if currentChecked === 'Delete'}
		<Delete />
	{/if}
</Main>
