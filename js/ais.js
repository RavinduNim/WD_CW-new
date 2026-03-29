// store total points
let total = 0;

// Initialize background on page load
document.addEventListener("DOMContentLoaded", () => {
  updateBackground();
});

// function runs when user clicks a card
function selectCard(card, points) {
  // CHECK: if card already selected
  if (card.classList.contains("selected")) {
    // remove selection
    card.classList.remove("selected");
    total = total - points;
  } else {
    // add selection
    card.classList.add("selected");

    // add points
    total = total + points;
  }

  const levelBackgrounds = {
    Low: "url('/images/ais/barren-land.jpg')",
    Medium: "url('/images/ais/growing-forest.jpg')",
    High: "url('/images/ais/thriving-ecosystem.jpeg')",
  };

  // update total points on screen
  document.getElementById("total").innerText = total;

  // default level
  let level = "Low";

  // check level based on points
  if (total >= 8) {
    level = "High";
  } else if (total >= 4) {
    level = "Medium";
  }

  // update level text
  document.getElementById("level").innerText = level;

  // update background
  updateBackground(levelBackgrounds[level]);
}

// Function to update background
function updateBackground(backgroundUrl) {
  // Apply background image with white transparent overlay
  document.body.style.backgroundImage =
    "linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), " +
    (backgroundUrl || "url('/images/ais/barren-land.jpg')");
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
}
