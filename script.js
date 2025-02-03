const remainingTime = document.getElementById("remainingTime");
const add30Sec = document.getElementById("add30Sec");
const startPause = document.getElementById("startPause");
let timer = {
  seconds: 0,
  intervalId: undefined,
};

add30Sec.addEventListener("click", () => {
  addToTimer(2);
});

startPause.addEventListener("click", () => {
  if (
    startPause.textContent === "Start" ||
    startPause.textContent === "Resume"
  ) {
    startTimer();
  } else if (startPause.textContent === "Pause") {
    pauseTimer();
  }
});

const addToTimer = (timeToAdd) => {
  timer.seconds += timeToAdd;
  remainingTime.textContent = timer.seconds;
};

const startTimer = () => {
  addToTimer(-1);
  timer.intervalId = setInterval(() => {
    addToTimer(-1);

    console.log(timer.seconds);
    if (timer.seconds === 0) {
      console.log("Timer complete");
    }
  }, 1000);

  startPause.textContent = "Pause";
};

const pauseTimer = () => {
  clearInterval(timer.intervalId);
  startPause.textContent = "Resume";
};
