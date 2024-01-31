import readLastLines from "read-last-lines";
import type { Event } from "../protocols/event";
import { socket } from "../../main/config/socket";
import { logger } from "../../utils/logger";

export class ChatLogEvent implements Event {
  public async handle(path: string): Promise<void> {
    if (!path.includes("./../admin/logs/chatlog")) return;

    const MAX_LINE = 1;
    const lastLine = (await readLastLines.read(path, MAX_LINE)).trim();

    if (this.isKillLog(lastLine)) {
      socket.emit("kill", lastLine);
      return;
    }

    if (this.isTeamKillLog(lastLine)) {
      socket.emit("teamKill", lastLine);
      return;
    }

    if (this.isConnectionLog(lastLine)) {
      socket.emit("connectionLog", lastLine);
      return;
    }

    socket.emit("chatLog", lastLine);
  }

  public isKillLog(message: string): boolean {
    const killText = " KILL]";
    const isKillLog = message.includes(killText);

    if (!isKillLog) return false;

    logger.debug("Kill log executed");
    return true;
  }

  public isTeamKillLog(message: string): boolean {
    const teamKillText = "TEAMKILL";
    const isTeamKillLog = message.includes(teamKillText);

    if (!isTeamKillLog) return false;

    logger.debug("Team kill log executed");
    return true;
  }

  public isConnectionLog(message: string): boolean {
    const connectText = "CONNECT";
    const disconnectText = "DISCONNECT";
    const isConnectionLog =
      message.includes(connectText) || message.includes(disconnectText);

    if (!isConnectionLog) return false;

    logger.debug("Connection log executed");
    return true;
  }
}
