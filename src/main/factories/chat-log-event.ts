import { LogEventDecorator } from "../../decorators/log";
import { ChatLogEvent } from "../../presentation/event/chat-log";

export const makeChatLogEvent = () => {
  const event = new ChatLogEvent();

  return new LogEventDecorator(event);
};
