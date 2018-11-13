const create = {
    optionboxes(selectElements, storedValues, prefix) {
        let optionboxElements = [];

        selectElements.forEach(select => {
            let optionbox = document.createElement("span");
            let name = select.name;
            let storedValue = "";

            if (storedValues) {
                storedValue = storedValues[name];
            }

            optionbox.id = name + prefix;
            optionbox.classList.add(prefix);
            optionbox.innerHTML = this.options(select.querySelectorAll("option"), name, storedValue, prefix);
            select.insertAdjacentElement("beforebegin", optionbox);
            select.selectedIndex = -1;
            select.hidden = true;

            optionboxElements.push(optionbox);
        });

        return (optionboxElements);
    },

    options(optionElements, name, storedValue, prefix) {
        let content = "";

        [].forEach.call(optionElements, option => {
            let selected = this.preselected(storedValue, option);
            let alt = option.getAttribute("alt");

            content += `
                    <label class="${prefix}-item">
                    <input
                        type="radio"
                        class="${prefix}-radio"
                        name="${name + prefix}"
                        value="${option.value + prefix}"
                        checked="${selected}">
                        ${option.innerHTML}`;

            if (alt) {
                content += `<small class="${prefix}-alt">${alt}</small>`;
            }

            content += "</label>";
        });

        return content;
    },

    preselected(storedValue, option) {
        if (storedValue === option.value) {
            return true;
        } else if (!storedValue && option.hasAttribute("selected")) {
            return true;
        }

        return false;
    }
};

export { create };