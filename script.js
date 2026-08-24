const thingInput = document.querySelector("#thing-input");
const thingForm = document.querySelector("#thing-form");
const wantList = document.querySelector("#want-list");
const needList = document.querySelector("#need-list");

const savedThings = localStorage.getItem("things");

let things = [];

if (savedThings !== null) {
    things = JSON.parse(savedThings);
}

console.log(things);

function displayThing(thing) {
        const listItem = document.createElement("li");
        listItem.textContent = thing.text;

        if (thing.type === "want") {
            wantList.appendChild(listItem);
        }
        else {
            needList.appendChild(listItem);
        }
    }

    things.forEach(function (thing) {
        displayThing(thing);
    });

thingForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const thingText = thingInput.value.trim();

    if (thingText === "") {
        return;
    }
    
    const selectedType = document.querySelector(
        'input[name="thing-type"]:checked'
    ).value;

    const thing = {
        text: thingText,
        type: selectedType
    };

    things.push(thing);
    localStorage.setItem("things", JSON.stringify(things));
    console.log(things);

    displayThing(thing);

    thingInput.value = "";
});