const setup = settings => {
    // defaults
    let selector = "select";
    let persistable = true;

    // props provided
    if (settings) {
        if (settings.select !== undefined) {
            selector = settings.select;
        }
        if (settings.persist !== undefined) {
            persistable = settings.persist;
        }
    }

    return {
        select: selector,
        persist: persistable
    };
};

export { setup };