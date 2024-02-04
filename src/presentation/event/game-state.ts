import axios from "axios";
import type { Event } from "../protocols/event";
import { socket } from "../../main/config/socket";
import { logger } from "../../utils/logger";

export class GameStateEvent implements Event {
  public async handle(): Promise<void> {
    const { data } = await axios.get(
      "https://servers.realitymod.com/api/Serverinfo"
    );

    const serverInfo = data.servers.find(
      (server: { serverId: string }) =>
        // server.serverId == "3cc9f2cf9ca951d98891eea56ccb0e4c7cfcfb85"
        server.serverId == "3cc9f2cf9ca951d98891eea56ccb0e4c7cfcfb85"
    );
    logger.debug("serverinfo executed");

    socket.emit("gameState", serverInfo);
  }
}
