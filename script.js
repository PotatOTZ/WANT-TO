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

function saveThings() {
    localStorage.setItem(
        "things",
        JSON.stringify(things)
    );
}

function displayThing(thing) {
    const listItem = document.createElement("li");
    const checkbox = document.createElement("input");
    const reflectionArea = document.createElement("div");
    const feelingInput = document.createElement("input");
    const thingTextElement = document.createElement("span");
    const deleteButton = document.createElement("button");
    const completedTimeElement = document.createElement("small");
    const moodSelect = document.createElement("select");

    listItem.classList.add("thing-item");
    reflectionArea.classList.add("reflection-area");
    feelingInput.classList.add("feeling-input");

    deleteButton.type = "button";
    deleteButton.textContent = "❌️";
    deleteButton.classList.add("delete-button");

    checkbox.type = "checkbox";
    checkbox.checked = thing.completed;
    feelingInput.type = "text";
    feelingInput.placeholder = "感觉如何？";
    thingTextElement.textContent = " " + thing.text;

    completedTimeElement.classList.add("completed-time");

    moodSelect.classList.add("mood-select");
    const moodOptions = [
        { value: "", label: "选择此刻的感受……" },
        { value: "energized", label: "更有精神" },
        { value: "calm", label: "平静" },
        { value: "happy", label: "开心" },
        { value: "neutral", label: "没什么变化" },
        { value: "tired", label: "有些疲惫" },
        { value: "unclear", label: "说不清" }
    ];

    moodOptions.forEach(function (mood) {
        const option = document.createElement("option");

        option.value = mood.value;
        option.textContent = mood.label;

        moodSelect.appendChild(option);
    });
    moodSelect.value = thing.mood || "";

    feelingInput.value = thing.feeling || "";

    reflectionArea.appendChild(completedTimeElement);
    reflectionArea.appendChild(moodSelect);
    reflectionArea.appendChild(feelingInput);

    thingTextElement.classList.toggle(
        "completed",
        thing.completed
    );
    reflectionArea.hidden = !thing.completed;

    function updateCompletedTime() {
        if (thing.completedAt) {
            const completedDate = new Date(thing.completedAt);

            completedTimeElement.textContent =
            "完成于 " + 
            completedDate.toLocaleString("zh-CN", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
        
            completedTimeElement.hidden = false;
        }
        else {
            completedTimeElement.textContent = "";
            completedTimeElement.hidden = true;
        }
    }

    updateCompletedTime();

    checkbox.addEventListener("change", function () {
        thing.completed = checkbox.checked;

        if (thing.completed) {
            thing.completedAt = new Date().toISOString();
        }
        else {
            thing.completedAt = null;
            thing.mood = "";
            thing.feeling = "";

            moodSelect.value = "";
            feelingInput.value = "";
        } 

        updateCompletedTime();

        thingTextElement.classList.toggle(
            "completed",
            thing.completed
        );
        reflectionArea.hidden = !thing.completed;

        saveThings();
    });

    feelingInput.addEventListener("input", function() {
        thing.feeling = feelingInput.value;

        saveThings();
    });

    moodSelect.addEventListener("change", function () {
        thing.mood = moodSelect.value;

        saveThings();
    });

    listItem.appendChild(checkbox);
    listItem.appendChild(thingTextElement);
    listItem.appendChild(deleteButton);
    listItem.appendChild(reflectionArea);

    if (thing.type === "want") {
        wantList.appendChild(listItem);
    }
    else {
        needList.appendChild(listItem);
    }

    deleteButton.addEventListener("click", function () {
        const shouldDelete = confirm(
            "确定删除“" + thing.text + "”吗？"
        );

        if (!shouldDelete) {
            return;
        }

        const thingIndex = things.indexOf(thing);

        things.splice(thingIndex, 1);

        saveThings();

        listItem.remove();
    });
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
        feeling: "",
        mood: "",
        completedAt: null
    };

    things.push(thing);
    saveThings();
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