// Global variables for circle state
let circleX, circleY;
let circleSize = 50;
let circleColor;
let message = "Click to start animation"; // User feedback

function setup() {
  createCanvas(600, 300);
  circleX = width / 2;
  circleY = height / 2;
  circleColor = color(100, 150, 250); // Initial blue
  textAlign(CENTER, CENTER);
  textSize(16);
  noStroke();

  // Instructions
  message = "Click to start Callback Hell version";
  // Or: message = "Click to start Promise version";
}

function draw() {
  background(240); // Light grey

  // Draw the circle based on current state
  fill(circleColor);
  ellipse(circleX, circleY, circleSize, circleSize);

  // Display status message
  fill(0);
  text(message, width / 2, 30);
}

// Reset function to put the circle back to start
function resetCircle() {
    circleX = width / 2;
    circleY = height / 2;
    circleSize = 50;
    circleColor = color(100, 150, 250);
    console.log("Circle reset.");
}

// We'll call one of the start functions below on mouse press
function mousePressed() {
  // --- CHOOSE ONE TO RUN ---
  startCallbackSequence();
  // startPromiseSequence();
}

// ======= CALLBACK HELL VERSION =======

function startCallbackSequence() {
  if (message.includes("Running")) return; // Prevent multiple runs
  resetCircle(); // Start from known state
  console.log("Starting Callback Sequence...");
  message = "Running Callback: Growing...";

  // Step 1: Grow
  circleSize = 100;
  console.log("Step 1: Growing");

  setTimeout(() => {
    // This function runs after 1000ms
    message = "Running Callback: Changing Color...";
    console.log("Step 2: Changing Color");

    // Step 2: Change color
    circleColor = color(250, 100, 150); // Pink

    setTimeout(() => {
      // This function runs 1000ms after Step 2 started
      message = "Running Callback: Moving...";
      console.log("Step 3: Moving");

      // Step 3: Move right
      circleX = width * 0.75;

      setTimeout(() => {
        // This function runs 1000ms after Step 3 started
        message = "Running Callback: Finishing...";
        console.log("Step 4: Finishing up");

        // Step 4: Maybe a final small change or just log
        // (Imagine adding error handling here... difficult!)

        setTimeout(() => {
           // Final reset step
           console.log("Callback Sequence Finished.");
           message = "Callback finished. Click to restart.";
           resetCircle();
        }, 500); // Final short delay before reset

       // What if you needed to add a Step 3.5? You have to find
       // the right place deep inside the nesting! Error handling
       // also becomes complex, needing checks at each level.

      }, 1000); // Delay for Step 4
    }, 1000); // Delay for Step 3
  }, 1000); // Delay for Step 2
}

// In mousePressed(), make sure you call: startCallbackSequence();