import readLastLines from "read-last-lines";
import type { Event } from "../protocols/event";
import { socket } from "../../main/config/socket";
import { logger } from "../../utils/logger";

export class ChatLogEvent implements Event {
  public async handle(path: string): Promise<void> {
    if (!path.includes("./../admin/logs/chatlog")) return;

    const MAX_LINE = 1;
    const lastLine = (await readLastLines.read(path, MAX_LINE)).trim();
    const killText = " KILL]";
    const isKillLog = lastLine.includes(killText);

    if (isKillLog) {
      logger.info("Kill log executed");
      socket.emit("kill");
      return;
    }

    socket.emit("chatLog", lastLine);
  }
}
