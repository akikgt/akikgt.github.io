const COLOR = '#87ceeb'

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

edgeList[1] = [2, 6];
edgeList[2] = [1, 3, 7];
edgeList[3] = [2, 8, 4];
edgeList[4] = [3, 9, 5];
edgeList[5] = [4, 10];
edgeList[6] = [1, 11];
edgeList[7] = [2];
edgeList[8] = [3, 13];
edgeList[9] = [4, 14];
edgeList[10] = [5, 15];
edgeList[11] = [6, 12, 16];
edgeList[12] = [11, 13, 17];
edgeList[13] = [8, 18];
edgeList[14] = [9, 15];
edgeList[15] = [14, 20];
edgeList[16] = [11, 21];
edgeList[17] = [12, 22];
edgeList[18] = [13];
edgeList[19] = [20, 24];
edgeList[20] = [15, 19];
edgeList[21] = [16, 22];
edgeList[22] = [17, 21, 23];
edgeList[23] = [22];
edgeList[24] = [19, 25];
edgeList[25] = [24];

/* --------------------------------------- */

drawInitialMaze();

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
            ctx.fillStyle = COLOR;
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
