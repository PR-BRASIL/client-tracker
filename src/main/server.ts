import chokidar from "chokidar";
import { raAdminLogEvent } from "../presentation/event/ra-admin-log";
import { newPlayerProfileLogEvent } from "../presentation/event/new-player-profile-log";
import { config } from "dotenv";
import { logger } from "../utils/logger";
import { banLogEvent } from "../presentation/event/ban-log";
import { makeTicketLogEvent } from "./factories/ticket-log-event";
config();

const adminLog = "../../admin/logs/ra_adminlog.txt";
const watcherAminLog = chokidar.watch(adminLog);
watcherAminLog.on("change", raAdminLogEvent);

const ticketsLog = "../../admin/logs/tickets.log";
const watcherTicketsLog = chokidar.watch(ticketsLog);
watcherTicketsLog.on("change", makeTicketLogEvent().handle);

const newPlayerProfileLog = "../../admin/logs/playerprofiles.log";
const watcherNewPlayerProfileLog = chokidar.watch(newPlayerProfileLog);
watcherNewPlayerProfileLog.on("change", newPlayerProfileLogEvent);

const banLog = "../../mods/pr/settings/banlist_info.log";
const watcherBanLog = chokidar.watch(banLog);
watcherBanLog.on("change", banLogEvent);

logger.info("Client has been started!");
