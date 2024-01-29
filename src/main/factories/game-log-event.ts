import { LogEventDecorator } from "../../decorators/log";
import { GameLogEvent } from "../../presentation/event/game-log";

export const makeGameLogEvent = () => {
  const event = new GameLogEvent();

  return new LogEventDecorator(event);
};
