function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualizeSelectionSort() {
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
        let minIndex = i;
        elements[i].classList.add("current");
        
        for (let j = i + 1; j < n; j++) {
            elements[j].classList.add("compared");
            await sleep(500);
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            elements[j].classList.remove("compared");
        }
        
        if (minIndex !== i) {
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
            elements[i].textContent = array[i];
            elements[minIndex].textContent = array[minIndex];
        }
        elements[i].classList.remove("current");
        elements[i].classList.add("sorted");
    }
    elements[n - 1].classList.add("sorted");
    enableButton();
}

function disableButton() {
    document.getElementById("sortBtn").disabled = true;
}

function enableButton() {
    document.getElementById("sortBtn").disabled = false;
}