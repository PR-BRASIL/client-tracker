import readLastLines from "read-last-lines";
import { socket } from "../../main/config/socket";

export const raAdminLogEvent = async (path: string) => {
  const MAX_LINE = 1;
  const lastLine = (await readLastLines.read(path, MAX_LINE)).trim();

  socket.emit("adminLog", lastLine);

  const COMMAND_INDEX = 2;
  const lastLineCommand = lastLine.split(" ")[COMMAND_INDEX];
  switch (lastLineCommand.toLowerCase()) {
    case "!report":
      socket.emit("reportLog", lastLine);
      break;
  }
};
