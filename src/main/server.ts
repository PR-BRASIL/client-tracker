import chokidar from "chokidar";
import { config } from "dotenv";
import { logger } from "../utils/logger";
import { banLogEvent } from "../presentation/event/ban-log";
import { makeTicketLogEvent } from "./factories/ticket-log-event";
import { makeRaAdminLogEvent } from "./factories/ra-admin-log-event";
import { makeNewPlayerProfileEvent } from "./factories/new-player-profile-log-event";
config();

const adminLog = "../../admin/logs/ra_adminlog.txt";
const watcherAminLog = chokidar.watch(adminLog);
watcherAminLog.on("change", makeRaAdminLogEvent().handle);

const ticketsLog = "../../admin/logs/tickets.log";
const watcherTicketsLog = chokidar.watch(ticketsLog);
watcherTicketsLog.on("change", makeTicketLogEvent().handle);

const newPlayerProfileLog = "../../admin/logs/playerprofiles.log";
const watcherNewPlayerProfileLog = chokidar.watch(newPlayerProfileLog);
watcherNewPlayerProfileLog.on("change", makeNewPlayerProfileEvent().handle);

const banLog = "../../mods/pr/settings/banlist_info.log";
const watcherBanLog = chokidar.watch(banLog);
watcherBanLog.on("change", banLogEvent);

logger.info("Client has been started!");
