<script lang="ts">
	import { toast } from 'svelte-sonner';

	import Form from '$lib/components/form/Form.svelte';
	import Input from '$lib/components/form/Input.svelte';
	import { onSubmitHandler } from '$lib/contexts/customer/application/CustomerUpdate';
	import { CustomerInputSchema } from '$lib/contexts/customer/schemas/CustomerInputSchema';
	import { CustomerStore } from '$lib/contexts/customer/stores/CustomerStore';

	let { email, username } = $CustomerStore ?? { email: '', username: '' };

	const schemaToValidate = CustomerInputSchema.create({
		email: CustomerInputSchema.email({ isNotRequired: true }),
		username: CustomerInputSchema.username({ isNotRequired: true }),
		currentPassword: CustomerInputSchema.currentPassword({
			isNotRequired: true,
			dependsOn: 'updatedPassword'
		}),
		updatedPassword: CustomerInputSchema.updatedPassword({ isNotRequired: true }),
		confirmPassword: CustomerInputSchema.confirmPassword({
			isNotRequired: true,
			dependsOn: 'updatedPassword'
		})
	});

	const onSuccessHandler = () => {
		toast.success('Successfully updated!');
		CustomerStore.set({ ...$CustomerStore, email, username });
	};
</script>

<Form
	{schemaToValidate}
	{onSubmitHandler}
	{onSuccessHandler}
	submitButton="Update"
>
	<Input
		name="email"
		type="text"
		placeholder="Email"
		bind:value={email}
	/>

	<Input
		name="username"
		type="text"
		placeholder="Username"
		bind:value={username}
	/>

	<Input
		name="currentPassword"
		type="password"
		placeholder="Current Password"
	/>

	<Input
		name="updatedPassword"
		type="password"
		placeholder="New Password"
	/>

	<Input
		name="confirmPassword"
		type="password"
		placeholder="Confirm Password"
	/>
</Form>
