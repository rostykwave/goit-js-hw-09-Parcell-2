import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    start: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

// console.dir(refs.seconds.textContent);

///різниця між часами
let selectedTimestamp = 0;

///об'єкт опцій для передачі в flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log('onClose: ',selectedDates[0]);
      ///додано
      const currentTimestamp = options.defaultDate.getTime();
      selectedTimestamp = selectedDates[0].getTime();


      if (selectedTimestamp < currentTimestamp) {
          alert("Please choose a date in the future");
          refs.start.setAttribute('disabled', true);
      } else {
          refs.start.removeAttribute('disabled');        
      }
      ////
  },
};





///Основний функціонал - код виконання
flatpickr("#datetime-picker", options);

refs.start.addEventListener('click', onStartClick)






////Функції

function onStartClick(){
    const timerId = setInterval(setInterface,1000)
}

////Форматування значення
function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}

////Виведення в інтерфейс
function setInterface() {

    const curentTime = new Date();
    ////в мілісекундах
    const timeLeftInMs = selectedTimestamp - curentTime.getTime();
    /////в об'єкті з розподілом на дні, години тощо
    const timeLeft = convertMs(timeLeftInMs);
    
   
    if (timeLeftInMs >= 0) {
        refs.days.textContent = addLeadingZero(timeLeft.days);
        refs.hours.textContent = addLeadingZero(timeLeft.hours);
        refs.minutes.textContent = addLeadingZero(timeLeft.minutes);
        refs.seconds.textContent = addLeadingZero(timeLeft.seconds);
    }
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}