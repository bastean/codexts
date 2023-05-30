import type { Command } from './Command';

export interface CommandHandler<C extends Command> {
	handle(command: C): Promise<void>;
}
