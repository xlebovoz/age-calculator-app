const day_in = document.getElementById('days_v');
const month_in = document.getElementById('months_v');
const year_in = document.getElementById('years_v');

const day_name = document.getElementById('days');
const month_name = document.getElementById('months');
const year_name = document.getElementById('years');

const day_er = document.getElementById('er_days');
const month_er = document.getElementById('er_months');
const year_er = document.getElementById('er_years');

const arrow = document.getElementById('arrow');

function count() {
  // Очистка ошибок и скрытие
  day_er.textContent = '';
  day_er.style.display = 'none';
  month_er.textContent = '';
  month_er.style.display = 'none';
  year_er.textContent = '';
  year_er.style.display = 'none';

  const day = parseInt(day_in.value.trim(), 10);
  const month = parseInt(month_in.value.trim(), 10);
  const year = parseInt(year_in.value.trim(), 10);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();

  let hasError = false;

  // Валидация дня
  if (isNaN(day) || day < 1 || day > 31) {
    day_er.textContent = 'This field is required';
    day_er.style.display = 'block';
    hasError = true;
  }

  // Валидация месяца
  if (isNaN(month) || month < 1 || month > 12) {
    month_er.textContent = 'This field is required';
    month_er.style.display = 'block';
    hasError = true;
  }

  // Валидация года
  if (isNaN(year) || year < 1900 || year > currentYear) {
    year_er.textContent = 'This field is required';
    year_er.style.display = 'block';
    hasError = true;
  }

  if (hasError) return;




  
  // Проверка существования даты
  const birthDate = new Date(year, month - 1, day);
  if (
    birthDate.getFullYear() !== year ||
    birthDate.getMonth() + 1 !== month ||
    birthDate.getDate() !== day
  ) {
    day_er.textContent = 'Некорректная дата';
    day_er.style.display = 'block';
    return;
  }

  // Проверка, что дата не в будущем
  if (birthDate > currentDate) {
    year_er.textContent = 'Дата не может быть в будущем';
    year_er.style.display = 'block';
    return;
  }

  // Расчёт разницы
  let years = currentYear - year;
  let months = currentMonth - month;
  let days = currentDay - day;

  if (days < 0) {
    // берём количество дней в предыдущем месяце
    const prevMonth = new Date(currentYear, currentMonth - 1, 0);
    days += prevMonth.getDate();
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // Вывод результата
    year_name.innerHTML = `<span class="purple">${years}</span> years`;
    month_name.innerHTML = `<span class="purple">${months}</span> months`;
    day_name.innerHTML = `<span class="purple">${days}</span> days`;
}

arrow.addEventListener('click', count)