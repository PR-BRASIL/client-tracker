import readLastLines from "read-last-lines";
import { socket } from "../../main/config/socket";

export const ticketsLogEvent = async (path: string) => {
  const lastLine = (await readLastLines.read(path, 1)).trim();

  socket.emit("ticketsLog", lastLine);
};
