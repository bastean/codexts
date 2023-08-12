import * as yup from 'yup';

export class CustomerInputSchema {
	public static create = yup.object;

	public static email(label: string = 'Email') {
		return yup.string().email().trim().lowercase().label(label);
	}

	public static username(label: string = 'Username') {
		return yup
			.string()
			.min(2)
			.max(20)
			.matches(/^[a-zA-Z0-9]+$/, 'Allowed characters: a-z, A-Z, 0-9')
			.trim()
			.label(label);
	}

	public static password(label: string = 'Password') {
		return yup.string().min(8).max(64).label(label);
	}

	public static confirmPassword(label: string = 'Confirm Password') {
		return yup
			.string()
			.min(8)
			.max(64)
			.oneOf([yup.ref('password')], 'Passwords do not match')
			.label(label);
	}
}
