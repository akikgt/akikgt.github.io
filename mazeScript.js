const DEFAULT_COLOR = '#87ceeb'
const VISITED_COLOR = '#ff0000'

const HEIGHT = 5;
const WIDTH = 5;

const nodeCoords = [];
const edgeList = [];

/* --------------------------------------- */
// set edgelist
for (let i = 0; i <= HEIGHT * WIDTH; i++) {
    nodeCoords[i] = {};
    edgeList[i] = [];
}

// order: clockwise
edgeList[1] = [2, 6];
edgeList[2] = [3, 7, 1];
edgeList[3] = [4, 8, 2];
edgeList[4] = [5, 9, 3];
edgeList[5] = [10, 4];
edgeList[6] = [1, 11];
edgeList[7] = [2];
edgeList[8] = [3, 13];
edgeList[9] = [4, 14];
edgeList[10] = [5, 15];
edgeList[11] = [6, 12, 16];
edgeList[12] = [13, 17, 11];
edgeList[13] = [8, 18, 12];
edgeList[14] = [9, 15];
edgeList[15] = [20, 14];
edgeList[16] = [11, 21];
edgeList[17] = [12, 22];
edgeList[18] = [13];
edgeList[19] = [20, 24];
edgeList[20] = [15, 19];
edgeList[21] = [16, 22];
edgeList[22] = [17, 23, 21];
edgeList[23] = [22];
edgeList[24] = [19, 25];
edgeList[25] = [24];

/* --------------------------------------- */

// draw functions
function drawInitialMaze() {
    let canvas = document.getElementById('canvasId');
    let ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let nodeIndex = 1;

    for (let i = 1; i <= HEIGHT; i++) {
        for (let j = 1; j <= WIDTH; j++) {
            // set node coordinates
            let x = canvas.width * (j / (WIDTH+1));
            let y = canvas.height * (i/ (HEIGHT+1));
            nodeCoords[nodeIndex].x = x;
            nodeCoords[nodeIndex].y = y;

            // draw node circle
            ctx.fillStyle = DEFAULT_COLOR;
            ctx.beginPath();
            ctx.arc(nodeCoords[nodeIndex].x, nodeCoords[nodeIndex].y, canvas.width / 22, 0, Math.PI * 2, true);
            ctx.fill();

            // draw circle outline
            ctx.strokeStyle = "#222222";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(nodeCoords[nodeIndex].x, nodeCoords[nodeIndex].y, canvas.width / 21, 0, Math.PI * 2, true);
            ctx.stroke();

            // write node number
            ctx.fillStyle = "#000000";
            ctx.font = "30px serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(nodeIndex, nodeCoords[nodeIndex].x, nodeCoords[nodeIndex].y);

            nodeIndex++;
        }
    }

    // draw lines between nodes. skip this process when i == 0 (root node)
    ctx.globalCompositeOperation = "destination-over"; // draw lines behind the nodes
        for (let i = 1; i <= HEIGHT * WIDTH; i++) {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 5;

            // check adjacent nodes
            for (let j of edgeList[i]) {
                ctx.beginPath();
                ctx.moveTo(nodeCoords[i].x, nodeCoords[i].y);
                ctx.lineTo(nodeCoords[j].x, nodeCoords[j].y);
                ctx.stroke();
            }
        }
    ctx.globalCompositeOperation = "source-over";

}

function drawPath(reachable) {
    canvas = document.getElementById('canvasId');
    let ctx = canvas.getContext('2d');

    for (let i = 0; i < reachable.length; i++) {
        let current = reachable[i];

        // draw node circle
        ctx.fillStyle = VISITED_COLOR;
        ctx.beginPath();
        ctx.arc(nodeCoords[current].x, nodeCoords[current].y, canvas.width / 22, 0, Math.PI * 2, true);
        ctx.fill();

        // write node number
        ctx.fillStyle = "#000000";
        ctx.font = "30px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(current, nodeCoords[current].x, nodeCoords[current].y);
    }
}


// function DFS(start, end) {
//     let reachable = [];
//     let stack = [];
//     stack.push(start);

//     while (stack.length != 0) {
//         let currentNode = stack[stack.length - 1];
//         stack.pop();
//         // if already visited, skip
//         if (reachable.indexOf(currentNode) >= 0)
//             continue;

//         reachable.push(currentNode);

//         // if reaches goal
//         if (currentNode === end)
//             break;

//         // check adjacent nodes and add them to the container
//         for (let adjNode of edgeList[currentNode]) {
//             stack.push(adjNode);
//         }
//     }

//     console.log("DFS: " + reachable);
// }

// DFS(1, 25);

// function BFS(start, end) {
//     let reachable = [];
//     let queue = [];
//     queue.push(start);

//     while (queue.length != 0) {
//         let currentNode = queue[0];
//         queue.shift();
//         // if already visited, skip
//         if (reachable.indexOf(currentNode) >= 0)
//             continue;

//         reachable.push(currentNode);

//         // if reaches goal
//         if (currentNode === end)
//             break;

//         // check adjacent nodes and add them to the container
//         for (let adjNode of edgeList[currentNode]) {
//             queue.push(adjNode);
//         }
//     }

//     console.log("BFS: " + reachable);
// }

// BFS(1, 25);


function stepDFS() {
    let log = document.getElementById('log');
    if (reachable.length === 25) {
        log.textContent = `Visited all nodes`;
        return;
    }
    if (stack.length === 0) {
        log.textContent = `Stack is empty`;
        return;
    }

    currentNode = stack.pop();
    log.textContent = `Pop ${currentNode}. `;

    // reachable contains currentNode, skip
    if (reachable.indexOf(currentNode) >= 0) {
        log.textContent += `Already visited`;
        return;
    }

    reachable.push(currentNode);

    // if reaches goal
    if (currentNode === goal)
        log.textContent += `Reached goal`;

    numOfPush = 0;
    // check adjacent nodes and add them to the container
    for (let adjNode of edgeList[currentNode]) {
        if (reachable.indexOf(adjNode) >= 0)
            continue;
        stack.push(adjNode);
        numOfPush++;
    }

    console.log("Reachable: " + reachable);
    drawPath(reachable);
}


function stepBFS() {
    let log = document.getElementById('log');
    if (reachable.length === 25) {
        log.textContent = `Visited all nodes`;
        return;
    }
    if (queue.length === 0) {
        log.textContent = `queue is empty`;
        return;
    }

    currentNode = queue.shift();
    log.textContent = `Pop ${currentNode}. `;

    // reachable contains currentNode, skip
    if (reachable.indexOf(currentNode) >= 0) {
        log.textContent += `Already visited`;
        return;
    }

    reachable.push(currentNode);

    // if reaches goal
    if (currentNode === goal)
        log.textContent += `Reached goal`;

    numOfPush = 0;
    // check adjacent nodes and add them to the container
    for (let adjNode of edgeList[currentNode]) {
        if (reachable.indexOf(adjNode) >= 0)
            continue;
        queue.push(adjNode);
        numOfPush++;
    }

    console.log("Reachable: " + reachable);
    drawPath(reachable);
}


// global variables
let start;
let goal;
let reachable;
let stack;
let queue;
let currentNode;
let algorithm;
let numOfPush = 0;

function reset() {
    start = 1;
    goal = 25;
    reachable = [];
    stack = [start];
    queue = [start];
    algorithm = 'dfs';

    drawInitialMaze();
    document.getElementById('log').textContent = "";
    document.getElementById('reachable').textContent = `{${reachable}}`;
    document.getElementById('stack').textContent = `{${stack}}`;
    document.getElementById('queue').textContent = `{${queue}}`;
}

document.getElementById('reset').addEventListener('click', function() {
    reset();
    document.getElementById('algorithmSelect').algorithm[0].checked = "ckecked";
});

document.getElementById('step').addEventListener('click', function() {
    if (algorithm === 'dfs') {
        stepDFS();
        let stackLog = [];
        for (let i in stack) {
            if (i >= stack.length - numOfPush) {
                stackLog[i] = `<b>${stack[i]}</b>`;
            }
            else {
                stackLog[i] = `${stack[i]}`;
            }
        }
        document.getElementById('stack').innerHTML = `{${stackLog}}`;
    }
    else if (algorithm === 'bfs') {
        stepBFS();
        let queueLog = [];
        for (let i in queue) {
            if (i >= queue.length - numOfPush) {
                queueLog[i] = `<b>${queue[i]}</b>`;
            }
            else {
                queueLog[i] = `${queue[i]}`;
            }
        }
        document.getElementById('queue').innerHTML = `{${queueLog}}`;
    }
    document.getElementById('reachable').innerHTML = `{${reachable}}`;

});


document.getElementById('algorithmSelect').addEventListener('change', function() {
    reset();
    algorithm = this.algorithm.value;
    document.getElementById('log').textContent = `Mode: ${algorithm}`;
})


// starts from here
reset();