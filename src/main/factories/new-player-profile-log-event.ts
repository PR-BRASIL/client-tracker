import { LogEventDecorator } from "../../decorators/log";
import { NewPlayerProfileLogEvent } from "../../presentation/event/new-player-profile-log";

export const makeNewPlayerProfileEvent = () => {
  const event = new NewPlayerProfileLogEvent();

  return new LogEventDecorator(event);
};
