<script lang="ts">
	import CustomerEmailInput from '../module/CustomerEmailInput.svelte';

	import Form from '$lib/components/dataInput/Form.svelte';
	import { CustomerEmail, isCustomerEmailValid } from '$lib/stores/customer/CustomerEmail';
	import { post, del } from '$lib/utils/HTTPClient';

	const customerDelete = async () => {
		const { data } = (await post('/public/customer', { email: $CustomerEmail })) as {
			data: { id: string };
		};
		await del(`/public/customer/${data.id}`);
		return 'Deleted Successfully!';
	};
</script>

<Form
	isValid={isCustomerEmailValid}
	handler={customerDelete}
	btnTitle="Delete"
>
	<CustomerEmailInput />
</Form>
