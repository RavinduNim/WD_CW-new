let secondsLeft =3 ;                                                        
const countdownElement = document.getElementById("countdown-text");

const countdownInterval = setInterval(() => {
  secondsLeft--;
  if (secondsLeft >= 0) {
    countdownElement.textContent = `Entering site in ${secondsLeft}...`;
  }

  if (secondsLeft <= 0) {
    clearInterval(countdownInterval);
  }
}, 1000);
