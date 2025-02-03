const remainingTime = document.getElementById("remainingTime");
const add30SecButton = document.getElementById("add30Sec");
const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
let timer = {
  seconds: 0,
  intervalId: undefined,
  timeIsUp: false,
  isRunning: false,
  startButtonText: "Start",
};

add30SecButton.addEventListener("click", () => {
  addToTimer(30);
});

const startPauseButtonClicked = () => {
  if (timer.startButtonText === "Start" || timer.startButtonText === "Resume") {
    if (timer.seconds !== 0) {
      startTimer();
    } else {
      console.log("timer can't start");
    }
  } else if (timer.startButtonText === "Pause") {
    pauseTimer();
  }
};

startPauseButton.addEventListener("click", startPauseButtonClicked);

window.addEventListener("keypress", (event) => {
  if (event.code === "Space") {
    event.preventDefault();

    if (timer.timeIsUp) {
      resetTimer();
    } else {
      startPauseButtonClicked();
    }
  }
});

window.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    event.preventDefault();
  }
});

resetButton.addEventListener("click", () => {
  resetTimer();
});

const addToTimer = (timeToAdd) => {
  timer.seconds += timeToAdd;
  updateDisplay();
};

const startTimer = () => {
  timer.isRunning = true;
  if (timer.seconds > 1) {
    addToTimer(-1);
  }

  timer.intervalId = setInterval(() => {
    addToTimer(-1);

    if (timer.seconds <= 0) {
      completeTimer();
    }
  }, 1000);

  timer.startButtonText = "Pause";
  updateDisplay();
};

const pauseTimer = () => {
  clearInterval(timer.intervalId);
  timer.isRunning = false;
  timer.startButtonText = "Resume";
  updateDisplay();
};

const setTimer = (newTime) => {
  timer.seconds = newTime;
  updateDisplay();
};

const completeTimer = () => {
  clearInterval(timer.intervalId);
  timer.isRunning = false;
  timer.timeIsUp = true;
  updateDisplay();
};

const resetTimer = () => {
  clearInterval(timer.intervalId);
  timer.isRunning = false;
  timer.seconds = 0;
  timer.startButtonText = "Start";
  timer.timeIsUp = false;
  updateDisplay();
};

const updateDisplay = () => {
  startPauseButton.textContent = timer.startButtonText;
  remainingTime.textContent = secondsToTimeString(timer.seconds);

  if (timer.timeIsUp) {
    document.body.style.animation = "flash 2.5s infinite";
    startPauseButton.style.display = "none";
    add30SecButton.style.display = "none";
  } else {
    document.body.style.animation = "";
    startPauseButton.style.display = "";
    add30SecButton.style.display = "";
  }

  if (timer.isRunning) {
    document.body.style.backgroundColor = "#ba8e23";
  } else {
    document.body.style.backgroundColor = "#3c3c3c";
  }
};

const secondsToTimeString = (seconds) => {
  const date = new Date(seconds * 1000);
  let time = date.toISOString().slice(11, 19);
  let suffix = "";
  if (time.slice(0, 2) === "00") {
    time = time.slice(3);
    suffix = "";
    if (time.slice(0, 2) === "00") {
      time = time.slice(3);
      suffix = "s";
    }
  }

  return time + suffix;
};
