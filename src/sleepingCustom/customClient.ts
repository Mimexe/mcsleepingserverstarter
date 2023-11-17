import { Socket } from "net";
import { getLogger, LoggerType } from "../sleepingLogger";
import { CustomReceiver } from "./customReceiver";

const LoggerName = "[Client]";

export class CustomClient {
  socket: Socket;
  logger: LoggerType;
  customFramer: CustomReceiver;

  constructor(socket: Socket) {
    this.socket = socket;
    this.logger = getLogger();
    this.customFramer = new CustomReceiver();

    this.socket.on("connect", () => {
      this.logger.info(`${LoggerName} connect`);
    });
    this.socket.on("close", () => {
      this.logger.info(`${LoggerName} close`);
    });

    this.socket.on("drain", () => {
      this.logger.info(`${LoggerName} drain`);
    });
    this.socket.on("end", () => {
      this.logger.info(`${LoggerName} end`);
    });
    this.socket.on("error", () => {
      this.logger.info(`${LoggerName} error`);
    });
    this.socket.on("lookup", () => {
      this.logger.info(`${LoggerName} lookup`);
    });
    this.socket.on("ready", () => {
      this.logger.info(`${LoggerName} ready`);
    });
    this.socket.on("timeout", () => {
      this.logger.info(`${LoggerName} timeout`);
    });

    // this.socket.on("data", (data) => {
    //     this.logger.info(`${LoggerName} data`, data);
    //   });

    this.socket.pipe(this.customFramer);
  }
}
