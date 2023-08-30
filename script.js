const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Brick constants
const brickRowCount = 4;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 110;
const brickOffsetLeft = 30;

// Define constants and variables for the new sets of bricks
const brickRowCount2 = 2;
const brickColumnCount2 = 3;
const brickOffsetTop2 = 700;
const brickOffsetLeft2 = 30;

const brickRowCount3 = 4;
const brickColumnCount3 = 2;
const brickOffsetTop3 = 400;
const brickOffsetLeft3 = 30;

const bricks2 = [];
const bricks3 = [];
const joystick = document.getElementById("joystick");
let joystickStartX = null;
let joystickStartY = null;
let joystickAngle = 0;
let joystickDistance = 0;

// Player initial position and velocity
let x = canvas.width / 2 - 15;
let y = canvas.height - 30;
let vx = 0;
let vy = 0;
let lives = 5;
let hasWon = false;
// Brick array
const bricks = [];

// Initialize bricks
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    const brick = {
      x: c * (brickWidth + brickPadding) + brickOffsetLeft,
      y: r * (brickHeight + brickPadding) + brickOffsetTop,
      dx: 1,
      speed: Math.random() * 3 + 2,
    };
    bricks[c].push(brick);
  }
}

// Function to initialize the second set of bricks
function createBricks2() {
  for (let c = 0; c < brickColumnCount2; c++) {
    bricks2[c] = [];
    for (let r = 0; r < brickRowCount2; r++) {
      const brick = {
        x: c * (brickWidth + brickPadding) + brickOffsetLeft2,
        y: r * (brickHeight + brickPadding) + brickOffsetTop2,
        dx: 1,
        speed: Math.random() * 2 + 1,
      };
      bricks2[c].push(brick);
    }
  }
}

// Function to initialize the third set of bricks
function createBricks3() {
  for (let c = 0; c < brickColumnCount3; c++) {
    bricks3[c] = [];
    for (let r = 0; r < brickRowCount3; r++) {
      const brick = {
        x: c * (brickWidth + brickPadding) + brickOffsetLeft3,
        y: r * (brickHeight + brickPadding) + brickOffsetTop3,
        dx: 1,
        speed: Math.random() * 3 + 2,
      };
      bricks3[c].push(brick);
    }
  }
}

// Main update loop
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (!hasWon && y <= 0) {
    hasWon = true;
    alert("Congratulations! You've won!");

    lives = 5; // Reset lives
    x = canvas.width / 2 - 15; // Reset player position
    y = canvas.height - 30;
    vx = 0;
    vy = 0;
    hasWon = false;
    createBricks2(); // Reset second set of bricks
    createBricks3(); // Reset third set of bricks
  }
  // Update and draw bricks for the original set
  for (const bricksArray of bricks) {
    for (const brick of bricksArray) {
      brick.x += brick.dx * brick.speed;
      if (brick.x < 0 || brick.x + brickWidth > canvas.width) {
        brick.dx = -brick.dx; // Reverse direction at canvas edges
      }

      // Draw brick
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      ctx.closePath();
    }
  }

  // Update and draw bricks for the second set
  for (const bricksArray of bricks2) {
    for (const brick of bricksArray) {
      brick.x += brick.dx * brick.speed;
      if (brick.x < 0 || brick.x + brickWidth > canvas.width) {
        brick.dx = -brick.dx; // Reverse direction at canvas edges
      }

      // Draw brick
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
      ctx.fillStyle = "#ff0000"; // You can change the color for the second set of bricks
      ctx.fill();
      ctx.closePath();
    }
  }

  // Update and draw bricks for the third set
  for (const bricksArray of bricks3) {
    for (const brick of bricksArray) {
      brick.x += brick.dx * brick.speed;
      if (brick.x < 0 || brick.x + brickWidth > canvas.width) {
        brick.dx = -brick.dx; // Reverse direction at canvas edges
      }

      // Draw brick
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
      ctx.fillStyle = "#00ff00"; // You can change the color for the third set of bricks
      ctx.fill();
      ctx.closePath();
    }
  }

  // Update player position
  x += vx;
  y += vy;

  for (const bricksArray of [...bricks, ...bricks2, ...bricks3]) {
    for (const brick of bricksArray) {
      if (
        x + 30 > brick.x &&
        x < brick.x + brickWidth &&
        y + 30 > brick.y &&
        y < brick.y + brickHeight
      ) {
        // Collision detected
        if (lives > 0) {
          lives--; // Decrease lives
          x = canvas.width / 2 - 15; // Reset player position
          y = canvas.height - 30;
        }
        if (lives === 0) {
          alert("GAME OVER");
          lives = 5; // Reset lives
          x = canvas.width / 2 - 15; // Reset player position
          y = canvas.height - 30;
          vx = 0;
          vy = 0;
          createBricks2(); // Reset second set of bricks
          createBricks3(); // Reset third set of bricks
        }
      }
    }
  }

  ctx.font = "20px Arial";
  ctx.fillStyle = "#ffffff";
  ctx.fillText("Lives: " + lives, 20, 30);

  // Draw player
  ctx.beginPath();
  ctx.rect(x, y, 30, 30);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.closePath();

  // Request next animation frame
  requestAnimationFrame(update);
}
function updatePlayerVelocityFromJoystick() {
  const maxSpeed = 5;
  vx = (Math.cos(joystickAngle) * joystickDistance * maxSpeed) / 30;
  vy = (Math.sin(joystickAngle) * joystickDistance * maxSpeed) / 30;
}

// Keyboard event listeners
addEventListener("keydown", function (e) {
  if (e.code == "KeyD" && x + 30 + vx <= canvas.width) {
    vx = 5;
  }
  if (e.code == "KeyA" && x + vx >= 0) {
    vx = -5;
  }
  if (e.code == "KeyW" && y + vy >= 0) {
    vy = -5;
  }
  if (e.code == "KeyS" && y + 30 + vy <= canvas.height) {
    vy = 5;
  }

  // Reset player position if out of bounds
  if (x < 0 || x + 30 > canvas.width || y + 30 > canvas.height) {
    x = canvas.width / 2 - 15;
    y = canvas.height - 30;
    vx = 0;
    vy = 0;
  }
});
addEventListener("keyup", function (e) {
  if ((e.code == "KeyD" || e.code == "KeyA") && vx !== 0) {
    vx = 0;
  }
  if ((e.code == "KeyW" || e.code == "KeyS") && vy !== 0) {
    vy = 0;
  }

  // Reset player position if out of bounds
  if (x < 0 || x + 30 > canvas.width || y + 30 > canvas.height) {
    x = canvas.width / 2 - 15;
    y = canvas.height - 30;
    vx = 0;
    vy = 0;
  }
});

let touchStartX = null;
let touchStartY = null;
// Touch event listeners
canvas.addEventListener("touchstart", function (e) {
  e.preventDefault();
  const touch = e.touches[0];
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
});

canvas.addEventListener("touchmove", function (e) {
  e.preventDefault();
  if (touchStartX !== null && touchStartY !== null) {
    const touch = e.touches[0];
    const dx = touch.clientX - touchStartX;
    const dy = touch.clientY - touchStartY;

    // Check for collisions with the left and right boundaries
    if (dx > 0 && x + 30 + vx <= canvas.width) {
      vx = 5;
    } else if (dx < 0 && x + vx >= 0) {
      vx = -5;
    } else {
      x = canvas.width / 2 - 15; // Reset player position
      y = canvas.height - 30;
      vx = 0;
      vy = 0;
    }

    // Check for collisions with the top and bottom boundaries
    if (dy > 0 && y + 30 + vy <= canvas.height) {
      vy = 5;
    } else if (dy < 0 && y + vy >= 0) {
      vy = -5;
    } else {
      x = canvas.width / 2 - 15;
      y = canvas.height - 30;
      vx = 0;
      vy = 0;
    }
  }
});

canvas.addEventListener("touchend", function () {
  // Stop player's movement
  vx = 0;
  vy = 0;
  joystick.addEventListener("touchstart", function (e) {
    e.preventDefault();
    const touch = e.touches[0];
    joystickStartX = touch.clientX;
    joystickStartY = touch.clientY;
    joystick.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
  });

  joystick.addEventListener("touchmove", function (e) {
    e.preventDefault();
    if (joystickStartX !== null && joystickStartY !== null) {
      const touch = e.touches[0];
      const dx = touch.clientX - joystickStartX;
      const dy = touch.clientY - joystickStartY;
      joystickAngle = Math.atan2(dy, dx);
      joystickDistance = Math.min(Math.hypot(dx, dy), 30); // Limit distance
      updatePlayerVelocityFromJoystick();

      // Check for collisions with the canvas boundaries
      if (
        x + vx < 0 ||
        x + 30 + vx > canvas.width ||
        y + 30 + vy > canvas.height
      ) {
        x = canvas.width / 2 - 15;
        y = canvas.height - 30;
        vx = 0;
        vy = 0;
      }
    }
  });

  joystick.addEventListener("touchend", function () {
    joystick.style.backgroundColor = "rgba(255, 255, 255, 0.7)";
    joystickAngle = 0;
    joystickDistance = 0;
    vx = 0;
    vy = 0;
  });

  // Reset touch coordinates
  touchStartX = null;
  touchStartY = null;
});

// Start the update loop
createBricks2();
createBricks3();
update();
