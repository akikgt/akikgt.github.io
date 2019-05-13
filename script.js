const COLOR = '#d1ffa3'
const DEPTH = 3;

// setup heap object
const heap = {
    data: [],
    size: 0,
    capacity: 15,
    selected: -1
};
const insertValues = [30,20,50,10,5,70];
let insertIndex = 0;
// heap.data = [1,2,3,4,5,6,7,8];
// heap.size = heap.data.length;

let startButton = document.getElementById('resetButton');
startButton.addEventListener('click', function(event) {
    clearState();
    drawTree();
});

// step operations
let stepButton = document.getElementById('stepButton');
stepButton.addEventListener('click', function(event) {
    if (insertIndex >= insertValues.length) {
        console.log('All values inserted');
        this.disabled = true;
        this.textContent = "Finished";
        return;
    }


    let percolateFlag = 0;
    // percolate up 
    let currentIndex = heap.selected;
    if (currentIndex > 0) {
        let current = heap.data[currentIndex];
        let parentIndex = Math.floor((currentIndex - 1)/2);
        let parent = heap.data[parentIndex];
        if (parent > current) {
            heap.data[currentIndex] = parent;
            heap.data[parentIndex] = current;
            heap.selected = parentIndex;
            percolateFlag = 1;
            console.log(`Swap ${parent} and ${current}`);
        }
    }

    // add value
    if (!percolateFlag) {
        let val = insertValues[insertIndex++];
        heap.data.push(val);
        heap.selected = heap.size;
        heap.size++;
        console.log(`Insert ${val}`);
    }

    // parcolateUp();

    drawTree();
}); 

function clearState() {
    document.getElementById('stepButton').disabled = false; // activate stepButton
    document.getElementById('stepButton').textContent = "Next step"; // reset button text
    
    // clear canvas
    let canvas = document.getElementById('canvasId');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // reset heap settings
    heap.data = [];
    heap.size = 0;
    heap.capacity = 15;
    heap.selected = -1;

    // reset inserValues
    insertIndex = 0;
}


function parcolateUp() {
    let index = heap.size - 1;

    // until root node
    while (index != 0) {
        let current = heap.data[index];
        let parentIndex = Math.floor((index-1)/2);
        let parent = heap.data[parentIndex];
        
        if (current < parent) {
            heap.data[index] = parent;
            heap.data[parentIndex] = current;
            heap.selected = parentIndex;
        }

        // update index to parent 
        index = parentIndex;
    }

    return;
}




// draw functions
function drawTree() {
    let canvas = document.getElementById('canvasId');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let nodeIndex = 0;

    // draw tree
    for (let i = 0; i <= DEPTH; i++) {
        let nodeInterval = Math.pow(2, i) + 1;
        // draw nodes
        for (let j = 1; j < nodeInterval; j++) {
            // draw circle
            ctx.fillStyle = COLOR;
            // mark last added value
            if (nodeIndex == heap.selected) {
                ctx.strokeStyle = "#ff0000";
                ctx.beginPath();
                ctx.arc(canvas.width * (j / nodeInterval), canvas.height * ((i + 1) / (DEPTH + 2)), canvas.width / 23, 0, Math.PI * 2, true);
                ctx.stroke();
            }
            ctx.beginPath();
            ctx.arc(canvas.width * (j / nodeInterval), canvas.height * ((i + 1) / (DEPTH + 2)), canvas.width / 24, 0, Math.PI * 2, true);
            ctx.fill();

            // write number
            ctx.fillStyle = "#aaaaaa";
            if (nodeIndex < heap.size)
                ctx.fillStyle = "#000000";
            ctx.font = "30px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            
            let nodeValue = heap.data[nodeIndex];
            if (nodeValue == undefined) {
                nodeValue = "";
            }
            ctx.fillText(nodeValue, canvas.width * (j / nodeInterval), canvas.height * ((i + 1) / (DEPTH + 2)));

            // write index
            ctx.fillStyle = "#333333";
            ctx.font = "15px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(nodeIndex, canvas.width * (j / nodeInterval) + 50, canvas.height * ((i + 1) / (DEPTH + 2)) + 25);
            nodeIndex++;
        }

        // draw lines between nodes. skip this process when i == 0 (root node)
        for (let j = 1; j < nodeInterval && i != 0; j++) {
            ctx.globalCompositeOperation = "destination-over"; // draw lines behind the nodes
            ctx.strokeStyle = COLOR;
            ctx.lineWidth = 7;
            ctx.beginPath();
            // parent node info
            // parent:children pairs are like: {1:(1,2), 2:(3,4), 3:(5,6), ....}
            let parentNode = Math.floor((j - 1) / 2) + 1;
            let parentInterval = Math.pow(2, i - 1) + 1;
            // set parent node as starting point for drawing lines
            ctx.moveTo(canvas.width * (parentNode / parentInterval), canvas.height * (i / (DEPTH + 2)));
            // draw parent to children
            ctx.lineTo(canvas.width * (j / nodeInterval), canvas.height * ((i + 1) / (DEPTH + 2)));
            ctx.stroke();
            ctx.globalCompositeOperation = "source-over";
        }
    }
}





let insertButton = document.getElementById('insertButton');
function insertAndDrawNewTree() {
    let form = document.getElementById('insertForm');
    let val = form.value;
    form.value = ""; // erase input value

    // if empty, do nothing
    if (!val)
        return;

    if (heap.size == heap.capacity) {
        console.log('data is full. cannot insert any more');
        return;
    }

    // insert the value to the heap
    heap.data[heap.size] = parseInt(val);
    heap.selected = heap.size;
    heap.size++;
    console.log(`Insert ${val}`);

    drawTree();
}
insertButton.addEventListener('click', insertAndDrawNewTree);
document.getElementById('insert').addEventListener('keypress', function(event) {
    let key = event.which || event.keyCode;
    if (key == 13) { // 13 is enter key
        insertAndDrawNewTree();
    }
});

let percolateUpButton = document.getElementById('percolateUpButton');
percolateUpButton.addEventListener('click', function(event) {
    let current = heap.data[heap.selected];
    let parentIndex = Math.floor((heap.selected-1)/2);
    let parent = heap.data[parentIndex];

    if (current < parent) {
        // swap
        heap.data[heap.selected] = parent;
        heap.data[parentIndex] = current;
        heap.selected = parentIndex;
        console.log(`Swap ${parent} and ${current}`);
    }

    drawTree();
});

let removeButton = document.getElementById('removeButton');
removeButton.addEventListener('click', function(event) {
    if (heap.size <= 0)
        return;

    console.log(`Remove ${heap.data[0]}`);
    removeButton.disabled = true;
    heap.selected = 0;
    heap.data[0] = "";
    drawTree();

    // markup the node to be swaped (=last element)
    setTimeout(function () {
        console.log(`Fill the hole with the last element ${heap.data[heap.size - 1]}`);
        heap.selected = heap.size - 1;
        drawTree();
        // swap
        setTimeout(function () {
            heap.selected = 0;
            heap.data[0] = heap.data[heap.size - 1];
            heap.data[heap.size - 1] = "";
            heap.size--;
            drawTree();

            removeButton.disabled = false;
        }, 1000);
    }, 1000);
});



let percolateDownButton = document.getElementById('percolateDownButton');
percolateDownButton.addEventListener('click', function(event) {
    percolateDown();
    drawTree();
});
function percolateDown() {
    let current = heap.data[heap.selected];
    let leftChildIndex = heap.selected * 2 + 1;
    let rightChildIndex = heap.selected * 2 + 2;
    let smallestChildIndex;


    // if there is no child
    if (leftChildIndex >= heap.size) {
        return false;
    }

    // have one child
    if (rightChildIndex >= heap.size) {
        smallestChildIndex = leftChildIndex;
    }
    // have two children
    else {
        if (heap.data[leftChildIndex] < heap.data[rightChildIndex])
            smallestChildIndex = leftChildIndex;
        else
            smallestChildIndex = rightChildIndex;
    }

    // compare
    if (current > heap.data[smallestChildIndex]) {
        // swap
        console.log(`Swap ${heap.data[smallestChildIndex]} and ${current}`);
        heap.data[heap.selected] = heap.data[smallestChildIndex];
        heap.data[smallestChildIndex] = current;
        heap.selected = smallestChildIndex;
        return true;
    }

    return false;
}

let sortButton = document.getElementById('sortButton');
sortButton.addEventListener('click', function(event) {
    if (heap.size <= 0)
        return;

    console.log(`swap ${heap.data[0]} and last element`);
    sortButton.disabled = true;
    heap.selected = 0;
    let root = heap.data[0];
    drawTree();

    // markup the node to be swaped (=last element)
    setTimeout(function () {
        heap.selected = heap.size - 1;
        drawTree();
        // swap
        setTimeout(function () {
            heap.selected = 0;
            heap.data[0] = heap.data[heap.size - 1];
            heap.data[heap.size - 1] = root;
            heap.size--;
            drawTree();

            sortButton.disabled = false;
            document.getElementById('heapData').textContent = `Array: ${heap.data}`;
        }, 1000);
    }, 1000);
});


let buildButton = document.getElementById('buildButton');
let buildCounter = 0;
buildButton.addEventListener('click', function(event) {
    let buildIndex = Math.floor(heap.size/2) - 1 - buildCounter;
    heap.selected = buildIndex;
    buildCounter++;
    drawTree();
    // buildButton.disabled = true;
    // for (let i = Math.floor(heap.size/2)-1; i >= 0; i--) {
    //     heap.selected = i;
    //     drawTree();

    //     // parcolate down until no change occurs
    //     while(percolateDown());
    // }
});




// entry point
heap.data = [9,3,2,4,5,7,8,6,1,0];
heap.size = 10;
drawTree();