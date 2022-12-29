const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const score = document.querySelector("#score");
const resetBtn = document.querySelector("#resetBtn");


const gameWidth = gameBoard.width, gameHeight = gameBoard.height;


const boardBackground = "white",
        snakeColor = "#008080",
        snakeBorder = "white",
        foodColor = "red";

const unitSize = 25;

let speed = 150;

let running = false;

let xVelocity = unitSize, yVelocity = 0;

let foodX, foodY;

let scoreValue = 0;

let snake = [
    {x: unitSize * 4, y: 0},
    {x: unitSize * 3, y: 0},
    {x: unitSize * 2, y: 0},
    {x: unitSize , y: 0},
    {x: 0, y: 0}
    
];

const gameStart = ()=>{
    running = true;
    scoreValue.textContent = score;
    createFood();
    drawFood();
    nextTick();

};
const nextTick = ()=>{
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, speed)
    }
};
const clearBoard = ()=>{
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0, 0, gameWidth, gameHeight);
};
const createFood = ()=>{
    let randomFood = (min,max)=>{
        return Math.floor((Math.random() * (max - min) + min) / unitSize) * unitSize;
    }
    foodX = randomFood(0, gameWidth - unitSize);
    foodY = randomFood(0, gameWidth - unitSize);
};
const drawFood = ()=>{
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
};
const moveSnake = ()=>{
    let head = {x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
    snake.unshift(head);
    let didEatFood = snake[0].x === foodX && snake[0].y === foodY;
    if(didEatFood){
        scoreValue++;
        score.textContent = scoreValue;
        createFood();
        speed -= 1;
    }else{
        snake.pop();
    }
};
const drawSnake = ()=>{
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach(part=>{
        ctx.fillRect(part.x, part.y, unitSize, unitSize); 
        ctx.strokeRect(part.x, part.y, unitSize, unitSize);
    }
    )
};
const changeDirection = (event)=>{
    let key = event.keyCode;
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

        
    switch(true){
        case(key == LEFT_KEY && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case(key == RIGHT_KEY && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case(key == UP_KEY && !goingDown):
            xVelocity = 0;
            yVelocity = -unitSize;
            break;
        case(key == DOWN_KEY && !goingUp):
            xVelocity = 0;
            yVelocity = unitSize;
            break;


    }
};
const checkGameOver = ()=>{
    let hitLeftWall = snake[0].x < 0;
    let hitRightWall = snake[0].x > gameWidth - unitSize;
    let hitTopWall = snake[0].y < 0;
    let hitBottomWall = snake[0].y > gameHeight - unitSize;
    let hitSelf = snake.some((part, index)=>{
        return index > 0 && snake[0].x === part.x && snake[0].y === part.y;
    })
    if(hitLeftWall || hitRightWall || hitTopWall || hitBottomWall || hitSelf){
        running = false;
        displayGameOver();
    }
};
const displayGameOver = ()=>{
    ctx.fillStyle = "black";
    ctx.font = "40px Orbitron";
    ctx.fillText("Game Over", gameWidth/4, gameHeight/2);
};
const resetGame = ()=>{
    snake = [
        {x: unitSize * 4, y: 0},
        {x: unitSize * 3, y: 0},
        {x: unitSize * 2, y: 0},
        {x: unitSize , y: 0},
        {x: 0, y: 0}
        
    ];
    scoreValue = 0;
    speed = 150;
    score.textContent = scoreValue;
    xVelocity = unitSize;
    yVelocity = 0;
    gameStart();
};
window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();
