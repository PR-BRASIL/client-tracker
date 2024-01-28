import readLastLines from "read-last-lines";
import { socket } from "../../main/config/socket";

export const banLogEvent = async (path: string) => {
  const MAX_LINE = 1;
  const lastLine = (await readLastLines.read(path, MAX_LINE)).trim();

  socket.emit("banLog", lastLine);
};
