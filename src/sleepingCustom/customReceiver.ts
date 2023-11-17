import { Transform, TransformCallback, TransformOptions } from "stream";
import { getLogger, LoggerType } from "../sleepingLogger";
import { types } from "protodef";

const LoggerName = "[Receiver]";

const [readVarInt, writeVarInt, sizeOfVarInt] = types.varint;

export class CustomReceiver extends Transform {
  logger: LoggerType;
  buffer: Buffer;

  constructor(opts?: TransformOptions) {
    super(opts);
    this.logger = getLogger();
    this.buffer = Buffer.alloc(0);
  }

  _transform(
    chunk: any,
    encoding: BufferEncoding,
    callback: TransformCallback
  ) {
    this.logger.info(`${LoggerName} _transform`, types);

    let offset = 0;
    let value, size;
    let stop = false;
    try {
      ({ value, size } = readVarInt(this.buffer, offset));
      this.logger.info(`${LoggerName} _`, value, size);
    } catch (e: any) {
      this.logger.info(`${LoggerName} e`, e);
      if (!e.partialReadError) {
        throw e;
      } else {
        stop = true;
      }
    }
    this.logger.info(`${LoggerName} stop`, stop, value, size);
    if (!stop) {
      while (this.buffer.length >= offset + size + value) {
        try {
          this.push(this.buffer.slice(offset + size, offset + size + value));
          offset += size + value;
          ({ value, size } = readVarInt(this.buffer, offset));
          this.logger.info(`${LoggerName} __`, value, size);
        } catch (e: any) {
          if (e.partialReadError) {
            break;
          } else {
            throw e;
          }
        }
      }
    }
    this.buffer = this.buffer.slice(offset);
    return callback();
  }
}
