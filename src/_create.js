const create = {
    optionboxes(config, storedValues, selectElements) {
        let optionboxElements = [];

        selectElements.forEach(select => {
            let prefix = config.prefix;
            let name = select.name;
            let classes = select.getAttribute("class");
            let styles = select.getAttribute("style");
            let storedValue = "";
            let optionElements = select.querySelectorAll("option");
            let optionbox = document.createElement("span");

            if (storedValues) {
                storedValue = storedValues[name];
            }

            optionbox.id = name + prefix;
            optionbox.setAttribute("class", classes);
            optionbox.classList.add(prefix);
            optionbox.setAttribute("style", styles);
            optionbox.innerHTML = this.options(optionElements, name, storedValue, prefix);

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
            let classes = option.getAttribute("class");
            let styles = option.getAttribute("style");
            console.log(classes);
            console.log(styles);

            content += `
                    <label 
                        class="${prefix}-item ${classes}"
                        style="${styles}">
                    <input
                        type="radio"
                        class="${prefix}-radio"
                        name="${name + prefix}"
                        value="${option.value}"
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