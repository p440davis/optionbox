import { get } from "./_get.js";
import { create } from "./_create.js";
import { update } from "./_update.js";

window.optionbox = (userConfig) => {
    let config = get.config(userConfig);
    let selectElements = get.selectElements(config.select);

    let optionboxes = create.optionboxes(config, selectElements);

    update.listen(config, optionboxes);
    update.init(optionboxes);
};