<script lang="ts">
	import { CustomerUsername, CustomerUsernameInvalid } from '$lib/stores/customer/CustomerUsername';
</script>

<input
	bind:value={$CustomerUsername}
	on:focus={(e) => {
		if (e.target instanceof HTMLInputElement) {
			CustomerUsernameInvalid.set(false);
		}
	}}
	type="text"
	placeholder="Username"
	class={`input input-bordered w-full max-w-xs ${$CustomerUsernameInvalid ? 'input-error' : ''}`}
/>
