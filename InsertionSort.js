function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function visualizeInsertionSort() {
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
    
    for (let i = 1; i < n; i++) {
        let key = array[i];
        let j = i - 1;
        
        elements[i].classList.add("current");
        await sleep(1000);
        
        while (j >= 0 && array[j] > key) {
            elements[j].classList.add("compared");
            array[j + 1] = array[j];
            elements[j + 1].textContent = array[j];
            await sleep(1000);
            elements[j].classList.remove("compared");
            j--;
        }
        
        array[j + 1] = key;
        elements[j + 1].textContent = key;
        elements[i].classList.remove("current");
    }
    
    for (let i = 0; i < n; i++) {
        elements[i].classList.add("sorted");
    }
    enableButton();
}

function disableButton() {
    document.getElementById("sortBtn").disabled = true;
}

function enableButton() {
    document.getElementById("sortBtn").disabled = false;
}