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
import { env } from "./config/env";
config();

const adminLogPath = env.adminLogPath;
const watcherAminLog = chokidar.watch(adminLogPath);
watcherAminLog.on("change", (path) => makeRaAdminLogEvent().handle(path));

const ticketsLogPath = env.ticketsLogPath;
const watcherTicketsLog = chokidar.watch(ticketsLogPath);
watcherTicketsLog.on("change", (path) => makeTicketLogEvent().handle(path));

const watcherNewPlayerProfileLog = chokidar.watch(env.newPlayerProfilePath);
watcherNewPlayerProfileLog.on("change", (path) =>
  makeNewPlayerProfileEvent().handle(path)
);

const watcherBanLog = chokidar.watch(env.banLogPath);
watcherBanLog.on("change", (path) => makeBanLogEvent().handle(path));

const watcherChatLog = chokidar.watch(env.chatLogPath);
watcherChatLog.on("change", (path) => makeChatLogEvent().handle(path));

const gameLogPath = env.gameLogPath;
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
    processedFiles.add(`${gameLogPath}${file}`);
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
