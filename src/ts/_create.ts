const create = {
    optionboxes(config, selectElements) {
        let optionboxElements = [];

        selectElements.forEach(select => {
            let prefix = config.prefix;
            let name = select.name;
            let classes = select.getAttribute('class');
            let styles = select.getAttribute('style');
            let storedValue = '';
            let optgroupElements = select.querySelectorAll('optgroup');
            let optionElements = select.querySelectorAll('option');
            let optionbox = document.createElement('span');
            let content = `<div class=${prefix}container>`;

            if (config.persist) {
                storedValue = sessionStorage[config.persist + '>' + select.name];
            }

            optionbox.id = prefix + name;
            classes != null && optionbox.setAttribute('class', classes);
            optionbox.classList.add(prefix);
            styles != null && optionbox.setAttribute('style', styles);


            if (optgroupElements.length) {
                content += this.optgroups(optgroupElements, name, storedValue, prefix);
            } else {
                content += this.options(optionElements, name, storedValue, prefix);
            }

            content += '</div>';

            optionbox.innerHTML = content;

            select.insertAdjacentElement('beforebegin', optionbox);

            select.selectedIndex = -1;
            select.remove();

            optionboxElements.push(optionbox);
        });

        return (optionboxElements);
    },

    optgroups(optgroupElements, name, storedValue, prefix) {
        let content = '';

        [].forEach.call(optgroupElements, optgroup => {
            let label = optgroup.getAttribute('label');
            let classes = optgroup.getAttribute('class');
            let styles = optgroup.getAttribute('style');
            let optionElements = optgroup.querySelectorAll('option');

            content += `<div 
                class="${prefix}group ${classes != null ? classes : ''}"
                style="${styles != null ? styles : ''}">`;

            if (label) content += `<small class="${prefix}group-label">${label}</small>`;

            content += this.options(optionElements, name, storedValue, prefix);

            content += '</div>';
        });

        return content;
    },

    options(optionElements, name, storedValue, prefix) {
        let content = '';

        [].forEach.call(optionElements, option => {
            let value = option.value;
            let label = option.innerHTML;
            let alt = option.getAttribute('alt');
            let classes = option.getAttribute('class');
            let styles = option.getAttribute('style');
            let selected = this.preselected(storedValue, option);

            content += `
                    <label 
                        class="${prefix}item ${classes != null ? classes : ''}"
                        style="${styles != null ? styles : ''}">
                    <input
                        type="radio"
                        class="${prefix}radio"
                        name="${name}"
                        value="${value}"
                        checked="${selected}">
                        ${label}`;

            if (alt) {
                content += `<small class="${prefix}alt">${alt}</small>`;
            }

            content += '</label>';
        });

        return content;
    },

    preselected(storedValue, option) {
        if (storedValue === option.value) {
            return true;
        } else if (!storedValue && option.hasAttribute('selected')) {
            return true;
        }

        return false;
    }
};

export { create };