import { MotherCreator } from './MotherCreator';

export class EmailMother {
	public static random(): string {
		return MotherCreator.random().internet.email();
	}
}
