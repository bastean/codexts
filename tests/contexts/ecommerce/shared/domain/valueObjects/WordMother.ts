import { MotherCreator } from './MotherCreator';

export class WordMother {
	public static random({
		minLength = 2,
		maxLength
	}: {
		minLength?: number;
		maxLength: number;
	}): string {
		return MotherCreator.random().lorem.word({ length: { min: minLength, max: maxLength } });
	}
}
