import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let countdownInterval = null;

// Flatpickr ayarları
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
    console.log(selectedDates[0]); // Seçilen tarihi kontrol et
    
    if (selectedDate <= new Date()) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedDate;
      startButton.disabled = false;
    }
  },
};

// Flatpickr başlat
flatpickr(datePicker, options);

// Sayacı başlat
function startTimer() {
  startButton.disabled = true;
  datePicker.disabled = true;

  {
    "enableTime"= true,
    "plugins" = [new confirmDatePlugin({})]
}

{
  confirmIcon = "<i class='fa fa-check'></i>", // your icon's html, if you wish to override
  confirmText = "OK ",
  showAlways =false,
  theme = "light" // or "dark"
}

  
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeLeft = userSelectedDate - now;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      updateTimerUI(0, 0, 0, 0);
      iziToast.success({
        title: 'Done',
        message: 'Countdown finished!',
        position: 'topRight',
      });
      datePicker.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerUI(days, hours, minutes, seconds);
  }, 1000);
}

// MS to Time Converter
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second),
  };
}

// Timer UI Güncelleme
function updateTimerUI(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Tek basamaklı sayıları sıfır ile tamamla
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Start Butonuna Tıklanınca
startButton.addEventListener('click', startTimer);
