const get = {
    defaultConfig: {
        persist: true,
        prefix: "_optionbox",
        select: "select"
    },

    config(userConfig) {
        let mergedConfig = Object.assign(this.defaultConfig, userConfig);

        if (mergedConfig.persist) {
            mergedConfig.persist = this.storageExists();
        }

        return mergedConfig;
    },

    storageExists() {
        if (typeof Storage !== undefined) {
            return true;
        }

        return false;
    },

    storedValues(config) {
        if (config.persist) {
            return sessionStorage.getItem(config.prefix);
        }

        return {};
    },

    selectElements(selector) {
        let elements = document.querySelectorAll(selector);
        let selects = [];

        if (elements.length) {
            [].forEach.call(elements, element => {
                if (element.tagName === "SELECT") {
                    selects.push(element);
                } else
                    console.warn(
                        "Optionbox warning: Your selection includes a <" +
                        element.tagName.toLowerCase() +
                        ">. Only <select> elements can be converted to an optionbox"
                    );
            });
        }

        return selects;
    }
};

export { get };