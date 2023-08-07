export interface CustomerHashing {
	hash(plain: string): string;
	isNotEqual(plain: string, hashed: string): boolean;
}
