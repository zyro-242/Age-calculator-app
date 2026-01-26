// ------- Variable -------
const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const btn = document.getElementById("btn-submit");

const yearsVL = document.getElementById("years");
const monthsVL = document.getElementById("months");
const daysVL = document.getElementById("days");

// ---------- calculate Age ---------
function calculateAge(day, month, year) {
  // -------- Get today --------
  const today = new Date();

  const currentDay = today.getDate();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  // -------- Calculate ----------
  let years = currentYear - year;
  let months = currentMonth - month;
  let days = currentDay - day;

  // ---------- Solve negative day --------
  if (days < 0) {
    months--;
    const daysInLastMonth = new Date(
      currentYear,
      currentMonth - 1,
      0,
    ).getDate();
    days += daysInLastMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // -------- Result ---------
  yearsVL.textContent = years;
  monthsVL.textContent = months;
  daysVL.textContent = days;
}

// -------- Error -------------
function showError(groupId, message) {
  const group = document.getElementById(groupId);
  const errorText = group.querySelector(".error-message");

  group.classList.add("error");
  errorText.textContent = message;
}

// ------------ Show All eror -----------
function showAllError(groupId, message) {
  ["day-group", "month-group", "year-group"].forEach((id) => {
    const group = document.getElementById(id);
    group.classList.add("error");

    if (id === groupId) {
      const errorText = group.querySelector(".error-message");
      errorText.textContent = message;
    }
  });
}
// -------------- Clear Error -----------
function clearErrors() {
  const groups = document.querySelectorAll(".input");

  groups.forEach((group) => {
    group.classList.remove("error");
    group.querySelector(".error-message").textContent = "";
  });
}

btn.addEventListener("click", function () {
  clearErrors();

  //   ------- Empty -----------

  const dayValue = dayInput.value.trim();
  const monthValue = monthInput.value.trim();
  const yearValue = yearInput.value.trim();

  if (dayValue === "") {
    showError("day-group", "This field is required");
  }

  if (monthValue === "") {
    showError("month-group", "This field is required");
  }

  if (yearValue === "") {
    showError("year-group", "This field is required");
    return;
  }

  // -------- Get value ---------
  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  const year = Number(yearInput.value);

  // --------- Invalid Value ---------
  if (day < 1 || day > 31) {
    showError("day-group", "Must be a valid day");
  }

  if (month < 1 || month > 12) {
    showError("month-group", "Must be a valid month");
  }

  const inputDate = new Date(year, month - 1, day);
  const today = new Date();
  if (inputDate > today) {
    showAllError("year-group", "Must be in the past");
    return;
  }

  //   ----------- Invalid Date -----------
  const date = new Date(year, month - 1, day);
  if (
    date.getDate() !== day ||
    date.getMonth() + 1 !== month ||
    date.getFullYear() !== year
  ) {
    showAllError("day-group", "Must be a valid date");
    return;
  }

  calculateAge(day, month, year);
});
