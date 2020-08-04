var numOfSquares = 6;
var colors;
var pickedColor; // color picked as target color

var squares = document.getElementsByClassName("square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.getElementById("messageDisplay");
var h1 = document.querySelector("h1");
var newColors = document.querySelector("#reset");
var modeBtns = document.querySelectorAll(".modeBtns");

init();

function init() {
    reset();
    setUpModeBtns();
    setUpSquares();
}

function setUpModeBtns() {
    for(var i = 0;  i < modeBtns.length; i++) {
        modeBtns[i].addEventListener("click", function() {
            // make it selected and other one unselected
            modeBtns[0].classList.toggle("selected");
            modeBtns[1].classList.toggle("selected");
            // change number of squares
            (this.textContent === "EASY") ? numOfSquares = 3 : numOfSquares = 6;
        
            reset();
        });
    }
}

function reset() {
    // generate required number of random color
    colors = generateRandomColors(numOfSquares);
    //apply them to squares
    for(var i = 0; i < squares.length; i++) {
        if(colors[i]) {
            squares[i].style.backgroundColor = colors[i];
            squares[i].style.display = "block";
        }
        else {
            squares[i].style.display = "none";
        }
    }
    // pick a random color from them
    pickedColor = pickRandomColor();
    // give it to colorDisplay
    colorDisplay.textContent = pickedColor;
    // reset h1 color
    h1.style.backgroundColor = "steelblue";
    // remove the Correct message
    messageDisplay.textContent = "";
}

newColors.addEventListener("click", function() {
    reset();
    // change play again to new colors
    newColors.textContent = "New Colors";
});

function setUpSquares() {
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
    
        // add event listener to squares
        squares[i].addEventListener("click", function() {
            var clickedColor = this.style.backgroundColor;
            
            // check if clicked color is same as picked one.
            if(clickedColor === pickedColor) {
                messageDisplay.textContent = "Correct";
                //change color of all the boxes = clickedColor
                changeToRightColor(clickedColor);
                // Display Play Again?
                newColors.textContent = "Play Again?";
            }
            else {
                messageDisplay.textContent = "Incorrect";
                // fade out the box
                this.style.backgroundColor = "#232323";
            }
        });
    }
}


function pickRandomColor() {
    // generate random index to choose a color
    var index = Math.floor(Math.random() * colors.length);
    return colors[index];
}

function generateRandomColors(num) {
    // make an array
    var arr = [];
    // fill it with different colors
    for(var i = 0; i < num; i++) {
        arr.push(generateColors());
    }
    // return that array
    return arr;
}

function generateColors() {
    // generating random numbers between 0 - 255 to make a color
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    return "rgb(" + r + ", " + g + ", " + b + ")";
}

function changeToRightColor(clickedColor) {
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = clickedColor;
    }
    h1.style.backgroundColor = clickedColor;
}