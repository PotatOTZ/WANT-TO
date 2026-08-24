const thingInput = document.querySelector("#thing-input");
const saveButton = document.querySelector("#save-button");
const wantList = document.querySelector("#want-list");
const needList = document.querySelector("#need-list");

saveButton.addEventListener("click", function () {
    const thingText = thingInput.value.trim();

    if (thingText === "") {
        return;
    }
    
    const selectedType = document.querySelector(
        'input[name="thing-type"]:checked'
    ).value;

    const listItem = document.createElement("li");
    listItem.textContent = thingText;

    if (selectedType === "want") {
        wantList.appendChild(listItem);
    }
    else {
        needList.appendChild(listItem);
    }

    thingInput.value = "";
});