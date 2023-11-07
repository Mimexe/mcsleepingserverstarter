import { getLogger, LoggerType } from "../sleepingLogger";
import { ISleepingServer } from "../sleepingServerInterface";
import { Settings } from "../sleepingSettings";
import { createServer, Server } from "net";

const LoggerName = "[CustomServer]";

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
    this.server.on("connection", () => {
      this.logger.info(`${LoggerName} connection`);
    });
    this.server.on("error", () => {
      this.logger.info(`${LoggerName} error`);
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
