/** @type {HTMLDivElement} */
const EDITOR = document.querySelector("#editor");
/** @type {HTMLButtonElement} */
const SAVE = document.querySelector("#save");
/** @type {HTMLInputElement[]} */
let inputs = [];

/**
 * @param {KeyboardEvent} e
 * @param {HTMLInputElement[]} inputs
 * @param {HTMLInputElement} input
 */
function onKeyDown(e, inputs, input) {
    const position = inputs.indexOf(input);
    if (e.key === "Enter" && e.ctrlKey) {
        createNewInput(inputs, position + 1);
    } else if (e.key === "ArrowDown") {
        if (position < inputs.length) inputs[position + 1].focus();
    } else if (e.key === "ArrowUp") {
        if (position - 1 >= 0) inputs[position - 1].focus();
    } else if (
        (e.key === "Backspace" && inputs[position].value === "") ||
        (e.key === "Backspace" && e.ctrlKey)
    ) {
        if (inputs.length === 1) return;
        e.preventDefault;
        if (position === 0) inputs[position + 1].focus();
        else inputs[position - 1].focus();
        inputs[position].removeEventListener("keydown", onKeyDown);
        inputs.splice(position, 1);
        EDITOR.removeChild(input);
    }
}

/**
 * @param {HTMLInputElement[]} inputs
 * @param {number} postition
 */
function createNewInput(inputs, postition = 0) {
    const newInput = document.createElement("input");
    inputs.splice(postition, 0, newInput);
    newInput.defaultValue = `New input ${inputs.length} !`;
    const nextPosition = inputs.indexOf(newInput) + 1;
    newInput.addEventListener("keydown", (e) => onKeyDown(e, inputs, newInput));
    render(inputs, nextPosition - 1);
}

/**
 * @param {HTMLInputElement[]} inputs
 * @param {number} position
 */
function render(inputs, position = 0) {
    inputs.forEach((input) => {
        if (input) EDITOR.appendChild(input);
    });
    inputs[position].focus();
}

/**
 * @param {HTMLInputElement[]} inputs
 * @returns {string[]}
 */
function handleSave(inputs) {
    /** @type {string[]} */
    const result = [];
    inputs.forEach((input) => {
        result.push(input.value);
    });
    return result;
}

// Init
createNewInput(inputs);

SAVE.addEventListener("click", () => {
    const result = handleSave(inputs);
    console.log(result);
});
