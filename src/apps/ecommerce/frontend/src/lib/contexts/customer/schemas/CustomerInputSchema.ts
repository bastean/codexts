import * as yup from 'yup';

type Params = {
	isNotRequired?: boolean;
	dependsOn?: string;
};

const avoidCyclicDependency = (dependencies: string[]): [string, string][] =>
	dependencies.map((dependency) => [dependency, dependency]);

export class CustomerInputSchema {
	public static create = (schema: yup.ObjectShape) =>
		yup
			.object()
			.shape(
				schema,
				avoidCyclicDependency([
					'email',
					'username',
					'password',
					'currentPassword',
					'updatedPassword',
					'confirmPassword'
				])
			);

	public static email({ isNotRequired }: Params = { isNotRequired: false }) {
		return yup
			.string()
			.when('email', {
				is: (value: string) => value === '' && isNotRequired,
				then: (schema) => schema.notRequired(),
				otherwise: (schema) => schema.trim().lowercase().email().required()
			})
			.label('Email');
	}

	public static username({ isNotRequired }: Params = { isNotRequired: false }) {
		return yup
			.string()
			.when('username', {
				is: (value: string) => value === '' && isNotRequired,
				then: (schema) => schema.notRequired(),
				otherwise: (schema) =>
					schema
						.trim()
						.min(2)
						.max(20)
						.matches(/^[a-zA-Z0-9]+$/, 'Allowed characters: a-z, A-Z, 0-9')
						.required()
			})
			.label('Username');
	}

	public static password({ isNotRequired }: Params = { isNotRequired: false }) {
		return yup
			.string()
			.when('password', {
				is: (value: string) => value === '' && isNotRequired,
				then: (schema) => schema.notRequired(),
				otherwise: (schema) => schema.min(8).max(64).required()
			})
			.label('Password');
	}

	public static currentPassword(
		{ isNotRequired, dependsOn }: Params = { isNotRequired: false, dependsOn: 'currentPassword' }
	) {
		return yup
			.string()
			.when(`${dependsOn}`, {
				is: (value: string) => value === '' && isNotRequired,
				then: (schema) => schema.notRequired(),
				otherwise: (schema) => schema.min(8).max(64).required()
			})
			.label('Current Password');
	}

	public static updatedPassword({ isNotRequired }: Params = { isNotRequired: false }) {
		return yup
			.string()
			.when('updatedPassword', {
				is: (value: string) => value === '' && isNotRequired,
				then: (schema) => schema.notRequired(),
				otherwise: (schema) => schema.min(8).max(64).required()
			})
			.label('Updated Password');
	}

	public static confirmPassword(
		{ isNotRequired, dependsOn }: Params = { isNotRequired: false, dependsOn: 'password' }
	) {
		return yup
			.string()
			.when(`${dependsOn}`, {
				is: (value: string) => value === '' && isNotRequired,
				then: (schema) => schema.notRequired(),
				otherwise: (schema) =>
					schema
						.min(8)
						.max(64)
						.oneOf([yup.ref(`${dependsOn}`)], 'Passwords do not match')
						.required()
			})
			.label('Confirm Password');
	}
}
