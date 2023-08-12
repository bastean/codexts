export class CustomerJWTStore {
	private static readonly key: string = 'codexts-jwt-customer';

	public static set(jwt: string): void {
		localStorage.setItem(this.key, jwt);
	}

	public static get(): string {
		return localStorage.getItem(this.key) ?? '';
	}

	public static remove(): void {
		localStorage.removeItem(this.key);
	}
}
