import type { WatchOptions } from "chokidar";
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
import path from "path";  // Importando path para garantir caminhos corretos

config();

const chokidarOptions: WatchOptions = {
  usePolling: true,
  interval: 100,  // Ajustando intervalo para polling
};

const adminLogPath = env.adminLogPath;
const watcherAminLog = chokidar.watch(adminLogPath, chokidarOptions);
watcherAminLog.on("change", (path) => makeRaAdminLogEvent().handle(path));

const ticketsLogPath = env.ticketsLogPath;
const watcherTicketsLog = chokidar.watch(ticketsLogPath, chokidarOptions);
watcherTicketsLog.on("change", (path) => makeTicketLogEvent().handle(path));

const watcherNewPlayerProfileLog = chokidar.watch(
  env.newPlayerProfilePath,
  chokidarOptions
);
watcherNewPlayerProfileLog.on("change", (path) =>
  makeNewPlayerProfileEvent().handle(path)
);

const watcherBanLog = chokidar.watch(env.banLogPath, chokidarOptions);
watcherBanLog.on("change", (path) => makeBanLogEvent().handle(path));

const watcherChatLog = chokidar.watch(env.chatLogPath, chokidarOptions);
watcherChatLog.on("change", (path) => makeChatLogEvent().handle(path));

const gameLogPath = env.gameLogPath;
const watcherGameLog = chokidar.watch(gameLogPath, {
  persistent: true,
  ...chokidarOptions,
});

const processedFiles: Set<string> = new Set();

// Lendo o diretório do log de jogos e registrando os arquivos processados
fs.readdir(gameLogPath, (err, files) => {
  if (err) {
    logger.error("Erro ao ler o diretório:", err);
    return;
  }

  files.forEach((file) => {
    const fullFilePath = path.join(gameLogPath, file);  // Usando path.join para garantir o caminho correto
    processedFiles.add(fullFilePath);
  });
});

// Observando a adição de novos arquivos no log de jogos
watcherGameLog.on("add", async (path) => {
  let fileReady = false;

  // Por exemplo, verificando se o arquivo tem tamanho maior que 0 bytes
  while (!fileReady) {
    const stats = await fs.promises.stat(path);
    if (stats.size > 0) {
      fileReady = true;
    } else {
      // Se o arquivo ainda não estiver pronto, aguarde um pouco e tente novamente
      await new Promise((resolve) => setTimeout(resolve, 500));  // Aguarda 500ms
    }
  }

  console.log("Arquivo pronto para ser processado:", path);
  if (processedFiles.has(path)) return;

  await makeGameLogEvent().handle(path);
});

// Definindo um intervalo para o evento de estado do jogo
// eslint-disable-next-line @typescript-eslint/no-magic-numbers
const ONE_MINUTE = 60 * 1000;
setInterval(makeGameStateEvent().handle, ONE_MINUTE);

logger.info("Client has been started!");
