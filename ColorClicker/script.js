// Get elements
const mainPage = document.body
const circle = document.getElementById("circle");
const scoreDisplay = document.createElement("p"); // Create score display
const itemInfo = document.getElementById("stats");
const CrazyModeButton = document.getElementById("crazyModeButton");
let items = {
  // Always add a space at the start of the string and capitalise
  " Extra Score" : 10,
  " Score Multiplier" : 100,
}
scoreDisplay.id = "score-display"; // Assign ID for styling
let crazyMode = false;
let purchasedItems = []
let scoreMultiplier = 1;
let extraScore = 1;

let score = 0; // Initialize score

function purchaseItem(item) {
  if (items[item] <= score) {
    score -= items[item]; // Deduct score
    items[item] = Math.round(items[item] * items[item] * 0.8); // Increase price
    purchasedItems.push(item);
    
    // Update the displayed items
    itemInfo.textContent = `Items: ${purchasedItems}`;
    
    // Update the shop UI
    updateShopDisplay();
    
    updateScore(item, false);
  }
}

// Function to update shop display
function updateShopDisplay() {
  document.getElementById("shop").innerHTML = `
    <button onclick="purchaseItem(' Extra Score')">Buy Extra Score - ${items[" Extra Score"]} points</button>
    <button onclick="purchaseItem(' Score Multiplier')">Buy Score Multiplier - ${items[" Score Multiplier"]} points</button>
  `;
}

// Call this function once when the page loads to set the initial prices
updateShopDisplay();


// Function to generate random colors
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to update the score
function updateScore(newEffect, addScore) {
  if (addScore === true) {
    score = Math.round((score + extraScore) * scoreMultiplier);
  } 
  scoreDisplay.textContent = score;
  if (newEffect === " Extra Score") {
    extraScore += 1;
  }
  else if (newEffect === " Score Multiplier") {
    scoreMultiplier += 0.1;
  }
}

// Function to change color and update score
function changeColour() {
  let color = getRandomColor();
  circle.style.backgroundColor = color;
  updateScore(null, true);
  if (crazyMode === true) {
    mainPage.style.backgroundColor = getOppositeColor(color)
  }
}

// Function to find the opposite color
function getOppositeColor(hex) {
  // Remove the '#' from the hex color if present
  hex = hex.replace('#', '');

  // Convert the hex color to RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Get the opposite color by subtracting each RGB value from 255
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;

  // Convert the new RGB values back to a hex color
  let oppositeHex = '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();

  return oppositeHex;
}

function enableCrazyMode() {
  if (crazyMode === true) {
    crazyMode = false
    CrazyModeButton.textContent = "Enable CRAZY MODE"
  }
  else {
    crazyMode = true
    CrazyModeButton.textContent = "Disable CRAZY MODE"
  }
}

function buyItem(item) {

}

// Make the circle focusable
circle.setAttribute("tabindex", "0");

// Listen for key presses (Enter & Spacebar)
circle.addEventListener("keydown", function(event) {
  if (event.key === "Enter" || event.key === " ") {
    changeColour();
  }
});

// Listen for mouse clicks
circle.addEventListener("click", changeColour);

document.addEventListener("keydown", function(event) {
  if (event.key === "z") {
    enableCrazyMode();
  }
})



// Append score display to game container (so it's aligned with the circle)
const gameContainer = document.getElementById("game-container");
gameContainer.prepend(scoreDisplay);
scoreDisplay.textContent = score; // Initial score text