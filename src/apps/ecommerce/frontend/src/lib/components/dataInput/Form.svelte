<script lang="ts">
	import { showErrorNotification } from '$lib/stores/notification/ErrorNotification';
	import { showSuccessNotification } from '$lib/stores/notification/SuccessNotification';

	export let isValid: () => boolean;
	export let handler: () => Promise<string | void>;
	export let btnTitle: string;

	const submit = async () => {
		if (isValid()) {
			try {
				const successMessage = await handler();
				if (successMessage !== undefined) showSuccessNotification.set(successMessage);
			} catch (error) {
				const { response } = error as { response: { data: { message: string } } };
				showErrorNotification.set(response.data.message);
			}
		} else {
			showErrorNotification.set('Please, check invalid values');
		}
	};
</script>

<form
	on:submit|preventDefault={submit}
	class="form-control items-center gap-4"
>
	<slot />

	<div class="mt-2 flex w-full flex-col items-center">
		<button
			type="submit"
			class="btn">{btnTitle}</button
		>
	</div>
</form>
