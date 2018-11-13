import { persist } from "./persist.js";

const update = {
  listen(radios, persist) {
    [].forEach.call(radios, radio => {
      radio.onclick = () => {
        this.change(radio, persist);
      };
    });
  },

  change(radio, persist) {
    let name = radio.dataset.optionboxName;
    let value = radio.dataset.optionboxValue;
    let optionItem = radio.closest("._optionbox-item");
    let optionBox = radio.closest("._optionbox");
    let optionSiblings = optionBox.querySelectorAll(
      "._optionbox-radio:not(:checked)"
    );

    let select = document.querySelector(`[name=${name}]`);

    if (select.value != value) {
      // select if not previously selected
      select.value = value;
      radio.checked = true;
      if (persist) {
        persist.store(select.name, select.value);
      }
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
