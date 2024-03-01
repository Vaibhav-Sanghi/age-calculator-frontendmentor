const inputs = document.querySelectorAll('input');
const y = document.querySelector('#year');
const m = document.querySelector('#month');
const d = document.querySelector('#day');

document.querySelector('.app button').addEventListener('click', () => {
  let isValid = validateDate(y.value, m.value, d.value);
  let calculable = true;

  inputs.forEach((x) => {
    x.parentElement.classList.remove('error');
    x.parentElement.querySelector('p').style.display = 'none';
    document.querySelector('.valid-error').style.display = 'none';

    if (x.value == '') {
      calculable = false;
      x.parentElement.classList.add('error');
      x.parentElement.querySelector('p').style.display = 'block';
      return;
    }

    if (!isValid) {
      calculable = false;
      x.parentElement.classList.add('error');
      document.querySelector('.valid-error').style.display = 'block';
      return;
    }
  });

  if (calculable) {
    let now = Date.now();
    let bday = new Date(y.value, +m.value - 1, d.value);
    let diff = Math.abs(now - bday.getTime());
    let dmy = convertMillisecondsToAge(diff);

    let outputs = [...document.querySelectorAll('.val')];
    outputs[0].textContent = dmy.years;
    outputs[1].textContent = dmy.months;
    outputs[2].textContent = dmy.days;
  }
});

function validateDate(yrs, mth, day) {
  let monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (yrs > new Date(Date.now()).getFullYear()) return false;
  if (mth > 12 || mth < 1) return false;
  if (day < 1 || day > monthDays[+mth - 1]) return false;

  return true;
}

function convertMillisecondsToAge(milliseconds) {
  // Get milliseconds in a year
  const millisecondsInYear = 365.25 * 24 * 60 * 60 * 1000;

  // Get milliseconds in a month (average)
  const millisecondsInMonth = millisecondsInYear / 12;

  // Calculate years
  const years = Math.floor(milliseconds / millisecondsInYear);
  milliseconds %= millisecondsInYear;

  // Calculate months (consider leap years)
  let months = Math.floor(milliseconds / millisecondsInMonth);
  if (years % 4 === 0 && months > 1) {
    // February in a leap year has 29 days
    milliseconds -= months * millisecondsInMonth + 2 * millisecondsInMonth;
    months -= 2;
  } else {
    milliseconds %= millisecondsInMonth;
  }

  // Calculate days
  const days = Math.floor(milliseconds / (24 * 60 * 60 * 1000));

  return { years, months, days };
}
