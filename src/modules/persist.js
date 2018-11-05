const persist = {
    storageExists: typeof (Storage) !== "undefined" ? true : false,

    key(name) {
        return "optionbox-" + name;
    },

    store(name, value) {
        if (this.storageExists) {
            sessionStorage.setItem(this.key(name), value);
        }
    },

    remove(name) {
        if (this.storageExists) {
            sessionStorage.removeItem(this.key(name));
        }
    },

    get(name) {
        if (this.storageExists) {
            return sessionStorage.getItem(this.key(name));
        }
    }
};

export { persist };