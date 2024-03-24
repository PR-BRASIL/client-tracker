import { config } from "dotenv";

config();

export const env = {
  apiUrl: process.env.SOCKET_API || "http://localhost:8080",
  adminLogPath: process.env.ADMIN_LOG_PATH,
  ticketsLogPath: process.env.TICKETS_LOG_PATH,
  newPlayerProfilePath: process.env.NEW_PLAYER_PROFILE_PATH,
  banLogPath: process.env.BAN_LOG_PATH,
  chatLogPath: process.env.CHAT_LOG_PATH,
  gameLogPath: process.env.GAME_LOG_PATH,
};
