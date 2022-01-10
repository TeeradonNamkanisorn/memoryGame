
let wins = 0;
let losses = 0;

let gridArray = [];
let coloredTiles = [];
let clickedTiles = [];
let numOfClicks = 0;
let matchResult='';
let clickAllowed = 0; 
let inPrepPhase = false;
let squareDim = 5;
let numberOfGrid = squareDim ** 2;
const numberOfColored = 5;

function showStartDialog() {
    document.getElementById('modalBoxContainer').style.display = 'block';
    document.addEventListener('keyup', function(event) {
        if (event.key === ' ') { 
            document.getElementById('modalBoxContainer').style.display= 'none';
        }
    })
}


function genertatePlayGround() {
    for (let i = 0; i < squareDim; i++){
        let row = document.createElement('div')
        let rowIdName = "row"+ "_" + (i+1).toString();
        row.style.width = '800px';
        row.style.height = '100px';
        row.style.margin = '6px auto';
        row.style.boxSizing = "border-box";
        for (let j = 0+squareDim*i; j < squareDim+squareDim*i; j++) {
            let square = document.createElement('div');
            let idName = "square"+'_'+(j+1).toString()
            square.setAttribute('id',idName);
            square.setAttribute('class','tile');
            square.setAttribute('data-id',j);
            square.style.width = '100px';
            square.style.height = '100px';
            square.style.border = '2px solid black';
            square.style.display= 'inline-block';
            square.style.margin = '0px 3px';
            square.style.boxSizing = "border-box";
            square.style.backgroundColor = "white";
            square.innerHTML = idName;
            row.appendChild(square);
            }
     document.getElementById('playGround').appendChild(row)}
     let allTiles = document.querySelectorAll('.tile');
        allTiles.forEach(element => {
            element.addEventListener("click", clickEvent);
            
}); 
}

function clickEvent(event) {
    
    /* Remember to change the color */
    if ((event.target.style.backgroundColor === "white") && (numOfClicks < clickAllowed))  {
    if (!inPrepPhase) {event.target.style.backgroundColor = "blue";
    numOfClicks += 1;
    let num = event.target.dataset.id;
    clickedTiles.push(num);}
    
}
if (numOfClicks === clickAllowed) {
    evaluateWinLose();
    setTimeout(function () {alert('Your match result was: '+matchResult)},300)
    showCorrectTiles();
    setTimeout(function() {alert("Game Over, press RESTART to reshuffle the tiles")},600);
    displayStats();
    return null;
}
}

function evaluateWinLose() {
    let outcome = clickedTiles.every(isAColoredTile);
    if (outcome) {
        matchResult = "win";
        wins += 1;
    } else {
        matchResult = "loss";
        losses += 1;
    }
    
}

function isAColoredTile (clickedId) {
    return coloredTiles.includes(clickedId);
}

function displayStats() {
    let winrate = Math.round(wins*100/(wins+losses));
    document.getElementById('wrPercent').innerHTML = winrate.toString()+'%';
    document.getElementById('winCount').innerHTML = wins.toString();
    document.getElementById('lossCount').innerHTML = losses.toString();
}

function generateRandomColoredIndex() {
    clickAllowed = numberOfColored;
    let squareArray = [];
    let coloredGridArray = [];
    for (let i = 0; i < numberOfGrid; i++) {
        squareArray.push(i.toString())
    }
    for (let i = 0; i < numberOfColored; i++) {
        chosenIndex = Math.floor(squareArray.length*Math.random());
        coloredGridArray.push(squareArray[chosenIndex]);
        squareArray.splice(chosenIndex,1);
        
    }
    return coloredGridArray;
}

/* Takes an array or indexes and colors the corresponding squares*/
function displayColoredGrids(colorArr) {
    for (let i = 0; i < colorArr.length; i++) {
        let indexOfColoredBox = colorArr[i];
        let queryFind = "[data-id=" + "'"+indexOfColoredBox+"']";
        element = document.querySelector(queryFind);
        element.style.backgroundColor = 'red';
    }
}

function clearTiles() {
    let selectAllBlock = document.querySelectorAll('.tile');
    selectAllBlock.forEach(function(element) {
        element.style.backgroundColor = "white";
    })
}

function showCorrectTiles() {
    for (let i = 0; i < coloredTiles.length; i++) {
        let indexOfColoredBox = coloredTiles[i];
        let queryFind = "[data-id=" + "'"+indexOfColoredBox+"']";
        element = document.querySelector(queryFind);
        element.style.border = '2px solid magenta';
    }
}

function startGame() {
    document.getElementById('playGround').innerHTML='';
    genertatePlayGround();
    coloredTiles = [];
    clickedTiles = [];
    clearTiles();
    showStartDialog();
    clickAllowed = 0;
    numOfClicks = 0;
    inPrepPhase = false;
    coloredTiles = generateRandomColoredIndex();
    displayColoredGrids(coloredTiles);
    document.addEventListener('keyup', function() {
        inPrepPhase = true;
        setTimeout(function() {
            clearTiles();
            inPrepPhase = false;
        } ,4000);
    })
}
document.getElementById('startButton').onclick = startGame;
document.getElementById('resetButt').onclick = function() {
    wins = 0;
    losses = 0;
    displayStats();
}
startGame();











 







