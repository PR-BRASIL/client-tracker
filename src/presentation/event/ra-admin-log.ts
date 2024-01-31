import readLastLines from "read-last-lines";
import { socket } from "../../main/config/socket";
import type { Event } from "../protocols/event";
import { logger } from "../../utils/logger";

export class RaAdminLogEvent implements Event {
  public async handle(path: string): Promise<void> {
    const MAX_LINE = 1;
    const lastLine = (await readLastLines.read(path, MAX_LINE)).trim();

    if (this.isReportLog(lastLine)) {
      socket.emit("reportLog", lastLine);
      return;
    }

    socket.emit("adminLog", lastLine);
  }

  private isReportLog(message: string): boolean {
    const reportText = "!REPORT";
    const isReportLog = message.includes(reportText);

    if (!isReportLog) return false;

    logger.debug("Report log executed");
    return true;
  }
}
