import type { Event } from "../presentation/protocols/event";
import { logger } from "../utils/logger";

export class LogEventDecorator implements Event {
  public constructor(private readonly event: Event) {}

  public async handle(path: string): Promise<void> {
    await this.event.handle(path);
    logger.info(`Event of ${path} executed`);

    return;
  }
}
