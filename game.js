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
  time = Math.min(time + timeGain, 100);
  time = Math.max(time, 0); // Ensure time doesn't go below 0
}

function gameOver() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = "40px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("Game Over: final score " + score, canvas.width / 2 - 200, canvas.height / 2);
}

function checkCollisions() {
  foodItemsOnScreen.forEach((food) => {
    if (
      player.x < food.x + food.width &&
      player.x + player.width > food.x &&
      player.y < food.y + food.height &&
      player.y + player.height > food.y
    ) {
      updateScoreAndTime(1, food.timeGain);
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
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#b2ebf2");
  gradient.addColorStop(1, "#80deea");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (!isGameOver) {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);

  if (Math.random() < 0.01) {
    const randomFood = getRandomFood(); // Get a random food object first
    const foodType = randomFood.type;
    const foodX = randomXPosition();
    const foodY = randomYPosition();
    const foodColor = randomFood.color; // Use the color from the random food object
    const food = createFood(foodType, foodX, foodY, foodColor);
    foodItemsOnScreen.push(food);
  }

    // Check for collisions before updating the timer
    checkCollisions();

    time -= 0.1;
    time = Math.max(time, 0);
    time = Math.min(time, 100);

    ctx.fillStyle = "green";
    ctx.fillRect(10, canvas.height - 30, (time / 100) * (canvas.width - 20), 20);

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${score}`, 10, 30);

    // Check for game over condition after updating and drawing game elements
    if (time <= 0) {
      isGameOver = true;
      gameOver();
    } else {
      requestAnimationFrame(gameLoop);
    }
  }
}

// Event listener for the reset button
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", () => {
  isGameOver = false;
  resetGame();
  gameLoop();
});

adjustCanvasSize();
gameLoop();
