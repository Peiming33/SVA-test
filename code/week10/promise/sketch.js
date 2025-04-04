// Global variables to store the circle's state
let circleX, circleY;
let circleSize = 50;
let circleColor;
let statusText = "Click to start animation sequence"; // Feedback for the user

// --- Helper Function: Creates a delay using a Promise ---
// This function is key. It returns a Promise that resolves after 'ms' milliseconds.
// 'await' will pause execution until this Promise resolves.
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Setup Function (runs once) ---
function setup() {
  createCanvas(600, 400);
  circleX = width / 2;
  circleY = height / 2;
  circleColor = color(100, 150, 250); // Initial blue color
  textAlign(CENTER, CENTER);
  textSize(16);
  noStroke();

  // We don't start the animation immediately, wait for a click.
}

// --- Draw Function (runs continuously) ---
function draw() {
  background(240); // Light grey background

  // Draw the circle based on current state variables
  fill(circleColor);
  ellipse(circleX, circleY, circleSize, circleSize);

  // Display status text
  fill(0); // Black text
  text(statusText, width / 2, 30);
}

// --- The Asynchronous Animation Sequence ---
// 'async' keyword allows us to use 'await' inside this function.
async function runAnimationSequence() {
  // Prevent starting multiple sequences if already running
  if (statusText.includes("Running")) return;

  console.log("Starting animation sequence...");
  statusText = "Running: Growing...";

  // 1. Grow the circle
  circleSize = 100;
  await delay(1000); // Wait for 1000ms (1 second)

  console.log("Step 2: Changing color...");
  statusText = "Running: Changing color...";

  // 2. Change color to pink
  circleColor = color(250, 100, 150);
  await delay(1000); // Wait for 1 second

  console.log("Step 3: Moving right...");
  statusText = "Running: Moving right...";

  // 3. Move the circle to the right
  circleX = width * 0.75;
  await delay(1000); // Wait for 1 second

  console.log("Step 4: Shrinking...");
  statusText = "Running: Shrinking...";

  // 4. Shrink the circle
  circleSize = 50;
  await delay(1000); // Wait for 1 second

  console.log("Step 5: Resetting...");
  statusText = "Running: Resetting...";

  // 5. Reset position and color
  circleX = width / 2;
  circleColor = color(100, 150, 250); // Back to blue
  await delay(500); // Shorter wait

  console.log("Animation sequence finished.");
  statusText = "Click to start animation sequence"; // Reset status
}

// --- User Interaction ---
// Trigger the async function when the mouse is pressed.
function mousePressed() {
  runAnimationSequence();
}