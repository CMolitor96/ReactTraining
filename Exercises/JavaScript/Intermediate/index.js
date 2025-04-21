function changeFontSize(e) {
    let changingFontText = document.getElementById("changingFont");
    let minusButton = document.querySelector(".minus");
    let plusButton = document.querySelector(".plus")
    let fontSizeText = document.querySelector("#fontSizeNumber");
    if (e.target.className === "minus") {
        plusButton.disabled = false;
        let fontSize = parseInt(window.getComputedStyle(changingFontText).fontSize.slice(0,-2));
        let newFontSize = changingFontText.style.fontSize;
        console.log(newFontSize);
        // console.log(fontSize)
        if (fontSize <= 6) {
            alert("Cannot decrease font below 5")
            minusButton.disabled = true;
            return;
        }
        changingFontText.style.fontSize = `${fontSize - 3}px`;
        fontSizeText.innerHTML = `FONT SIZE IS ${fontSize - 3}px`;
    } else if (e.target.className === "plus") {
        minusButton.disabled = false;
        let fontSize = parseInt(window.getComputedStyle(changingFontText).fontSize.slice(0,-2));
        console.log(fontSize)
        if (fontSize >= 15) {
            alert("Cannot increase font above 15")
            plusButton.disabled = true;
            // plusButton.classList.add("disabled");
            // plusButton.classList.remove("disabled");
            return;
        }
        changingFontText.style.fontSize = `${fontSize + 3}px`;
        fontSizeText.innerHTML = `FONT SIZE IS ${fontSize + 3}px`;

    }
}

function scheduleReminder(task, delay) {
    setTimeout(function () {
        alert(task)
    }, delay)
}

scheduleReminder("Hello World", 5000)
scheduleReminder("Goose", 3000);
console.log("Hello")
// let plusButton = document.querySelector(".plus");
// plusButton.addEventListener("click", function () {
//     console.log("Hello")
// })
let input = document.querySelector("#input");
input.addEventListener("change", function () {
    console.log(input.value);
})

// document.onload(changeFontSize(e))
// preventDefault()
// stopBubbling()

async function fetchRequest() {
    try {
        let response = await fetch("url");
            // .then(data) => {
            //     console.log(data)
            // }
            // .catch(error) => {

            // }
        console.log(response)
        // throw new Error("db connection failed")
        // if (response.status != 400);
        throw {
            Error: "DB connection failed",
            Message: "You are not logged in"
        }
    } catch (error) {
        console.error(error.Message)
        localStorage.setItem("Logs", error.Error)
    } finally {
        // console.log(finally)
    }
}

fetchRequest();


