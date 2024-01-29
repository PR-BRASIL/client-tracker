import { socket } from "../../main/config/socket";
import { logger } from "../../utils/logger";
import type { Event } from "../protocols/event";
import fs from "fs";

export class GameLogEvent implements Event {
  public async handle(path: string): Promise<void> {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        logger.error("Erro ao ler o arquivo:", err);
        return;
      }

      const jsonData = JSON.parse(data);
      console.log(jsonData);

      socket.emit("gameLog", jsonData);
    });
  }
}
