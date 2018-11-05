let styleSelect = document.querySelector("select[name=style]");
console.log(styleSelect.value);
styleSelect.addEventListener("change", e => {
    console.log(e.target.value);
})
