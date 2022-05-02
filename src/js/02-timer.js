import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    start: document.querySelector('button[data-start]')
}

// console.log(refs.start);
// refs.start.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      ///додано
      const currentTimestamp = options.defaultDate.getTime();
      const selectedTimestamp = selectedDates[0].getTime();
    //   console.log(currentTimestamp);
    //   console.log(selectedTimestamp);

      if (selectedTimestamp < currentTimestamp) {
          alert("Please choose a date in the future");
          refs.start.setAttribute('disabled', true);
      } else {
          refs.start.removeAttribute('disabled');
      }
      ////
  },
};

flatpickr("#datetime-picker", options);

// const date = new Date();

// console.log(date);
// console.log(typeof(date));
// console.log(date.toString());
// console.log(typeof (date.toString()));

// console.log(date.getTime());