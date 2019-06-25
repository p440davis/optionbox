(function () {
    'use strict';

    var get = {
        defaultConfig: {
            persist: window.location.pathname,
            prefix: 'optionbox-',
            select: 'select:not([multiple])'
        },
        config: function (userConfig) {
            var config = Object.assign(this.defaultConfig, userConfig);
            if (!this.storageExists()) {
                config.persist = false;
            }
            return config;
        },
        storageExists: function () {
            if (typeof Storage !== undefined) {
                return true;
            }
            return false;
        },
        selectElements: function (selector) {
            var elements = document.querySelectorAll(selector);
            var selects = [];
            if (elements.length) {
                [].forEach.call(elements, function (element) {
                    if (element.tagName === 'SELECT') {
                        selects.push(element);
                    }
                    else
                        console.warn('Optionbox warning: Your selection includes a <' +
                            element.tagName.toLowerCase() +
                            '>. Only <select> elements can be converted to an optionbox');
                });
            }
            return selects;
        }
    };

    var create = {
        optionboxes: function (config, selectElements) {
            var _this = this;
            var optionboxElements = [];
            selectElements.forEach(function (select) {
                var prefix = config.prefix;
                var name = select.name;
                var classes = select.getAttribute('class');
                var styles = select.getAttribute('style');
                var storedValue = '';
                var optgroupElements = select.querySelectorAll('optgroup');
                var optionElements = select.querySelectorAll('option');
                var optionbox = document.createElement('span');
                var content = "<div class=" + prefix + "container>";
                if (config.persist) {
                    storedValue = sessionStorage[config.persist + '>' + select.name];
                }
                optionbox.id = prefix + name;
                classes != null && optionbox.setAttribute('class', classes);
                optionbox.classList.add(prefix);
                styles != null && optionbox.setAttribute('style', styles);
                if (optgroupElements.length) {
                    content += _this.optgroups(optgroupElements, name, storedValue, prefix);
                }
                else {
                    content += _this.options(optionElements, name, storedValue, prefix);
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
        optgroups: function (optgroupElements, name, storedValue, prefix) {
            var _this = this;
            var content = '';
            [].forEach.call(optgroupElements, function (optgroup) {
                var label = optgroup.getAttribute('label');
                var classes = optgroup.getAttribute('class');
                var styles = optgroup.getAttribute('style');
                var optionElements = optgroup.querySelectorAll('option');
                content += "<div \n                class=\"" + prefix + "group " + (classes != null ? classes : '') + "\"\n                style=\"" + (styles != null ? styles : '') + "\">";
                if (label)
                    content += "<small class=\"" + prefix + "group-label\">" + label + "</small>";
                content += _this.options(optionElements, name, storedValue, prefix);
                content += '</div>';
            });
            return content;
        },
        options: function (optionElements, name, storedValue, prefix) {
            var _this = this;
            var content = '';
            [].forEach.call(optionElements, function (option) {
                var value = option.value;
                var label = option.innerHTML;
                var alt = option.getAttribute('alt');
                var classes = option.getAttribute('class');
                var styles = option.getAttribute('style');
                var selected = _this.preselected(storedValue, option);
                content += "\n                    <label \n                        class=\"" + prefix + "item " + (classes != null ? classes : '') + "\"\n                        style=\"" + (styles != null ? styles : '') + "\">\n                    <input\n                        type=\"radio\"\n                        class=\"" + prefix + "radio\"\n                        name=\"" + name + "\"\n                        value=\"" + value + "\"\n                        checked=\"" + selected + "\">\n                        " + label;
                if (alt) {
                    content += "<small class=\"" + prefix + "alt\">" + alt + "</small>";
                }
                content += '</label>';
            });
            return content;
        },
        preselected: function (storedValue, option) {
            if (storedValue === option.value) {
                return true;
            }
            else if (!storedValue && option.hasAttribute('selected')) {
                return true;
            }
            return false;
        }
    };

    var update = {
        listen: function (config, optionboxes) {
            var _this = this;
            optionboxes.forEach(function (optionbox) {
                optionbox.addEventListener('click', function (e) {
                    if (e.target && e.target.tagName === 'INPUT') {
                        _this.change(e.target, config);
                    }
                });
            });
        },
        change: function (radio, config) {
            var prefix = config.prefix;
            var name = radio.name;
            var key = config.persist + '>' + name;
            var value = radio.value;
            var optionItem = radio.closest('label');
            var optionbox = radio.closest('.' + prefix);
            if (optionItem.classList.contains('selected')) {
                radio.checked = false;
                this.remove(config, key);
                this.open(optionItem, optionbox);
            }
            else {
                radio.checked = true;
                this.store(config, key, value);
                this.close(optionItem, optionbox);
            }
        },
        close: function (optionItem, optionbox) {
            var optionSiblings = optionbox.querySelectorAll('._optionbox-radio:not(:checked)');
            optionItem.classList.add('selected');
            optionbox.classList.add('closed');
            [].forEach.call(optionSiblings, function (sibling) {
                return sibling.closest('label').classList.remove('selected');
            });
        },
        open: function (optionItem, optionbox) {
            optionItem.classList.remove('selected');
            optionbox.classList.remove('closed');
        },
        init: function (optionboxes) {
            optionboxes.forEach(function (optionbox) {
                var preselects = optionbox.querySelectorAll('[checked=true]');
                [].forEach.call(preselects, function (preselect) {
                    preselect.click();
                });
            });
        },
        store: function (config, key, value) {
            if (config.persist) {
                sessionStorage[key] = value;
            }
        },
        remove: function (config, key) {
            if (config.persist) {
                delete sessionStorage[key];
            }
        }
    };

    window.optionbox = function (userConfig) {
        var config = get.config(userConfig);
        var selectElements = get.selectElements(config.select);
        var optionboxes = create.optionboxes(config, selectElements);
        update.listen(config, optionboxes);
        update.init(optionboxes);
    };

}());
//# sourceMappingURL=optionbox.js.map
