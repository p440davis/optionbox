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
        let name = radio.name;
        let key = config.persist + ">" + name;
        let value = radio.value;
        let optionItem = radio.closest("label");
        let optionbox = radio.closest("." + prefix);

        if (optionItem.classList.contains("selected")) {
            radio.checked = false;
            this.remove(config, key);
            this.open(optionItem, optionbox);
        } else {
            radio.checked = true;
            this.store(config, key, value);
            this.close(optionItem, optionbox);
        }
    },

    close(optionItem, optionbox) {
        let optionSiblings = optionbox.querySelectorAll(
            "._optionbox-radio:not(:checked)"
        );

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

    store(config, key, value) {
        if (config.persist) {
            sessionStorage[key] = value;
        }
    },

    remove(config, key) {
        if (config.persist) {
            delete sessionStorage[key];
        }
    }
};

export { update };
