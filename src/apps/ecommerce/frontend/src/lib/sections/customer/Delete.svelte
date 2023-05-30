<script lang="ts">
	import Form from '$lib/components/dataInput/Form.svelte';
	import CustomerEmailInput from '$lib/modules/costumer/CustomerEmailInput.svelte';
	import { CustomerEmail, isCustomerEmailValid } from '$lib/stores/customer/CustomerEmail';
	import { showErrorNotification } from '$lib/stores/notification/ErrorNotification';
	import { showSuccessNotification } from '$lib/stores/notification/SuccessNotification';
	import { post, del } from '$lib/utils/HTTPClient';

	const customerDelete = async () => {
		if (isCustomerEmailValid()) {
			try {
				const { data } = (await post('/public/customer', { email: $CustomerEmail })) as {
					data: { id: string };
				};
				await del(`/public/customer/${data.id}`);
				showSuccessNotification.set('Deleted Successfully!');
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
	handler={customerDelete}
	btnTitle="Delete"
>
	<CustomerEmailInput />
</Form>
