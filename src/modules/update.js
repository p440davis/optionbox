import { persist } from "./persist";

const update = {
    listen(radios) {
        [].forEach.call(radios, radio => {
            radio.onclick = () => {
                this.change(radio);
            };
        });
    },

    change(radio) {
        let name = radio.dataset.optionboxName;
        let value = radio.dataset.optionboxValue;
        let optionItem = radio.closest(".optionbox-item");
        let optionBox = radio.closest(".optionbox");
        let optionSiblings = optionBox.querySelectorAll(
            ".optionbox-radio:not(:checked)"
        );

        let select = document.querySelector(`[name=${name}]`);

        if (select.value != value) {
            // select if not previously selected
            select.value = value;
            radio.checked = true;
            persist.store(select.name, select.value);
            this.close(optionItem, optionBox, optionSiblings);
        } else {
            // deselect if previously selected
            select.selectedIndex = -1;
            radio.checked = false;
            persist.remove(select.name);
            this.open(optionItem, optionBox);
        }
    },

    close(optionItem, optionBox, optionSiblings) {
        optionItem.classList.add("selected");
        optionBox.classList.add("closed");
        [].forEach.call(optionSiblings, sibling =>
            sibling.closest("label").classList.remove("selected")
        );
    },

    open(optionItem, optionBox) {
        optionItem.classList.remove("selected");
        optionBox.classList.remove("closed");
    }
};

export { update };