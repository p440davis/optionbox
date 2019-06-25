import { get } from "./_get";
import { create } from "./_create";
import { update } from "./_update";
import { debug } from "util";

(<any>window).optionbox = (userConfig) => {
    let config = get.config(userConfig);
    let selectElements = get.selectElements(config.select);

    let optionboxes = create.optionboxes(config, selectElements);

    update.listen(config, optionboxes);
    update.init(optionboxes);
};

debug;