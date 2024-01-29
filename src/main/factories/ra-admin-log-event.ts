import { LogEventDecorator } from "../../decorators/log";
import { RaAdminLogEvent } from "../../presentation/event/ra-admin-log";

export const makeRaAdminLogEvent = () => {
  const event = new RaAdminLogEvent();

  return new LogEventDecorator(event);
};
