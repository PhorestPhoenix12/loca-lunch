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
  speed: 10,
  color: "blue"
};

const foodItems = [
  { type: "apple", color: "red", timeGain: 5 },
  { type: "banana", color: "yellow", timeGain: 10 },
  { type: "cake", color: "brown", timeGain: 15 },
  { type: "pizza", color: "orange", timeGain: 8 },
  { type: "burger", color: "green", timeGain: 7 },
  { type: "ice cream", color: "blue", timeGain: 12 }
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
  return Math.random() * (canvas.height - 30);
}

function resetGame() {
  score = 0;
  time = 100;
  isGameOver = false;
  player.x = canvas.width / 2;
  player.y = canvas.height - 50;
  foodItemsOnScreen.length = 0;
}

function isCollision(rect1, rect2) {
  const circle = {
    x: rect2.x + rect2.width / 2,
    y: rect2.y + rect2.height / 2,
    radius: rect2.width / 2
  };

  const distX = Math.abs(circle.x - rect1.x - rect1.width / 2);
  const distY = Math.abs(circle.y - rect1.y - rect1.height / 2);

  if (distX > rect1.width / 2 + circle.radius) return false;
  if (distY > rect1.height / 2 + circle.radius) return false;

  if (distX <= rect1.width / 2) return true;
  if (distY <= rect1.height / 2) return true;

  const dx = distX - rect1.width / 2;
  const dy = distY - rect1.height / 2;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
}

let score = 0;
let time = 100;
let isGameOver = false;
const foodItemsOnScreen = [];

function updateScoreAndTime(points, timeGain) {
  score += points;
  time += timeGain;
  time = Math.min(time, 100); // Ensure time doesn't go above 100
}

function gameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "40px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Game Over: final score " + score, canvas.width / 2 - 200, canvas.height / 2);
}

function checkCollisions() {
  foodItemsOnScreen.forEach((food, index) => {
    if (isCollision(player, food)) {
      updateScoreAndTime(1, food.timeGain);
      foodItemsOnScreen.splice(index, 1);
    }

    // Keep the food items on the screen
    if (food.y > canvas.height) {
      foodItemsOnScreen.splice(index, 1);

      // Spawn new food to replace the removed one
      const randomFood = getRandomFood();
      const foodType = randomFood.type;
      const foodX = randomXPosition();
      const foodY = randomYPosition();
      const foodColor = randomFood.color;
      const newFood = createFood(foodType, foodX, foodY, foodColor);
      foodItemsOnScreen.push(newFood);
    }
  });
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

  if (!isGameOver) {
    if (Math.random() < 0.05) {
      const randomFood = getRandomFood();
      const foodType = randomFood.type;
      const foodX = randomXPosition();
      const foodY = randomYPosition();
      const foodColor = randomFood.color;
      const food = createFood(foodType, foodX, foodY, foodColor);
      foodItemsOnScreen.push(food);
    }

    checkCollisions();

    time -= 0.1;
    time = Math.max(time, 0);

    ctx.fillStyle = "green";
    ctx.fillRect(10, canvas.height - 30, (time / 100) * (canvas.width - 20), 20);

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, 10, 30);

    if (time <= 0) {
      isGameOver = true;
      gameOver();
    }
  } else {
    // Display the game over message even when the game is over
    gameOver();
  }

  // Continue the game loop as long as the game is not over
  if (!isGameOver) {
    requestAnimationFrame(gameLoop);
  }
}





window.addEventListener("load", () => {
  adjustCanvasSize();
  gameLoop();
});
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  resetGame();
  gameLoop();
});
window.addEventListener("resize", adjustCanvasSize);
adjustCanvasSize();
gameLoop();
