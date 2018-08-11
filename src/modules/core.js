const core = {
  init(selector) {
    let elements = selector
      ? document.querySelectorAll(selector)
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
      this.listen(document.querySelectorAll(".optionbox-radio"));
    }
  },

  create(selects) {
    selects.forEach(select => {
      let optionsBox = document.createElement("span");

      optionsBox.classList.add("optionbox");
      optionsBox.innerHTML = this.replicate(
        select.querySelectorAll("option"),
        select.name
      );

      select.insertAdjacentElement("beforebegin", optionsBox);

      select.selectedIndex = -1;
      select.hidden = true;
    });
  },

  replicate(options, name) {
    let content = ``;

    [].forEach.call(options, option => {
      content += `
        <label class="optionbox-item">
          <input
            type="radio"
            class="optionbox-radio"
            name="${name}-options"
            data-optionbox-name="${name}"
            data-optionbox-value="${option.value}">
          ${option.innerHTML}
        </label>`;
    });

    return content;
  },

  listen(radios) {
    [].forEach.call(radios, radio => {
      radio.onclick = () => {
        let name = radio.dataset.optionboxName;
        let value = radio.dataset.optionboxValue;
        this.select(radio, name, value);
      };
    });
  },

  select(radio, name, value) {
    let select = document.querySelector(`[name=${name}]`);
    let optionItem = radio.closest(".optionbox-item");
    let optionsBox = radio.closest(".optionbox");
    let optionSiblings = optionsBox.querySelectorAll(
      ".optionbox-radio:not(:checked)"
    );

    if (select.value != value) {
      // select if not previously selected
      select.value = value;
      optionItem.classList.add("selected");
      optionsBox.classList.add("closed");
      [].forEach.call(optionSiblings, sibling =>
        sibling.closest("label").classList.remove("selected")
      );
    } else {
      // deselect if previously selected
      select.selectedIndex = -1;
      radio.checked = false;
      optionItem.classList.remove("selected");
      optionsBox.classList.remove("closed");
    }
  }
};

export { core };
