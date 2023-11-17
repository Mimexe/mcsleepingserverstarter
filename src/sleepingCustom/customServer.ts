import { getLogger, LoggerType } from "../sleepingLogger";
import { ISleepingServer } from "../sleepingServerInterface";
import { Settings } from "../sleepingSettings";
import { createServer, Server } from "net";
import { CustomClient } from "./customClient";

const LoggerName = "[Server]";

export class SleepingCustomServer implements ISleepingServer {
  settings: Settings;
  logger: LoggerType;
  server?: Server;

  constructor(settings: Settings) {
    this.settings = settings;
    this.logger = getLogger();
  }

  init = async () => {
    this.logger.info(`${LoggerName} init ${this.settings.customServer}`);

    this.server = createServer();
    this.server.on("connection", (socket) => {
      this.logger.info(`${LoggerName} connection`);
      new CustomClient(socket);
      
    });
    this.server.on("error", (error) => {
      this.logger.info(`${LoggerName} error`, error);
    });
    this.server.on("drop", () => {
      this.logger.info(`${LoggerName} drop`);
    });
    this.server.on("listening", () => {
      this.logger.info(`${LoggerName} listening`);
    });
    this.server.on("close", () => {
      this.logger.info(`${LoggerName} close`);
    });
    this.server.listen(this.settings.customServer);
  };
  close = async () => {
    this.logger.info(`${LoggerName} close`);

    this.server?.close();
  };
}
