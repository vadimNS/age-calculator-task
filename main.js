class DateValidator {
  constructor(day, month, year) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.currentDate = new Date();
    this.errors = {
      day: "",
      month: "",
      year: "",
    };
  }

  validateDay() {
    if (!this.day) {
      this.errors.day = "This field required";
      return false;
    }
    const dayValue = parseInt(this.day, 10);
    if (dayValue < 1 || dayValue > 31) {
      this.errors.day = "Must be a valid day";
      return false;
    }
    return true;
  }

  validateMonth() {
    if (!this.month) {
      this.errors.month = "This field required";
      return false;
    }
    const monthValue = parseInt(this.month, 10);
    if (monthValue < 1 || monthValue > 12) {
      this.errors.month = "Must be a valid month";
      return false;
    }
    return true;
  }

  validateYear() {
    if (!this.year) {
      this.errors.year = "This field required";
      return false;
    }
    const yearValue = parseInt(this.year, 10);
    const currentYear = this.currentDate.getFullYear();
    if (yearValue < 1 || yearValue > currentYear) {
      this.errors.year = "Must be a valid year";
      return false;
    }
    return true;
  }

  validate() {
    const isDayValid = this.validateDay();
    const isMonthValid = this.validateMonth();
    const isYearValid = this.validateYear();
    return isDayValid && isMonthValid && isYearValid;
  }

  getErrors() {
    return this.errors;
  }
}

class AgeCalculator extends DateValidator {
  constructor(day, month, year) {
    super(day, month, year);
  }

  calculateAge() {
    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth() + 1;
    const currentDay = this.currentDate.getDate();

    let dayResult = currentDay - parseInt(this.day, 10);
    let monthResult = currentMonth - parseInt(this.month, 10);
    let yearResult = currentYear - parseInt(this.year, 10);

    if (monthResult < 0) {
      monthResult += 12;
      yearResult -= 1;
    }

    if (dayResult < 0) {
      const prevMonth = currentMonth === 1 ? 12 : monthResult;
      const daysInPrevMonth = new Date(yearResult, prevMonth, 0).getDate();
      dayResult += daysInPrevMonth;
      monthResult -= 1;
    }

    return { years: yearResult, months: monthResult, days: dayResult };
  }
}

function transfer() {
  const day = document.querySelector('input[placeholder="DD"]').value;
  const month = document.querySelector('input[placeholder="MM"]').value;
  const year = document.querySelector('input[placeholder="YYYY"]').value;

  clearErrorText();

  const ageCalculator = new AgeCalculator(day, month, year);

  if (!ageCalculator.validate()) {
    const errors = ageCalculator.getErrors();
    if (errors.day)
      document.querySelector("#error-message-day").textContent = errors.day;
    if (errors.month)
      document.querySelector("#error-message-month").textContent = errors.month;
    if (errors.year)
      document.querySelector("#error-message-year").textContent = errors.year;
    return;
  }

  const ageResult = ageCalculator.calculateAge();
  document.querySelector("#output-years").innerText = ageResult.years;
  document.querySelector("#output-months").innerText = ageResult.months;
  document.querySelector("#output-days").innerText = ageResult.days;
}

function clearErrorText() {
  document.querySelector("#error-message-day").textContent = "";
  document.querySelector("#error-message-month").textContent = "";
  document.querySelector("#error-message-year").textContent = "";
}
