import readLastLines from "read-last-lines";
import { socket } from "../../main/config/socket";

export const raAdminLogEvent = async (path: string) => {
  const lastLine = (await readLastLines.read(path, 1)).trim();

  socket.emit("adminLog", lastLine);

  const lastLineCommand = lastLine.split(" ")[2];
  switch (lastLineCommand.toLowerCase()) {
    case "!report":
      socket.emit("reportLog", lastLine);
      break;
  }
};
