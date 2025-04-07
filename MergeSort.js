function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function mergeSort(arr, elements, left, right, depth = 0) {
    if (left >= right) return;
    let mid = Math.floor((left + right) / 2);
    await mergeSort(arr, elements, left, mid, depth + 1);
    await mergeSort(arr, elements, mid + 1, right, depth + 1);
    await merge(arr, elements, left, mid, right, depth);
}

async function merge(arr, elements, left, mid, right, depth) {
    let temp = [];
    let i = left, j = mid + 1;
    
    for (let k = left; k <= right; k++) {
        elements[k].style.transform = `translateY(${50 + depth * 20}px)`;
        elements[k].classList.add("partitioned");
    }
    await sleep(500);
    
    while (i <= mid && j <= right) {
        elements[i].classList.add("current");
        elements[j].classList.add("current");
        await sleep(500);
        if (arr[i] < arr[j]) {
            temp.push(arr[i]);
            elements[i].classList.remove("current");
            i++;
        } else {
            temp.push(arr[j]);
            elements[j].classList.remove("current");
            j++;
        }
    }
    while (i <= mid) {
        elements[i].classList.add("current");
        await sleep(500);
        temp.push(arr[i]);
        elements[i].classList.remove("current");
        i++;
    }
    while (j <= right) {
        elements[j].classList.add("current");
        await sleep(500);
        temp.push(arr[j]);
        elements[j].classList.remove("current");
        j++;
    }
    
    for (let k = left, t = 0; k <= right; k++, t++) {
        arr[k] = temp[t];
        elements[k].textContent = arr[k];
        elements[k].classList.add("merged");
        await sleep(500);
        elements[k].classList.remove("merged");
        elements[k].classList.add("sorted");
        elements[k].style.transform = "translateY(0px)";
    }
}

async function visualizeMergeSort() {
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
    await mergeSort(array, elements, 0, array.length - 1);
    enableButton();
}

function disableButton() {
    document.getElementById("sortBtn").disabled = true;
}

function enableButton() {
    document.getElementById("sortBtn").disabled = false;
}