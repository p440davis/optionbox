import { load } from "./modules/load.js";
import { setup } from "./modules/setup.js";

window.optionbox = (userSettings) => {
    let settings = setup(userSettings);
    load.init(settings);
};