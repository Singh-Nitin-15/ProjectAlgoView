let isSorting = false;
    let sortToken = 0; // unique token for each sort session

    function createArrayElements(arr) {
        const container = document.getElementById("arrayContainer");
        container.innerHTML = "";
        arr.forEach((value, index) => {
            let elem = document.createElement("div");
            elem.classList.add("element");
            elem.style.left = `${index * 50 + 150}px`;
            elem.dataset.index = index;
            elem.textContent = value;
            container.appendChild(elem);
        });
    }

    function getElement(index) {
        return [...document.querySelectorAll('.element')].find(el => parseInt(el.dataset.index) === index);
    }

    async function swap(arr, i, j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        const elemI = getElement(i);
        const elemJ = getElement(j);
        if (!elemI || !elemJ) return;
        [elemI.dataset.index, elemJ.dataset.index] = [j, i];
        [elemI.style.left, elemJ.style.left] = [`${j * 50 + 150}px`, `${i * 50 + 150}px`];
        await new Promise(res => setTimeout(res, 500));
    }

    async function movePartition(depth, low, high) {
        for (let i = low; i <= high; i++) {
            const elem = getElement(i);
            if (elem) elem.style.transform = `translateY(${depth * 40}px)`;
        }
        await new Promise(res => setTimeout(res, 500));
    }

    async function markSorted(low, high) {
        for (let i = low; i <= high; i++) {
            const elem = getElement(i);
            if (elem) {
                elem.classList.add('sorted');
                elem.style.transform = `translateY(0px)`;
            }
        }
    }

    async function partition(arr, low, high, depth, token) {
        if (!isSorting || token !== sortToken) return;

        const mid = Math.floor((low + high) / 2);
        await swap(arr, mid, high);

        for (let j = low; j <= high; j++) {
            const elem = getElement(j);
            if (elem) elem.classList.remove('pivot');
        }

        const pivot = arr[high];
        const pivotElem = getElement(high);
        if (pivotElem) pivotElem.classList.add('pivot');

        await movePartition(depth, low, high);

        let i = low;
        for (let j = low; j < high; j++) {
            if (!isSorting || token !== sortToken) return;
            if (arr[j] < pivot) {
                await swap(arr, i, j);
                i++;
            }
        }
        await swap(arr, i, high);

        if (pivotElem) pivotElem.classList.remove('pivot');
        return i;
    }

    async function quickSort(arr, low, high, depth, token) {
        if (!isSorting || token !== sortToken) return;

        if (low < high) {
            let pi = await partition(arr, low, high, depth, token);
            if (!isSorting || token !== sortToken) return;
            await quickSort(arr, low, pi - 1, depth + 1, token);
            await quickSort(arr, pi + 1, high, depth + 1, token);
            await markSorted(low, high);
        } else if (low === high) {
            const el = getElement(low);
            if (el) {
                el.classList.add('sorted');
                el.style.transform = `translateY(0px)`;
            }
        }
    }

    async function startQuickSort() {
        sortToken++; // increment to invalidate previous sorts
        isSorting = false;
        await new Promise(res => setTimeout(res, 10)); // slight delay for reset
        isSorting = true;

        const input = document.getElementById("arrayInput").value;
        let arr = input.split(",").map(num => parseInt(num.trim())).filter(num => !isNaN(num));
        createArrayElements(arr);
        await quickSort(arr, 0, arr.length - 1, 1, sortToken);
        isSorting = false;
    }