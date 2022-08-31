export * from "./css/common.css";
import { Notify } from "notiflix/build/notiflix-notify-aio";

let data = {};

const form = document.querySelector(".form");
form.addEventListener("submit", onSubmit);
form.addEventListener("input", onFormInput);

function onSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  getPromise(+data.amount, +data.delay, +data.step);
}

function onFormInput(e) {
  data[e.target.name] = e.target.value;
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function getPromise(amount, delay, step) {
  let nextDelay = delay;
  for (let index = 1; index <= amount; index++) {
    createPromise(index, nextDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    nextDelay += step;
  }
}
