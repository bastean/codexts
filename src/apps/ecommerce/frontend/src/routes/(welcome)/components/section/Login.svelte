<script lang="ts">
	import Form from '$lib/components/form/Form.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { onSubmitHandler } from '$lib/contexts/customer/application/CustomerLogin';
	import { CustomerInputSchema } from '$lib/contexts/customer/schemas/CustomerInputSchema';

	const schemaToValidate = CustomerInputSchema.create({
		email: CustomerInputSchema.email().required(),
		password: CustomerInputSchema.password().required()
	});
</script>

<Form
	{schemaToValidate}
	{onSubmitHandler}
	submitButton="Login"
>
	<Input
		name="email"
		type="text"
		placeholder="Email"
	/>

	<Input
		name="password"
		type="password"
		placeholder="Password"
	/>
</Form>
