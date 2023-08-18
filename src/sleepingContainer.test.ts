import { DefaultSettings } from "./sleepingSettings.js";
import { SleepingContainer } from "./sleepingContainer.js";

test("should start the container with default settings", (done) => {
  new SleepingContainer((settings) => {
    expect(settings).toEqual(DefaultSettings);
    done();
  });
});
