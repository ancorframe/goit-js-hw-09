export * from "./css/common.css";

let timerId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const body = document.querySelector("body");

startBtn.addEventListener("click", onClickStart);
stopBtn.addEventListener("click", onClickStop);

function onClickStart(e) {
  setAttribute(startBtn);
  removeAtribute(stopBtn);

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onClickStop(e) {
  removeAtribute(startBtn);
  setAttribute(stopBtn);

  clearInterval(timerId);
}

function setAttribute(e) {
  e.setAttribute("disabled", "");
}

function removeAtribute(e) {
  e.removeAttribute("disabled", "");
}
