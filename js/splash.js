let secondsLeft = 3;

function countdown() {
  secondsLeft = secondsLeft - 1;

  if (secondsLeft >= 0) {
    document.getElementById("countdown-text").innerHTML =
      "Entering site in " + secondsLeft + "...";
  }

  if (secondsLeft <= 0) {
    clearInterval(timer);
  }
}

let timer = setInterval(countdown, 1000);
