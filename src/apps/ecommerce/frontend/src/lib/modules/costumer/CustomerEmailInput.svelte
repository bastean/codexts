<script lang="ts">
	import { CustomerEmail, CustomerEmailInvalid } from '$lib/stores/customer/CustomerEmail';
</script>

<input
	bind:value={$CustomerEmail}
	on:focus={(e) => {
		if (e.target instanceof HTMLInputElement) {
			CustomerEmailInvalid.set(false);
		}
	}}
	type="text"
	placeholder="Email"
	class={`input input-bordered w-full max-w-xs ${$CustomerEmailInvalid ? 'input-error' : ''}`}
/>
