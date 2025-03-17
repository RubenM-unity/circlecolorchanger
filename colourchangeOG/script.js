// Get the circle element
const circle = document.getElementById("circle");

// Function to generate random colors
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Function to change color
function changeColour() {
  circle.style.backgroundColor = getRandomColor();
}

// Make sure the div can be focused
circle.setAttribute("tabindex", "0");

// Listen for key presses (Enter & Spacebar)
circle.addEventListener("keydown", function(event) {
  if (event.key === "Enter" || event.key === " ") {
    changeColour();
  }
});

// Listen for mouse clicks
circle.addEventListener("click", changeColour);
