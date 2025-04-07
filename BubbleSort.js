function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualizeBubbleSort() {
    disableButton();
    let array = document.getElementById("arrayInput").value.split(",").map(Number);
    let arrayContainer = document.getElementById("arrayContainer");

    arrayContainer.innerHTML = "";
    array.forEach(num => {
        let div = document.createElement("div");
        div.className = "element";
        div.textContent = num;
        arrayContainer.appendChild(div);
    });

    let elements = document.getElementsByClassName("element");
    let n = array.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            elements[j].classList.add("swapping");
            elements[j + 1].classList.add("swapping");
            await sleep(1000);

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                elements[j].textContent = array[j];
                elements[j + 1].textContent = array[j + 1];
            }

            elements[j].classList.remove("swapping");
            elements[j + 1].classList.remove("swapping");
        }
        elements[n - i - 1].classList.add("sorted");
    }
    elements[0].classList.add("sorted");
    enableButton();
}

function disableButton() {
    document.getElementById("sortBtn").disabled = true;
}

function enableButton() {
    document.getElementById("sortBtn").disabled = false;
}