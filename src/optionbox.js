import { load } from "./core/load.js";
import { setup } from "./core/setup.js";

window.optionbox = (userSettings) => {
    let settings = setup(userSettings);
    load.init(settings);
};