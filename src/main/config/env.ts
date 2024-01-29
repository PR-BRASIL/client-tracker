import { config } from "dotenv";

config();

export const env = {
  apiUrl: process.env.SOCKET_API || "http://localhost:8080",
};
