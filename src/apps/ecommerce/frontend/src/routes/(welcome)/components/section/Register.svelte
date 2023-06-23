<script lang="ts">
	import CustomerEmailInput from '../module/CustomerEmailInput.svelte';
	import CustomerUsernameInput from '../module/CustomerUsernameInput.svelte';

	import Form from '$lib/components/dataInput/Form.svelte';
	import { Customer, isCustomerValid } from '$lib/stores/customer/Customer';
	import { put } from '$lib/utils/HTTPClient';

	const customerRegister = async () => {
		await put('/public/customer', $Customer);
		return 'Registration Successfully!';
	};
</script>

<Form
	isValid={isCustomerValid}
	handler={customerRegister}
	btnTitle="Register"
>
	<CustomerUsernameInput />
	<CustomerEmailInput />
</Form>
