<script lang="ts">
	import Form from '$lib/components/dataInput/Form.svelte';
	import CustomerEmailInput from '$lib/modules/costumer/CustomerEmailInput.svelte';
	import { CustomerEmail, isCustomerEmailValid } from '$lib/stores/customer/CustomerEmail';
	import { showErrorNotification } from '$lib/stores/notification/ErrorNotification';
	import { post } from '$lib/utils/HTTPClient';

	let CustomerData: { username: string; email: string };
	let willShowModal = false;

	const find = async () => {
		if (isCustomerEmailValid()) {
			try {
				const { data } = (await post('/public/customer', { email: $CustomerEmail })) as {
					data: { username: string; email: string };
				};
				CustomerData = data;
				willShowModal = true;
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
	handler={find}
	btnTitle="Find"
>
	<CustomerEmailInput />
</Form>

{#if willShowModal}
	<div class="absolute w-full max-w-xs translate-y-2/4">
		<div class="modal-box w-full text-center font-black">
			<button
				on:click={() => {
					willShowModal = false;
				}}
				type="button"
				class="btn btn-sm btn-circle absolute right-2 top-2">✕</button
			>

			<h2 class="text-xl">Found</h2>
			<div class="divider" />
			<div class="fon-bold flex flex-col gap-2 text-lg">
				<h3>{CustomerData.username}</h3>
				<h3>{CustomerData.email}</h3>
			</div>
		</div>
	</div>
{/if}
