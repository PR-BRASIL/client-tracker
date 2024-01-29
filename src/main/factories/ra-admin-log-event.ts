import { LogEventDecorator } from "../../decorators/log";
import { RaAdminLogEvent } from "../../presentation/event/ra-admin-log";

export const makeRaAdminLogEvent = (): RaAdminLogEvent => {
  const event = new RaAdminLogEvent();

  return new LogEventDecorator(event);
};
