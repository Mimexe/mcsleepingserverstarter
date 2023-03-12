import { Config, Logger, Server } from '@vincss/prismarine';

import { getLogger, LoggerType } from './sleepingLogger';
import { ISleepingServer } from './sleepingServerInterface';
import { Settings } from './sleepingSettings';
import { PlayerConnectionCallBackType } from './sleepingTypes';

const Address = '0.0.0.0';
const version = '0.0.0';
const PlayerName = 'A BedRock player';

export class SleepingBedrock implements ISleepingServer {

    settings: Settings;
    logger: LoggerType;
    server: Server;

    playerConnectionCallBack: PlayerConnectionCallBackType;

    constructor(settings: Settings, playerConnectionCallBack: PlayerConnectionCallBackType) {
        this.settings = settings;

        this.playerConnectionCallBack = playerConnectionCallBack;

        this.logger = getLogger();
        const logger = new Logger();
        const config = new Config(version);
        this.server = new Server({
            config,
            version,
        });
    }

    init = async () => {
        this.server.bootstrap(Address, this.settings.bedrockPort, this.onConnection);
    }

    private onConnection = () => {
        this.logger.info(`[BedRock] onConnection`)
        this.playerConnectionCallBack(PlayerName);        
    };

    close = async () => {
        this.logger.info(`[BedRock] Closing`);
        await this.server?.shutdown();
    }

}