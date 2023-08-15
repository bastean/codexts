<script lang="ts">
	import { toast } from 'svelte-sonner';

	import Form from '$lib/components/form/Form.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { onSubmitHandler } from '$lib/contexts/customer/application/CustomerRegister';
	import { CustomerInputSchema } from '$lib/contexts/customer/schemas/CustomerInputSchema';

	export let currentChecked: string;

	const schemaToValidate = CustomerInputSchema.create({
		email: CustomerInputSchema.email(),
		username: CustomerInputSchema.username(),
		password: CustomerInputSchema.password(),
		confirmPassword: CustomerInputSchema.confirmPassword()
	});

	const onSuccessHandler = () => {
		toast.success('Successfully registered!');
		setTimeout(() => {
			currentChecked = 'Login';
		}, 4000);
	};
</script>

<Form
	{schemaToValidate}
	{onSubmitHandler}
	{onSuccessHandler}
	submitButton="Register"
>
	<Input
		name="email"
		type="text"
		placeholder="Email"
	/>

	<Input
		name="username"
		type="text"
		placeholder="Username"
	/>

	<Input
		name="password"
		type="password"
		placeholder="Password"
	/>

	<Input
		name="confirmPassword"
		type="password"
		placeholder="Confirm Password"
	/>
</Form>
