import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    start: document.querySelector('button[data-start]')
}

///різниця між часами
let timestampDiff = 0;

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
      const selectedTimestamp = selectedDates[0].getTime();
      timestampDiff = selectedTimestamp - currentTimestamp;


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
console.log('onStartClick: ',timestampDiff);
console.log(convertMs(timestampDiff));
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