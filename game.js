const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

function adjustCanvasSize() {
  const container = document.getElementById("game-container");
  const size = Math.min(container.offsetWidth, container.offsetHeight);
  canvas.width = size;
  canvas.height = size;

  player.x = canvas.width / 2;
  player.y = canvas.height - 50;
}

window.addEventListener("resize", adjustCanvasSize);

const player = {
  x: canvas.width / 2,
  y: canvas.height - 50,
  width: 40,
  height: 40,
  speed: 5,
  color: "blue"
};

const foodItems = [
  { type: "apple", color: "red" },
  { type: "banana", color: "yellow" },
  { type: "cake", color: "brown" },
  { type: "pizza", color: "orange" },
  { type: "burger", color: "green" },
  { type: "ice cream", color: "blue" }
];

function moveLeft() {
  player.x = Math.max(player.x - player.speed, 0);
}

function moveRight() {
  player.x = Math.min(player.x + player.speed, canvas.width - player.width);
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    moveLeft();
  } else if (event.key === "ArrowRight") {
    moveRight();
  }
});
let gameOverScreenShown = false; // To track if the game over screen is shown

function restartGame() {
  score = 0;
  time = 100;
  foodItemsOnScreen.length = 0;
  gameOverScreenShown = false;
}

document.addEventListener("keydown", function (event) {
  if (gameOverScreenShown && event.key === "r") {
    restartGame();
    requestAnimationFrame(gameLoop);
  }
});

function showGameOverScreen() {
  gameOverScreenShown = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "40px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
  ctx.fillText("Press 'R' to restart", canvas.width / 2 - 150, canvas.height / 2 + 40);
}

function createFood(foodType, x, y, color) {
  return {
    x,
    y,
    width: 30,
    height: 30,
    type: foodType,
    color: color
  };
}

function getRandomFood() {
  return foodItems[Math.floor(Math.random() * foodItems.length)];
}

function randomXPosition() {
  return Math.random() * (canvas.width - 30);
}

function randomYPosition() {
  return Math.random() * -canvas.height;
}
function realreset(){
  return 
}

function isCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  );
}

let score = 0;
let time = 100;
const foodItemsOnScreen = [];

function updateScoreAndTime(points) {
  score += points;
  time = Math.min(time + 5, 100);
}

function gameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "40px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#b2ebf2");
  gradient.addColorStop(1, "#80deea");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  if (Math.random() < 0.01) {
    const foodType = getRandomFood().type;
    const foodX = randomXPosition();
    const foodY = randomYPosition();
    const foodColor = getRandomFood().color;
    const food = createFood(foodType, foodX, foodY, foodColor);
    foodItemsOnScreen.push(food);
  }

  foodItemsOnScreen.forEach((food) => {
    food.y += 2;
    ctx.beginPath();
    ctx.arc(food.x + food.width / 2, food.y + food.height / 2, food.width / 2, 0, Math.PI * 2);
    ctx.fillStyle = food.color;
    ctx.fill();

    if (isCollision(player, food)) {
      updateScoreAndTime(1);
      const index = foodItemsOnScreen.indexOf(food);
      if (index !== -1) {
        foodItemsOnScreen.splice(index, 1);
      }
    }

    if (food.y > canvas.height) {
      const index = foodItemsOnScreen.indexOf(food);
      if (index !== -1) {
        foodItemsOnScreen.splice(index, 1);
      }
    }
  });

  time -= 0.03;
  time = Math.max(time, 0); 
  time = Math.min(time, 100);
  if (time <= 0) {
    time = 0;
    showGameOverScreen();
    return;
  }
  if (time>=100){
    time = 100;
    return
  }

  ctx.fillStyle = "green";
  ctx.fillRect(10, canvas.height - 30, (time / 100) * canvas.width, 20);

  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${score}`, 10, 30);

  requestAnimationFrame(gameLoop);
}

adjustCanvasSize();
gameLoop();
