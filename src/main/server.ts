import chokidar from "chokidar";
import { config } from "dotenv";
import { logger } from "../utils/logger";
import { makeTicketLogEvent } from "./factories/ticket-log-event";
import { makeRaAdminLogEvent } from "./factories/ra-admin-log-event";
import { makeNewPlayerProfileEvent } from "./factories/new-player-profile-log-event";
import { makeBanLogEvent } from "./factories/ban-log-event";
import { makeChatLogEvent } from "./factories/chat-log-event";
config();

const adminLog = "../../admin/logs/ra_adminlog.txt";
const watcherAminLog = chokidar.watch(adminLog);
watcherAminLog.on("change", (path) => makeRaAdminLogEvent().handle(path));

const ticketsLog = "../../admin/logs/tickets.log";
const watcherTicketsLog = chokidar.watch(ticketsLog);
watcherTicketsLog.on("change", (path) => makeTicketLogEvent().handle(path));

const newPlayerProfileLog = "../../admin/logs/playerprofiles.log";
const watcherNewPlayerProfileLog = chokidar.watch(newPlayerProfileLog);
watcherNewPlayerProfileLog.on("change", (path) =>
  makeNewPlayerProfileEvent().handle(path)
);

const banLog = "../../mods/pr/settings/banlist_info.log";
const watcherBanLog = chokidar.watch(banLog);
watcherBanLog.on("change", (path) => makeBanLogEvent().handle(path));

const watcher = chokidar.watch("../../admin/logs/");
watcher.on("change", (path) => makeChatLogEvent().handle(path));

logger.info("Client has been started!");
