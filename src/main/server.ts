import chokidar from "chokidar";
import { config } from "dotenv";
import { logger } from "../utils/logger";
import { makeTicketLogEvent } from "./factories/ticket-log-event";
import { makeRaAdminLogEvent } from "./factories/ra-admin-log-event";
import { makeNewPlayerProfileEvent } from "./factories/new-player-profile-log-event";
import { makeBanLogEvent } from "./factories/ban-log-event";
import { makeChatLogEvent } from "./factories/chat-log-event";
import fs from "fs";
import { makeGameLogEvent } from "./factories/game-log-event";
import { makeGameStateEvent } from "./factories/game-state-event";
config();

const adminLogPath = "../../admin/logs/ra_adminlog.txt";
const watcherAminLog = chokidar.watch(adminLogPath);
watcherAminLog.on("change", (path) => makeRaAdminLogEvent().handle(path));

const ticketsLogPath = "../../admin/logs/tickets.log";
const watcherTicketsLog = chokidar.watch(ticketsLogPath);
watcherTicketsLog.on("change", (path) => makeTicketLogEvent().handle(path));

const newPlayerProfileLogPath = "../../admin/logs/playerprofiles.log";
const watcherNewPlayerProfileLog = chokidar.watch(newPlayerProfileLogPath);
watcherNewPlayerProfileLog.on("change", (path) =>
  makeNewPlayerProfileEvent().handle(path)
);

const banLogPath = "../../mods/pr/settings/banlist_info.log";
const watcherBanLog = chokidar.watch(banLogPath);
watcherBanLog.on("change", (path) => makeBanLogEvent().handle(path));

const chatLogPath = "../../admin/logs/";
const watcherChatLog = chokidar.watch(chatLogPath);
watcherChatLog.on("change", (path) => makeChatLogEvent().handle(path));

const gameLogPath = "../../json";
const watcherGameLog = chokidar.watch(gameLogPath, {
  persistent: true,
});
const processedFiles: Set<string> = new Set();

fs.readdir(gameLogPath, (err, files) => {
  if (err) {
    logger.error("Erro ao ler o diretório:", err);
    return;
  }

  files.forEach((file) => {
    processedFiles.add(`../../json/${file}`);
  });
});

watcherGameLog.on("add", async (path) => {
  if (processedFiles.has(path)) return;

  await makeGameLogEvent().handle(path);
});

// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const ONE_MINUTE = 60 * 1000;
setInterval(makeGameStateEvent().handle, ONE_MINUTE);

logger.info("Client has been started!");
