import { get } from "./core/get.js";
import { create } from "./core/create.js";
import { update } from "./core/update.js";

window.optionbox = (userConfig) => {
    // Get
    let prefix = "_optionbox";
    let storageExists = get.storageExists();
    let config = get.config(userConfig);
    let storedValues = get.storedValues(storageExists, config.persist, prefix);
    let selectElements = get.selectElements(config.select);
    // Create
    let optionboxes = create.optionboxes(selectElements, storedValues, prefix);
    // Updates
    update.trigger(optionboxes);
};