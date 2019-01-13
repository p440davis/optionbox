const update = {
    listen(config, optionboxes) {
        optionboxes.forEach(optionbox => {
            optionbox.addEventListener("click", e => { // Delegated event listener avoids performance issues of listeneing to every option
                if (e.target && e.target.tagName === "INPUT") {
                    this.change(e.target, config);
                }
            });
        });
    },

    change(radio, config) {
        let prefix = config.prefix;
        let optionbox = radio.closest("." + prefix);
        let name = optionbox.id.replace(prefix, "");
        let value = radio.value;
        let optionItem = radio.closest("." + prefix + "-item");
        let optionSiblings = optionbox.querySelectorAll(
            "._optionbox-radio:not(:checked)"
        );

        let select = document.querySelector(`[name="${name}"]`);
        let key = config.persist + ">" + select.name;

        if (select.value != value) { // select if not previously selected
            select.value = value;
            radio.checked = true;
            this.store(config, select, key);
            this.close(optionItem, optionbox, optionSiblings);
        } else { // deselect if previously selected
            select.selectedIndex = -1;
            radio.checked = false;
            this.remove(config, key);
            this.open(optionItem, optionbox);
        }
    },

    close(optionItem, optionbox, optionSiblings) {
        optionItem.classList.add("selected");
        optionbox.classList.add("closed");
        [].forEach.call(optionSiblings, sibling =>
            sibling.closest("label").classList.remove("selected")
        );
    },

    open(optionItem, optionbox) {
        optionItem.classList.remove("selected");
        optionbox.classList.remove("closed");
    },

    init(optionboxes) {
        optionboxes.forEach(optionbox => {
            let preselects = optionbox.querySelectorAll("[checked=true]");

            [].forEach.call(preselects, preselect => {
                preselect.click();
            });
        });
    },

    store(config, select, key) {
        if (config.persist) {
            sessionStorage[key] = select.value;
        }
    },

    remove(config, key) {
        if (config.persist) {
            delete sessionStorage[key];
        }
    }
};

export { update };
