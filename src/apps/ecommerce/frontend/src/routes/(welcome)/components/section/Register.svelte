<script lang="ts">
	import CustomerEmailInput from '../module/CustomerEmailInput.svelte';
	import CustomerUsernameInput from '../module/CustomerUsernameInput.svelte';

	import Form from '$lib/components/dataInput/Form.svelte';
	import { Customer, isCustomerValid } from '$lib/stores/customer/Customer';
	import { showErrorNotification } from '$lib/stores/notification/ErrorNotification';
	import { showSuccessNotification } from '$lib/stores/notification/SuccessNotification';
	import { put } from '$lib/utils/HTTPClient';

	const register = async () => {
		if (isCustomerValid()) {
			try {
				await put('/public/customer', $Customer);
				showSuccessNotification.set('Registration Successfully!');
			} catch (error) {
				const { response } = error as { response: { data: { message: string } } };
				showErrorNotification.set(response.data.message);
			}
		} else {
			showErrorNotification.set('Please, check invalid values');
		}
	};
</script>

<Form
	handler={register}
	btnTitle="Register"
>
	<CustomerUsernameInput />
	<CustomerEmailInput />
</Form>
