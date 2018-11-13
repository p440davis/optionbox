const get = {
    config(userConfig) {
        const defaultConfig = {
            persist: true,
            select: "select"
        };

        let mergedConfig = Object.assign(defaultConfig, userConfig);

        return mergedConfig;
    },

    storageExists() {
        if (typeof Storage !== undefined) {
            return true;
        }

        return false;
    },

    storedValues(storageExists, persist, prefix) {
        if (storageExists && persist) {
            return sessionStorage.getItem(prefix);
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