const inputs = document.querySelectorAll("input");
let dateError = document.getElementById("date-error-msg");

const btn = document.getElementById("btn");

const dayOutput = document.getElementById("day-output");
const monthOutput = document.getElementById("month-output");
const yearOutput = document.getElementById("year-output");

btn.addEventListener("click", () => {
  let isValidInput = true;

  inputs.forEach(input => {
    const parentDiv = input.closest(".sub-section");
    const enteredData = Number(input.value);
    const minValue = Number(input.min);
    const maxValue = Number(input.max);

    if (enteredData == '') {
      isValidInput = false;
      parentDiv.classList.add("input-error");
      input.classList.add("border-red");
      parentDiv.querySelector('.error-msg').innerHTML = "This field is required."
    } 
    
    if (enteredData >= minValue && enteredData <= maxValue) {
      parentDiv.classList.remove("input-error");
      input.classList.remove("border-red");
    } else {
      isValidInput = false;
      parentDiv.classList.add("input-error");
      input.classList.add("border-red");

      // Display error message for invalid input
      const closestP = parentDiv.querySelector('.error-msg');
      closestP.style.display = "block";
    }

    if (isValidInput) {
      const dayInput = +inputs[0].value;
      const monthInput = +inputs[1].value - 1;
      const yearInput = +inputs[2].value;
  
      const todayDate = dayjs();
      const userDob = dayjs(`${yearInput}-${monthInput+1}-${dayInput}`);
  
      if (isValidDate(userDob.toDate(), dayInput, monthInput, yearInput) && userDob <= todayDate) {
        const age = getAge(userDob, todayDate);

        const delay = 400
  
        animateNum(dayOutput, age.days, delay/age.days);
        animateNum(monthOutput, age.months, delay/age.months);
        animateNum(yearOutput, age.years, delay/age.years);

        dateError.style.display = "none";
      } else {
        dateError.innerHTML = "Must be a valid date";
        dateError.style.display = "block";
        parentDiv.classList.add("input-error");
        input.classList.add("border-red");
      }
    }
  });
});

function getAge(dob, dateToday) {
  const years = dateToday.diff(dob, 'year'); // returns total number of years.
  const months = dateToday.diff(dob, 'month') - years*12; // returns total number of months left after deducting years.
  const days = dateToday.diff(dob.add(years, 'year').add(months, 'month'), 'day'); // returns total number of days left after deducting years and months.
  return {years, months, days}
}

function isValidDate(date, dayInput, monthInput, yearInput) {
  if (!(date instanceof Date) || isNaN(date)) {
    return false;
  }
  // Check if the entered day matches the day of the created date object
  if (date.getDate() !== dayInput) {
    return false;
  }
  // Check if the entered month matches the month of the created date object
  if (date.getMonth() !== monthInput) {
    return false;
  }
  // Check if the entered year matches the year of the created date object
  if (date.getFullYear() !== yearInput) {
    return false;
  }
  return true;
}

function animateNum(domElement, value, delay) {
	for (let i = 0; i <= value; i++) {
		let timerID = setTimeout(() => {
			domElement.textContent = i
		}, delay * i)
	}
}