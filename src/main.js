import './style.css'
import dayjs from 'dayjs'

const form = document.getElementById('birthday-form');
const birthDateInput = document.getElementById('birth-date');
const dialog = document.getElementById('birthday-dialog');
const dialogContent = document.getElementById('birthday-dialog-content');
const closeDialogBtn = document.getElementById('close-birthday-dialog');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const inputDateStr = birthDateInput.value;
  if (!inputDateStr) return;

  const today = dayjs();
  const birthDate = dayjs(inputDateStr);

  const daysSinceBirth = today.diff(birthDate, 'days');
  const isBirthdayToday = today.month() === birthDate.month() && today.date() === birthDate.date();

  let nextBirthday = birthDate.year(today.year());
  
  if (nextBirthday.isBefore(today, 'day')) {
    nextBirthday = nextBirthday.add(1, 'year');
  }

  const daysToNextBirthday = nextBirthday.diff(today, 'days');
  const weeksToNextBirthday = Math.ceil(daysToNextBirthday / 7);

  let htmlContent = `<p>Od Twoich narodzin minęło już: <span class="text-xl block font-black text-slate-900">${daysSinceBirth} dni</span></p>`;

  if (isBirthdayToday) {
    alert("Wszystkiego najlepszego z okazji urodzin! 🎂🎉");
  } else {
    if (daysToNextBirthday > 0 && daysToNextBirthday <= 7) {
      htmlContent += `<p class="text-green-700 animate-pulse mt-2 text-sm">Masz urodziny w tym tygodniu! Szykuj się na świętowanie!</p>`;
    } else {
      htmlContent += `<p class="text-slate-700 text-xs mt-2">Do najbliższych urodzin pozostało: ${weeksToNextBirthday} tygodni.</p>`;
    }
  }

  dialogContent.innerHTML = htmlContent;
  dialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
  dialog.close();
});

dialog.addEventListener('click', (e) => {
  if (e.target === dialog) {
    dialog.close();
  }
});