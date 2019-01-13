const get = {
    defaultConfig: {
        persist: window.location.pathname,
        prefix: "_optionbox",
        select: "select"
    },

    config(userConfig) {
        let config = Object.assign(this.defaultConfig, userConfig);

        if (!this.storageExists()) {
            config.persist = false;
        }

        return config;
    },

    storageExists() {
        if (typeof Storage !== undefined) {
            return true;
        }

        return false;
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