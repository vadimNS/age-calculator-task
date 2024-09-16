function Transfer() {
  const day = document.querySelector('input[placeholder = "DD"]').value;
  const month = document.querySelector('input[placeholder = "MM"]').value;
  const year = document.querySelector('input[placeholder = "YYYY"]').value;
  if (day && month && year) {
    const dayValue = parseInt(day, 10);
    const monthValue = parseInt(month, 10);
    const yearValue = parseInt(year, 10);

    const data = new Date();
    const currentYear = data.getFullYear();
    const currentMonth = data.getMonth() + 1;
    const currentDay = data.getDate();

    let dayResult = currentDay - dayValue;
    let monthResult = currentMonth - monthValue;
    let yearResult = currentYear - yearValue;

    if (dayResult < 0) {
      dayResult *= -1;
      monthResult -= 1;
    }
    if (monthResult < 0) {
      monthResult *= -1;
      yearResult -= 1;
    }
    document.querySelector("#output-years").innerText = yearResult;
    document.querySelector("#output-months").innerText = monthResult;
    document.querySelector("#output-days").innerText = dayResult;
  } else {
    document.querySelector("#error-message-year").textContent =
      "This field required";
    document.querySelector("#error-message-month").textContent =
      "This field required";
    document.querySelector("#error-message-day").textContent =
      "This field required";
  }
}
