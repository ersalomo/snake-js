const gameBoard = document.getElementById('gameBoard')
const ctx =  gameBoard.getContext('2d')
const scoreText = document.getElementById('scoreText')
const resetBtn = document.querySelector('#resetBtn')
const gameWidth = gameBoard.width
const gameHeight = gameBoard.height
const boardBg = 'white'
const snakeColor = 'lightgreen'
const snakeBorder = 'black'
const foodColor = 'red'
const unitSize  = 25
let running  = false
let xVelocity = unitSize // jika position pindah ke kanan // jika negative pindah ke kiri
let yVelocity = 0 // tidak tidak pindah ke atas ke bawah
let foodX,foodY;
let score = 0
let snake = [
    { x:unitSize*4, y:0 },
    { x:unitSize*3, y:0 },
    { x:unitSize*2, y:0 },
    { x:unitSize, y:0 },
    { x:0, y:0 },
]

window.addEventListener('keydown',changeDirection)
resetBtn.addEventListener('click',resetGame)

gameStart()

function  gameStart() {
    running = true
    scoreText.textContent = score
    createFood()
    drawFood()
    nextTick()
    
}
function  nextTick() {
    if(running){
        setTimeout(() => {
            clearBoard()
            drawFood()
            moveSnake()
            drawSnake()
            checkGameOver()
            nextTick()
        }, 75);
    }else{
        displayGameOver()
    }
}
function checkGameOver() {
    switch (true) {
        case(snake[0].x < 0):
            running = false
            break;
        case(snake[0].x >= gameWidth):
            running = false
            break;
        case(snake[0].y < 0):
            running = false
            break;
        case(snake[0].y >= gameHeight):
            running = false
            break;
    }
    for(let i = 1; i<snake.length; i++ ){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false
        }
    }
}
function  clearBoard() {
    ctx.fillStyle = boardBg
    ctx.fillRect(0, 0,gameWidth,gameHeight)

}
function  createFood() {
    const randomFood = (min,max) => {
        const rnNum = Math.round((Math.random() * (max - min) + min) / unitSize) * unitSize;
        return rnNum
    }
    foodX = randomFood(0,gameWidth - unitSize)
    foodY = randomFood(0,gameHeight - unitSize)
}
function drawFood() {
    ctx.fillStyle = foodColor
    ctx.fillRect(foodX,foodY,unitSize,unitSize)
}
function moveSnake() {
    const head = {
        x: snake[0].x + xVelocity,
        y: snake[0].y + yVelocity
    }
    snake.unshift(head)
    if(snake[0].x == foodX && snake[0].y == foodY){
        scoreText.textContent = score++
        createFood()
    }else{
        snake.pop()
    }
}
function drawSnake() {
    ctx.fillStyle = snakeColor
    ctx.strokeStyle = snakeBorder
    snake.forEach(({x,y})=>{
        ctx.fillRect(x,y,unitSize,unitSize)
        ctx.strokeRect(x,y,unitSize,unitSize)
    })
}
function changeDirection(event) {
    const keyPresed = event.keyCode
    const LEFT  = 37
    const UP    = 38
    const RIGHT = 39
    const DOWN  = 40
    const goingUp    = (yVelocity == -unitSize)
    const goingDown  = (yVelocity == unitSize)
    const goingRight = (xVelocity == unitSize)
    const goingLeft  = (xVelocity == -unitSize)
    switch (true) {
        case(keyPresed == LEFT && !goingRight):
            xVelocity = -unitSize
            yVelocity = 0
            break;
        case(keyPresed == UP && !goingDown):
            xVelocity = 0
            yVelocity = -unitSize 
            break;
        case(keyPresed == RIGHT && !goingLeft):
            xVelocity = unitSize
            yVelocity = 0 
            break;
        case(keyPresed == DOWN && !goingUp):
            xVelocity = 0
            yVelocity = unitSize
            break;
    }

}
function displayGameOver() {
    ctx.font = '50px MV Boli'
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.fillText('Game Over',gameWidth/2, gameHeight/2)
    running = false
}
function resetGame() {
    score = 0
    xVelocity = unitSize
    yvelocity = 0
    snake = [
        { x:unitSize*4, y:0 },
        { x:unitSize*3, y:0 },
        { x:unitSize*2, y:0 },
        { x:unitSize, y:0 },
        { x:0, y:0 },
    ]
    gameStart()
}