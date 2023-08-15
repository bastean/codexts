<script lang="ts">
	import { toast } from 'svelte-sonner';

	import Form from '$lib/components/form/Form.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { onSubmitHandler } from '$lib/contexts/customer/application/CustomerDelete';
	import { CustomerInputSchema } from '$lib/contexts/customer/schemas/CustomerInputSchema';
	import { CustomerJWTStore } from '$lib/contexts/customer/stores/CustomerJWTStore';
	import { CustomerStore } from '$lib/contexts/customer/stores/CustomerStore';

	const schemaToValidate = CustomerInputSchema.create({
		password: CustomerInputSchema.password()
	});

	const onSuccessHandler = () => {
		toast.success('Successfully deleted!');

		CustomerJWTStore.set(null);
		CustomerJWTStore.delete();

		CustomerStore.set(null);
		CustomerStore.delete();
	};
</script>

<Form
	{schemaToValidate}
	{onSubmitHandler}
	{onSuccessHandler}
	submitButton="Delete"
>
	<Input
		name="password"
		type="password"
		placeholder="Password"
	/>
</Form>
