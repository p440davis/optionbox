import { get } from "./_get.js";
import { create } from "./_create.js";
import { update } from "./_update.js";

window.optionbox = (userConfig) => {
    let config = get.config(userConfig);
    let storedValues = get.storedValues(config);
    let selectElements = get.selectElements(config.select);

    let optionboxes = create.optionboxes(config, storedValues, selectElements);

    update.listen(config, optionboxes);
    update.init(optionboxes);
};