<script lang="ts">
	import Input from '$lib/components/dataInput/Input.svelte';
	import { CustomerEmail, CustomerEmailInvalid } from '$lib/stores/customer/CustomerEmail';
</script>

<Input
	value={CustomerEmail}
	isInvalid={CustomerEmailInvalid}
	type="text"
	placeholder="Email"
/>
