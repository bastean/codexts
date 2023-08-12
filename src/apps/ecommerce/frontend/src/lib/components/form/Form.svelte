<script lang="ts">
	import reporter from '@felte/reporter-tippy';
	import { validator } from '@felte/validator-yup';
	import { createForm } from 'felte';
	import { setContext } from 'svelte';

	import { showErrorNotification } from '$lib/stores/notification/ErrorNotification';
	import { showSuccessNotification } from '$lib/stores/notification/SuccessNotification';

	export let schemaToValidate;
	export let onSubmitHandler: (values: unknown) => Promise<string | void>;
	export let onSuccessHandler: null | ((error: unknown) => void) = null;
	export let onErrorHandler: null | ((error: unknown) => void) = null;
	export let submitButton: string;

	const { form, isValid, errors } = createForm({
		extend: [validator({ schema: schemaToValidate }), reporter()],
		async onSubmit(values) {
			const response = await onSubmitHandler(values);
			return response;
		},
		onSuccess(success) {
			if (onSuccessHandler === null && success !== undefined) {
				showSuccessNotification.set(success as string);
			}

			if (onSuccessHandler !== null) {
				onSuccessHandler(success);
			}
		},
		onError(error) {
			if (onErrorHandler === null && error !== undefined) {
				const { response } = error as { response: { data: { message: string } } };
				showErrorNotification.set(response.data.message);
			}

			if (onErrorHandler !== null) {
				onErrorHandler(error);
			}
		}
	});

	setContext('errors', errors);
</script>

<form
	use:form
	class="form-control items-center gap-4"
>
	<slot />

	<div class="mt-2 flex w-full flex-col items-center">
		<button
			disabled={!$isValid}
			type="submit"
			class="btn"
			>{submitButton}
		</button>
	</div>
</form>
