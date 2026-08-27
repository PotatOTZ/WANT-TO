const thingInput = document.querySelector("#thing-input");
const thingForm = document.querySelector("#thing-form");
const wantList = document.querySelector("#want-list");
const needList = document.querySelector("#need-list");
const clearButton = document.querySelector("#clear-button");

const savedThings = localStorage.getItem("things");

let things = [];

if (savedThings !== null) {
    things = JSON.parse(savedThings);
}

console.log(things);

function displayThing(thing) {
        const listItem = document.createElement("li");
        const checkbox = document.createElement("input");
        const reflectionArea = document.createElement("div");
        const feelingInput = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = thing.completed;
        feelingInput.type = "text";
        feelingInput.placeholder = "感觉如何？";

        feelingInput.value = thing.feeling || "";

        reflectionArea.appendChild(feelingInput);

        listItem.classList.toggle("completed", thing.completed);
        reflectionArea.hidden = !thing.completed;

        checkbox.addEventListener("change", function () {
            thing.completed = checkbox.checked;

            listItem.classList.toggle("completed", thing.completed);
            reflectionArea.hidden = !thing.completed;

            localStorage.setItem(
                "things",
                JSON.stringify(things)
            );
        });

        feelingInput.addEventListener("input", function() {
        thing.feeling = feelingInput.value;

        localStorage.setItem(
            "things",
            JSON.stringify(things)
            );
        });

        listItem.appendChild(checkbox);
        listItem.appendChild(
            document.createTextNode(" " + thing.text)
        );
        listItem.appendChild(reflectionArea);

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
        type: selectedType,
        completed: false,
        feeling: ""
    };

    things.push(thing);
    localStorage.setItem("things", JSON.stringify(things));
    console.log(things);

    displayThing(thing);

    thingInput.value = "";
});

clearButton.addEventListener("click", function () {
    if (things.length === 0) {
        return;
    }

    const shouldClear = confirm("确定要清空全部清单吗？");

    if (!shouldClear) {
        return;
    }

    things = [];
    localStorage.removeItem("things");

    wantList.textContent = "";
    needList.textContent = "";
});