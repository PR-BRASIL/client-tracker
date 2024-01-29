import readLastLines from "read-last-lines";
import { socket } from "../../main/config/socket";
import type { Event } from "../protocols/event";

export class BanLogEvent implements Event {
  public async handle(path: string): Promise<void> {
    const MAX_LINE = 1;
    const lastLine = (await readLastLines.read(path, MAX_LINE)).trim();

    socket.emit("banLog", lastLine);
  }
}
