export * from "./css/common.css";
export * from "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import { Notify } from "notiflix/build/notiflix-notify-aio";

let timerId = null;
let selectedDate;
let convertedData;
const startBtn = document.querySelector("[data-start]");
const timer = document.querySelector(".timer");
startBtn.addEventListener("click", onClickStart);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      return Notify.failure("Please choose a date in the future");
    }
    removeAtribute(startBtn);
    selectedDate = selectedDates[0];
  },
};

new flatpickr("#datetime-picker", options);

function removeAtribute(e) {
  e.removeAttribute("disabled", "");
}

function onClickStart(e) {
  timerId = setInterval(() => {
    const tick = selectedDate - new Date().getTime();

    if (tick < 0) {
      Notify.success("All items in full price!");
      return clearInterval(timerId);
    }
    convertedData = convertMs(tick);
    updateUi();
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateUi() {
  const keys = Object.keys(convertedData);
  for (const key of keys) {
    const markup = timer.querySelector(`[data-${key}]`);
    markup.textContent = convertedData[key];
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}
