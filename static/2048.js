const gridDisplay = document.querySelector('.grid')
const scoreDisplay = document.querySelector('score')
const resultDisplay = document.getElementById('result')
const width = 4
let squares = []
let score = 0

var tileColor = ['#3c2863', '#ECE0C8', '#EFB27C', '#F39768',
    '#F37D63', '#F46042', '#EACF76', '#EDCB67',
    '#ECC85A', '#E7C257', '#E8BE4E', '#EF676B',
    '#EE4D59', '#E14239', '#72B3D5', '#5C9FDF',
    '#007CBD'];


function createBoard(){
    for(let i =0; i <width*width; i++){
        square = document.createElement('div')
        square.innerHTML = 0
        square.id = i
        gridDisplay.appendChild(square)
        squares.push(square)
    }
    randomNum()
    randomNum()
    color()
}

function randomNum(){
    num = Math.floor(Math.random() * squares.length)
    if(squares[num].innerHTML == 0){
        squares[num].innerHTML = 2
    }
    else{
        randomNum()
    }
}

function moveRight(){
    for(let i=0; i < 16; i++){
        if(i%4 === 0){
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i+1].innerHTML
            let totalThree = squares[i+2].innerHTML
            let totalFour = squares[i+3].innerHTML
            let row =[parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filterRow = row.filter(num => num)
            let missing = 4 - filterRow.length
            let zero = Array(missing).fill(0)
            let newRow = zero.concat(filterRow)

            squares[i].innerHTML = newRow[0]
            squares[i+1].innerHTML = newRow[1]
            squares[i + 2].innerHTML = newRow[2]
            squares[i + 3].innerHTML = newRow[3]
        }
    }
}

function moveLeft() {
    for (let i = 0; i < 16; i++) {
        if (i % 4 === 0) {
            let totalOne = squares[i].innerHTML
            let totalTwo = squares[i + 1].innerHTML
            let totalThree = squares[i + 2].innerHTML
            let totalFour = squares[i + 3].innerHTML
            let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

            let filterRow = row.filter(num => num)
            let missing = 4 - filterRow.length
            let zero = Array(missing).fill(0)
            let newRow = filterRow.concat(zero)

            squares[i].innerHTML = newRow[0]
            squares[i + 1].innerHTML = newRow[1]
            squares[i + 2].innerHTML = newRow[2]
            squares[i + 3].innerHTML = newRow[3]
        }
    }
}

function moveDown(){
    for(let i=0; i<4; i++){
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i + width].innerHTML
        let totalThree = squares[i + width * 2].innerHTML
        let totalFour = squares[i + width * 3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filterRow = row.filter(num => num)
        let missing = 4 - filterRow.length
        let zero = Array(missing).fill(0)
        let newRow = zero.concat(filterRow)

        squares[i].innerHTML = newRow[0]
        squares[i + width*1].innerHTML = newRow[1]
        squares[i + width *2].innerHTML = newRow[2]
        squares[i + width *3].innerHTML = newRow[3]
    }
}

function moveUp() {
    for (let i = 0; i < 4; i++) {
        let totalOne = squares[i].innerHTML
        let totalTwo = squares[i + width].innerHTML
        let totalThree = squares[i + width * 2].innerHTML
        let totalFour = squares[i + width * 3].innerHTML
        let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)]

        let filterRow = row.filter(num => num)
        let missing = 4 - filterRow.length
        let zero = Array(missing).fill(0)
        let newRow = filterRow.concat(zero)

        squares[i].innerHTML = newRow[0]
        squares[i + width * 1].innerHTML = newRow[1]
        squares[i + width * 2].innerHTML = newRow[2]
        squares[i + width * 3].innerHTML = newRow[3]
    }
}

function combine(mode){
    scored = document.getElementById("score")
    let combined = 0
    if(mode === 1){
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML == + squares[i + 1].innerHTML) {
                combined = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML)
                squares[i].innerHTML = combined
                squares[i + 1].innerHTML = 0
            }
        }
    }
    else{
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML == + squares[i + width].innerHTML) {
                combined = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML)
                squares[i].innerHTML = combined
                squares[i + width].innerHTML = 0
            }
        }
    }
    score += combined
    scored.innerHTML = score
}

function check(){
    let resultDisplay = document.getElementById("result")
    let counter = 0
    for(let i=0; i < squares.length; i++){
        counter = 16
        if (squares[i].innerHTML == 2048){
            resultDisplay.innerHTML = "You Win!"
            document.removeEventListener("keyup", control)
            return;
        }
        console.log(counter)
    }
    if(counter === 0){
        resultDisplay.innerHTML = "Game Over!"
        document.removeEventListener("keyup", control)
    }
}

function color(){
    for (let i = 0; i < squares.length; i++){
        squares[i].style.backgroundColor = tileColor[parseInt(squares[i].innerHTML)];
    }
}

function control(e){
    if(e.keyCode == 39){
        moveRight()
        combine(1)
        moveRight()
        randomNum()
    }
    else if(e.keyCode == 37){
        moveLeft()
        combine(1)
        moveLeft()
        randomNum()
    }
    else if(e.keyCode == 38){
        moveUp()
        combine(0)
        moveUp()
        randomNum()
    }
    else if(e.keyCode == 40){
        moveDown()
        combine(0)
        moveDown()
        randomNum()
    }
    check()
    color()
}

document.addEventListener('keyup',control)
createBoard()
