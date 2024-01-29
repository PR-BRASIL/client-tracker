import readLastLines from "read-last-lines";
import type { Event } from "../protocols/event";
import { socket } from "../../main/config/socket";

export class ChatLogEvent implements Event {
  public async handle(path: string): Promise<void> {
    if (!path.includes("./../admin/logs/chatlog")) return;

    const MAX_LINE = 1;
    const lastLine = (await readLastLines.read(path, MAX_LINE)).trim();

    socket.emit("chatLog", lastLine);
  }
}
