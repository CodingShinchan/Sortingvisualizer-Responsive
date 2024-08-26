let array = [];
let isSorting = false; // Flag to indicate if sorting is in progress

// Enable or disable sorting buttons
function setButtonsEnabled(enabled) {
    const buttons = document.querySelectorAll("#button-container button:not(#generate-array-button)"); // Keep generate array button enabled
    buttons.forEach(button => {
        button.disabled = !enabled;
        button.classList.toggle("disabled", !enabled);
    });
}

// Generate a random array and display it
function generateRandomArray() {
    array = [];
    const arraySize = 30; // Adjust the array size here
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * 100) + 1); // Random numbers between 1 and 100
    }
    generateBars(array);
    setButtonsEnabled(true); // Enable all buttons when generating a new array
    isSorting = false; // Reset sorting flag
}

// Create bars for the array
function generateBars(array) {
    const container = document.getElementById("array-container");
    container.innerHTML = ""; // Clear the container
    array.forEach(value => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`; // Adjust height for better visualization
        container.appendChild(bar);
    });
}

// Update the description box
function updateDescription(algorithm) {
    const descriptions = {
        "bubbleSort": {
            title: "Bubble Sort",
            description: "Bubble Sort is a simple comparison-based algorithm. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.",
            complexity: "Time Complexity: O(n²) in worst and average cases, O(n) in best case. Space Complexity: O(1)."
        },
        "insertionSort": {
            title: "Insertion Sort",
            description: "Insertion Sort builds the final sorted array one item at a time. It is much less efficient on large lists than more advanced algorithms.",
            complexity: "Time Complexity: O(n²) in worst and average cases, O(n) in best case. Space Complexity: O(1)."
        },
        "selectionSort": {
            title: "Selection Sort",
            description: "Selection Sort divides the list into two parts: the sorted part at the left end and the unsorted part at the right end. It repeatedly selects the smallest (or largest) element from the unsorted part and swaps it with the leftmost unsorted element.",
            complexity: "Time Complexity: O(n²) in all cases. Space Complexity: O(1)."
        },
        "mergeSort": {
            title: "Merge Sort",
            description: "Merge Sort is an efficient, stable, and comparison-based sorting algorithm. It divides the unsorted list into n sublists, each containing one element, and repeatedly merges sublists to produce new sorted sublists until there is only one sublist remaining.",
            complexity: "Time Complexity: O(n log n) in all cases. Space Complexity: O(n)."
        },
        "quickSort": {
            title: "Quick Sort",
            description: "Quick Sort is an efficient, comparison-based, and divide-and-conquer sorting algorithm. It picks an element as a pivot and partitions the array around the picked pivot.",
            complexity: "Time Complexity: O(n log n) on average, O(n²) in the worst case. Space Complexity: O(log n)."
        },
        "heapSort": {
            title: "Heap Sort",
            description: "Heap Sort is a comparison-based sorting technique based on a binary heap data structure. It's similar to selection sort where we first find the maximum element and place it at the end.",
            complexity: "Time Complexity: O(n log n) in all cases. Space Complexity: O(1)."
        }
    };

    const descriptionBox = document.getElementById("description-box");
    descriptionBox.innerHTML = `
        <h2>${descriptions[algorithm].title}</h2>
        <p>${descriptions[algorithm].description}</p>
        <p><strong>${descriptions[algorithm].complexity}</strong></p>
    `;
}

// Bubble Sort
async function startBubbleSort() {
    if (isSorting) return;
    isSorting = true;
    setButtonsEnabled(false);
    updateDescription("bubbleSort");
    await bubbleSort();
    isSorting = false;
    setButtonsEnabled(true);
}

// Insertion Sort
async function startInsertionSort() {
    if (isSorting) return;
    isSorting = true;
    setButtonsEnabled(false);
    updateDescription("insertionSort");
    await insertionSort();
    isSorting = false;
    setButtonsEnabled(true);
}

// Selection Sort
async function startSelectionSort() {
    if (isSorting) return;
    isSorting = true;
    setButtonsEnabled(false);
    updateDescription("selectionSort");
    await selectionSort();
    isSorting = false;
    setButtonsEnabled(true);
}

// Merge Sort
async function startMergeSort() {
    if (isSorting) return;
    isSorting = true;
    setButtonsEnabled(false);
    updateDescription("mergeSort");
    await mergeSort(0, array.length - 1);
    isSorting = false;
    setButtonsEnabled(true);
}

// Quick Sort
async function startQuickSort() {
    if (isSorting) return;
    isSorting = true;
    setButtonsEnabled(false);
    updateDescription("quickSort");
    await quickSort(0, array.length - 1);
    isSorting = false;
    setButtonsEnabled(true);
}

// Heap Sort
async function startHeapSort() {
    if (isSorting) return;
    isSorting = true;
    setButtonsEnabled(false);
    updateDescription("heapSort");
    await heapSort();
    isSorting = false;
    setButtonsEnabled(true);
}

// Sorting algorithms

async function bubbleSort() {
    const bars = document.querySelectorAll(".bar");
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add("active");
            bars[j + 1].classList.add("active");

            await sleep(100);

            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            }

            bars[j].classList.remove("active");
            bars[j + 1].classList.remove("active");
        }
    }
}

// Insertion Sort algorithm
async function insertionSort() {
    const bars = document.querySelectorAll(".bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].classList.add("active");

        await sleep(500);

        while (j >= 0 && array[j] > key) {
            bars[j].classList.add("active");
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j] * 3}px`;
            j--;

            await sleep(500);

            bars[j + 1].classList.remove("active");
        }

        array[j + 1] = key;
        bars[j + 1].style.height = `${key * 3}px`;

        bars[i].classList.remove("active");
    }
}

// Selection Sort algorithm
async function selectionSort() {
    const bars = document.querySelectorAll(".bar");
    for (let i = 0; i < array.length - 1; i++) {
        let minIndex = i;
        bars[minIndex].classList.add("active");

        for (let j = i + 1; j < array.length; j++) {
            bars[j].classList.add("active");

            await sleep(500);

            if (array[j] < array[minIndex]) {
                bars[minIndex].classList.remove("active");
                minIndex = j;
                bars[minIndex].classList.add("active");
            }
            bars[j].classList.remove("active");
        }

        if (minIndex !== i) {
            let temp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = temp;

            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIndex].style.height = `${array[minIndex] * 3}px`;
        }

        bars[minIndex].classList.remove("active");
    }
}

// Merge Sort algorithm
async function mergeSort(left, right) {
    if (left >= right) {
        return;
    }
    
    const middle = Math.floor((left + right) / 2);
    await mergeSort(left, middle);
    await mergeSort(middle + 1, right);
    await merge(left, middle, right);
}

async function merge(left, middle, right) {
    const bars = document.querySelectorAll(".bar");
    const leftArray = array.slice(left, middle + 1);
    const rightArray = array.slice(middle + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < leftArray.length && j < rightArray.length) {
        bars[k].classList.add("active");
        
        await sleep(500);

        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].classList.remove("active");
        k++;
    }

    while (i < leftArray.length) {
        bars[k].classList.add("active");
        await sleep(500);

        array[k] = leftArray[i];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].classList.remove("active");
        i++;
        k++;
    }

    while (j < rightArray.length) {
        bars[k].classList.add("active");
        await sleep(500);

        array[k] = rightArray[j];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].classList.remove("active");
        j++;
        k++;
    }
}

// Quick Sort algorithm
async function quickSort(low, high) {
    if (low < high) {
        let pi = await partition(low, high);
        await quickSort(low, pi - 1);
        await quickSort(pi + 1, high);
    }
}

async function partition(low, high) {
    const bars = document.querySelectorAll(".bar");
    let pivot = array[high];
    let i = low - 1;

    bars[high].classList.add("active");

    for (let j = low; j < high; j++) {
        bars[j].classList.add("active");

        await sleep(500);

        if (array[j] < pivot) {
            i++;
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            bars[i].style.height = `${array[i] * 3}px`;
            bars[j].style.height = `${array[j] * 3}px`;
        }
        bars[j].classList.remove("active");
    }

    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    bars[i + 1].style.height = `${array[i + 1] * 3}px`;
    bars[high].style.height = `${array[high] * 3}px`;

    bars[high].classList.remove("active");

    return i + 1;
}

// Heap Sort algorithm
async function heapSort() {
    const bars = document.querySelectorAll(".bar");
    let n = array.length;

    // Build heap (rearrange array)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }

    // Extract elements from heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move current root to end
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;

        bars[0].style.height = `${array[0] * 3}px`;
        bars[i].style.height = `${array[i] * 3}px`;

        await sleep(500);

        // Call heapify on the reduced heap
        await heapify(i, 0);
    }
}

async function heapify(n, i) {
    const bars = document.querySelectorAll(".bar");
    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) {
        largest = left;
    }

    if (right < n && array[right] > array[largest]) {
        largest = right;
    }

    if (largest !== i) {
        let temp = array[i];
        array[i] = array[largest];
        array[largest] = temp;

        bars[i].style.height = `${array[i] * 3}px`;
        bars[largest].style.height = `${array[largest] * 3}px`;

        await sleep(500);

        await heapify(n, largest);
    }
}

// Utility function to pause execution for a given amount of time
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}