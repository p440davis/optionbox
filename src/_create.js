const create = {
    optionboxes(config, selectElements) {
        let optionboxElements = [];

        selectElements.forEach(select => {
            let prefix = config.prefix;
            let name = select.name;
            let classes = select.getAttribute("class");
            let styles = select.getAttribute("style");
            let storedValue = "";
            let optionElements = select.querySelectorAll("option");
            let optionbox = document.createElement("span");

            if (config.persist) {
                storedValue = sessionStorage[config.persist + ">" + select.name];
            }

            optionbox.id = prefix + name;
            classes != null && optionbox.setAttribute("class", classes);
            optionbox.classList.add(prefix);
            styles != null && optionbox.setAttribute("style", styles);
            optionbox.innerHTML = this.options(optionElements, name, storedValue, prefix);

            select.insertAdjacentElement("beforebegin", optionbox);

            select.selectedIndex = -1;
            select.remove();

            optionboxElements.push(optionbox);
        });

        return (optionboxElements);
    },

    options(optionElements, name, storedValue, prefix) {
        let content = `<div class=${prefix}container>`;

        [].forEach.call(optionElements, option => {
            let selected = this.preselected(storedValue, option);
            let alt = option.getAttribute("alt");
            let classes = option.getAttribute("class");
            let styles = option.getAttribute("style");

            content += `
                    <label 
                        class="${prefix}item ${classes != null ? classes : ""}"
                        style="${styles != null ? styles : ""}">
                    <input
                        type="radio"
                        class="${prefix}radio"
                        name="${name}"
                        value="${option.value}"
                        checked="${selected}">
                        ${option.innerHTML}`;

            if (alt) {
                content += `<small class="${prefix}alt">${alt}</small>`;
            }

            content += "</label>";
        });

        content += "</div>";

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