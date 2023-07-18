const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// Constants for game elements
const PLAYER_RADIUS = 20;
const FOOD_RADIUS = 15;
const PLAYER_SPEED = 10;
const FOOD_FALL_SPEED = 3;

// Game state variables
let score = 0;
let time = 100;
let isGameOver = false;

// Player object
const player = {
  x: canvas.width / 2,
  y: canvas.height - PLAYER_RADIUS - 10,
  radius: PLAYER_RADIUS,
  color: "#1E88E5"
};

// Food items
const foodItems = [
  { type: "apple", color: "#E53935", timeGain: 5 },
  { type: "banana", color: "#FFD54F", timeGain: 10 },
  { type: "cake", color: "#795548", timeGain: 15 },
  { type: "pizza", color: "#FF9800", timeGain: 8 },
  { type: "burger", color: "#4CAF50", timeGain: 7 },
  { type: "ice cream", color: "#1976D2", timeGain: 12 }
];

const foodItemsOnScreen = [];

// Utility functions
function getRandomFood() {
  return foodItems[Math.floor(Math.random() * foodItems.length)];
}

function randomXPosition() {
  return Math.random() * (canvas.width - FOOD_RADIUS * 2);
}

function createFood() {
  const food = getRandomFood();
  return {
    x: randomXPosition(),
    y: -FOOD_RADIUS * 2,
    radius: FOOD_RADIUS,
    type: food.type,
    color: food.color,
    timeGain: food.timeGain
  };
}

function isCollision(circle1, circle2) {
  const dx = circle1.x - circle2.x;
  const dy = circle1.y - circle2.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  return distance < circle1.radius + circle2.radius;
}

function updateScoreAndTime(points, timeGain) {
  score += points;
  time += timeGain;
  time = Math.min(time, 100); // Ensure time doesn't go above 100
  scoreDisplay.textContent = `Score: ${score}`;
}

function gameOver() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#FFFFFF";
  ctx.font = "40px Arial";
  ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2);
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2 - 130, canvas.height / 2 + 50);
}

// Draw a gradient background
function drawBackground() {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, "#90CAF9");
  gradient.addColorStop(1, "#64B5F6");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Game loop
function gameLoop() {
  if (!isGameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background
    drawBackground();

    // Draw player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();

    // Draw food items
    foodItemsOnScreen.forEach((food) => {
      ctx.beginPath();
      ctx.arc(food.x, food.y, food.radius, 0, Math.PI * 2);
      ctx.fillStyle = food.color;
      ctx.fill();
    });

    // Generate new food item
    if (Math.random() < 0.05) {
      foodItemsOnScreen.push(createFood());
    }

    // Move food items and check for collisions
    for (let i = foodItemsOnScreen.length - 1; i >= 0; i--) {
      const food = foodItemsOnScreen[i];
      food.y += FOOD_FALL_SPEED;

      if (isCollision(player, food)) {
        updateScoreAndTime(1, food.timeGain);
        foodItemsOnScreen.splice(i, 1);
      } else if (food.y > canvas.height) {
        foodItemsOnScreen.splice(i, 1);
      }
    }

    // Draw timer bar
    const timerBarWidth = (time / 100) * canvas.width;
    ctx.fillStyle = "#00C853";
    ctx.fillRect(0, canvas.height - 20, timerBarWidth, 20);

    // Check game over
    if (time <= 0) {
      isGameOver = true;
      gameOver();
    } else {
      requestAnimationFrame(gameLoop);
    }
  }
}

// Handle player movement
function movePlayer(event) {
  if (event.key === "ArrowLeft") {
    player.x = Math.max(player.x - PLAYER_SPEED, player.radius);
  } else if (event.key === "ArrowRight") {
    player.x = Math.min(player.x + PLAYER_SPEED, canvas.width - player.radius);
  }
}

document.addEventListener("keydown", movePlayer);

// Start the game
const scoreDisplay = document.getElementById("score-display");
gameLoop();
