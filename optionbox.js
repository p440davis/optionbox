"use strict";

const optionbox = {
    init: selector => {
        let elements = document.querySelectorAll(selector);
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
            optionbox.create(selects);
            optionbox.listen(document.querySelectorAll(".optionbox-button"));
        }
    },

    create: selects => {
        selects.forEach(select => {
            let optionsBox = document.createElement("span");

            optionsBox.id = select.id;
            optionsBox.classList.add("optionbox");
            optionsBox.innerHTML = optionbox.replicate(
                select.querySelectorAll("option"),
                select.name
            );

            select.insertAdjacentElement("beforebegin", optionsBox);

            select.selectedIndex = -1;
            select.hidden = true;
        });
    },

    replicate: (options, name) => {
        let content = ``;

        [].forEach.call(options, option => {
            content += `<label class="optionbox-label">
                <input type="radio" name="${name}-options" class="optionbox-button" 
                    data-optionbox-name="${name}"
                    data-optionbox-value="${option.value}">
                    
                ${option.innerHTML}
                </label>`;
        });

        return content;
    },

    listen: elements => {
        [].forEach.call(elements, optionButton => {
            optionButton.onclick = () => {
                let name = optionButton.dataset.optionboxName;
                let value = optionButton.dataset.optionboxValue;
                optionbox.select(optionButton, name, value);
            };
        });
    },

    select: (optionButton, name, value) => {
        let select = document.querySelector(`[name=${name}]`);
        let optionLabel = optionButton.closest(".optionbox-label");
        let optionsBox = optionButton.closest(".optionbox");
        let optionSiblings = optionsBox.querySelectorAll(
            ".optionbox-button:not(:checked)"
        );

        if (select.value != value) {
            // select if not previously selected
            select.value = value;
            optionLabel.classList.add("selected");
            optionsBox.classList.add("selected");
            [].forEach.call(optionSiblings, sibling =>
                sibling.closest("label").classList.remove("selected")
            );
        } else {
            // deselect if previously selected
            select.selectedIndex = -1;
            optionButton.checked = false;
            optionLabel.classList.remove("selected");
            optionsBox.classList.remove("selected");
        }
    }
};
