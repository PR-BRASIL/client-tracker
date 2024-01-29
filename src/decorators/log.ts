import type { Event } from "../presentation/protocols/event";
import { logger } from "../utils/logger";

export class LogEventDecorator implements Event {
  public constructor(private readonly event: Event) {}

  public async handle(path: string): Promise<void> {
    logger.info(`Event of ${path} executed`);
    const result = await this.event.handle(path);
    logger.debug(result);

    return result;
  }
}
