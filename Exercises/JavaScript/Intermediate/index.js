function changeFontSize(e) {
    let changingFontText = document.getElementById("changingFont");
    let minusButton = document.querySelector(".minus");
    let plusButton = document.querySelector(".plus")
    let fontSizeText = document.querySelector("#fontSizeNumber");
    if (e.target.className === "minus") {
        plusButton.disabled = false;
        let fontSize = parseInt(window.getComputedStyle(changingFontText).fontSize.slice(0,-2));
        console.log(fontSize)
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