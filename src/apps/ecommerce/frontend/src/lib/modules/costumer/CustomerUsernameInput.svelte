<script lang="ts">
	import Input from '$lib/components/dataInput/Input.svelte';
	import { CustomerUsername, CustomerUsernameInvalid } from '$lib/stores/customer/CustomerUsername';
</script>

<Input
	value={CustomerUsername}
	isInvalid={CustomerUsernameInvalid}
	type="text"
	placeholder="Username"
/>
