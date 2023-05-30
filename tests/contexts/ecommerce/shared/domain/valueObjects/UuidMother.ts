import { MotherCreator } from './MotherCreator';

export class UuidMother {
	public static random(): string {
		return MotherCreator.random().string.uuid();
	}
}
