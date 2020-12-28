import Countdown from "./countdown.js";

const daysContainer = document.querySelector("#days");
const hoursContainer = document.querySelector("#hours");
const minutesContainer = document.querySelector("#minutes");
const secondsContainer = document.querySelector("#seconds");
const nextYearContainer = document.querySelector("#year");
const spinnerLoading = document.querySelector("#loading");
const countdownContainer = document.querySelector("#countdown");

const nextYear = new Date().getFullYear() + 1;
const newYearTime = new Countdown(`January 01 ${nextYear} 00:00:00 GMT-0300`);

nextYearContainer.textContent = nextYear;

function insertCountdownValuesInScreen() {
  daysContainer.textContent =
    newYearTime.total.days < 10
      ? "0" + newYearTime.total.days
      : newYearTime.total.days;

  hoursContainer.textContent =
    newYearTime.total.hours < 10
      ? "0" + newYearTime.total.hours
      : newYearTime.total.hours;

  minutesContainer.textContent =
    newYearTime.total.minutes < 10
      ? "0" + newYearTime.total.minutes
      : newYearTime.total.minutes;

  secondsContainer.textContent =
    newYearTime.total.seconds < 10
      ? "0" + newYearTime.total.seconds
      : newYearTime.total.seconds;
}

const handleCountdownDisplay = () => {
  spinnerLoading.remove();
  countdownContainer.style.display = "flex";
};
setTimeout(handleCountdownDisplay, 1000);

setInterval(insertCountdownValuesInScreen, 1000);
