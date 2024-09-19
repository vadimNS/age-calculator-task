function Transfer() {
  const day = document.querySelector('input[placeholder = "DD"]').value;
  const month = document.querySelector('input[placeholder = "MM"]').value;
  const year = document.querySelector('input[placeholder = "YYYY"]').value;

  ClearErrorText();

  let hasError = false;

  if (!day) {
    document.querySelector("#error-message-day").textContent =
      "This field required";
    hasError = true;
  }
  if (!month) {
    document.querySelector("#error-message-month").textContent =
      "This field required";
    hasError = true;
  }
  if (!year) {
    document.querySelector("#error-message-year").textContent =
      "This field required";
    hasError = true;
  }

  if (hasError) {
    return;
  }

  const dayValue = parseInt(day, 10);
  const monthValue = parseInt(month, 10);
  const yearValue = parseInt(year, 10);

  const data = new Date();
  const currentYear = data.getFullYear();
  const currentMonth = data.getMonth() + 1;
  const currentDay = data.getDate();

  if (dayValue < 1 || dayValue > 31) {
    document.querySelector("#error-message-day").textContent =
      "Must be a valid day";
    hasError = true;
  }
  if (monthValue < 1 || monthValue > 12) {
    document.querySelector("#error-message-month").textContent =
      "Must be a valid month";
    hasError = true;
  }
  if (yearValue < 1 || yearValue > currentYear) {
    document.querySelector("#error-message-year").textContent =
      "Must be a valid year";
    hasError = true;
  }
  if (hasError) {
    return;
  }

  let dayResult = currentDay - dayValue;
  let monthResult = currentMonth - monthValue;
  let yearResult = currentYear - yearValue;

  if (monthResult < 0) {
    monthResult += 12;
    yearResult -= 1;
  }

  if (dayResult < 0) {
    const prevMonth = currentMonth === 1 ? 12 : month;
    const daysInPrevMonth = new Date(yearResult, prevMonth, 0).getDate();
    dayResult += daysInPrevMonth;
    monthResult -= 1;
  }

  document.querySelector("#output-years").innerText = yearResult;
  document.querySelector("#output-months").innerText = monthResult;
  document.querySelector("#output-days").innerText = dayResult;
  ClearErrorText();
}
function ClearErrorText() {
  document.querySelector("#error-message-year").textContent = "";
  document.querySelector("#error-message-month").textContent = "";
  document.querySelector("#error-message-day").textContent = "";
}
