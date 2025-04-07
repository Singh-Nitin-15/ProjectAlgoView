function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualizeBinarySearch() {
    disableButtons();
    let array = document.getElementById("arrayInput").value.split(",").map(Number);
    let target = Number(document.getElementById("targetInput").value);
    let arrayContainer = document.getElementById("arrayContainer");

    arrayContainer.innerHTML = "";
    array.forEach(num => {
        let div = document.createElement("div");
        div.className = "element";
        div.textContent = num;
        arrayContainer.appendChild(div);
    });

    let left = 0, right = array.length - 1;
    let elements = document.getElementsByClassName("element");

    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        elements[left].classList.add("left");
        elements[right].classList.add("right");
        elements[mid].classList.add("mid");
        await sleep(1000);

        if (array[mid] === target) {
            enableButtons();
            return;
        } else if (array[mid] < target) {
            elements[left].classList.remove("left");
            elements[mid].classList.remove("mid");
            left = mid + 1;
        } else {
            elements[right].classList.remove("right");
            elements[mid].classList.remove("mid");
            right = mid - 1;
        }
    }
    enableButtons();
}

async function visualizeLinearSearch() {
    disableButtons();
    let array = document.getElementById("arrayInput").value.split(",").map(Number);
    let target = Number(document.getElementById("targetInput").value);
    let arrayContainer = document.getElementById("arrayContainer");

    arrayContainer.innerHTML = "";
    array.forEach(num => {
        let div = document.createElement("div");
        div.className = "element";
        div.textContent = num;
        arrayContainer.appendChild(div);
    });

    let elements = document.getElementsByClassName("element");

    for (let i = 0; i < array.length; i++) {
        elements[i].classList.add("current");
        await sleep(1000);

        if (array[i] === target) {
            enableButtons();
            return;
        }
        elements[i].classList.remove("current");
    }
    enableButtons();
}

function disableButtons() {
    document.getElementById("binarySearchBtn").disabled = true;
    document.getElementById("linearSearchBtn").disabled = true;
}

function enableButtons() {
    document.getElementById("binarySearchBtn").disabled = false;
    document.getElementById("linearSearchBtn").disabled = false;
}