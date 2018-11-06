import { update } from "./update.js";
import { persist } from "./persist.js";
import { setup } from "./setup.js";

const load = {
    init(settings) {
        settings = setup(settings);

        let elements = settings.select
            ? document.querySelectorAll(settings.select)
            : document.querySelectorAll("select");
        let selects = [];

        if (elements.length) {
            [].forEach.call(elements, element => {
                if (element.tagName == "SELECT") {
                    selects.push(element);
                } else
                    console.warn(
                        "Optionbox warning: Your selection includes a <" +
                        element.tagName.toLowerCase() +
                        ">. Only <select> elements can be converted to an optionbox"
                    );
            });

            this.create(selects);
            update.listen(document.querySelectorAll(".optionbox-radio"), settings.persist);
            this.clickAllSelected();
        }
    },

    create(selects) {
        selects.forEach(select => {
            let optionsBox = document.createElement("span");
            let storedValue = persist.get(select.name);

            optionsBox.classList.add("optionbox");
            optionsBox.innerHTML = this.replicate(
                select.querySelectorAll("option"),
                select.name,
                storedValue
            );

            select.insertAdjacentElement("beforebegin", optionsBox);

            select.selectedIndex = -1;
            select.hidden = true;
        });
    },

    replicate(options, name, storedValue) {
        let content = "";

        [].forEach.call(options, option => {
            let selected = false;
            if (storedValue === option.value) {
                selected = true;
            } else if (!storedValue && option.hasAttribute("selected")) {
                selected = true;
            }

            content += `
                <label class="optionbox-item">
                <input
                    type="radio"
                    class="optionbox-radio"
                    name="${name}-options"
                    data-optionbox-name="${name}"
                    data-optionbox-value="${option.value}"
                    checked="${selected}">
                ${option.innerHTML}
                </label>`;
        });

        return content;
    },

    clickAllSelected() {
        let checked = document.querySelectorAll(
            ".optionbox-radio[checked=true]"
        );

        [].forEach.call(checked, radio => {
            radio.click();
        });
    }
};

export { load };
