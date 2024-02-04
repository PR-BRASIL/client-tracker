import axios from "axios";
import type { Event } from "../protocols/event";
import { socket } from "../../main/config/socket";

export class GameStateEvent implements Event {
  public async handle(): Promise<void> {
    const { data } = await axios.get(
      "https://servers.realitymod.com/api/Serverinfo"
    );

    socket.emit(
      "gameState",
      data.servers.find(
        (server: { serverId: string }) =>
          server.serverId == "3cc9f2cf9ca951d98891eea56ccb0e4c7cfcfb85"
      )
    );
  }
}
