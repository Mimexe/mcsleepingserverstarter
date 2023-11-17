import { SleepingCustomServer } from "./sleepingCustom/customServer";
import { getLogger } from "./sleepingLogger";
import { getSettings } from "./sleepingSettings";

const logger = getLogger();

const settings = getSettings();
const customServer = new SleepingCustomServer(settings);
customServer.init();
