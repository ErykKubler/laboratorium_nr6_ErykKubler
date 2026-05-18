import './style.css'
import dayjs from 'dayjs'

const form = document.getElementById('motorcycle-form');
const purchaseDateInput = document.getElementById('purchase-date');
const dialog = document.getElementById('moto-dialog');
const dialogContent = document.getElementById('moto-dialog-content');
const closeDialogBtn = document.getElementById('close-moto-dialog');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const inputDateStr = purchaseDateInput.value;
  if (!inputDateStr) return;

  const today = dayjs();
  const purchaseDate = dayjs(inputDateStr);

  const daysSincePurchase = today.diff(purchaseDate, 'days');
  const isAnniversaryToday = today.month() === purchaseDate.month() && today.date() === purchaseDate.date();

  let nextAnniversary = purchaseDate.year(today.year());
  
  if (nextAnniversary.isBefore(today, 'day')) {
    nextAnniversary = nextAnniversary.add(1, 'year');
  }

  const daysToNextAnniversary = nextAnniversary.diff(today, 'days');
  const weeksToNextAnniversary = Math.ceil(daysToNextAnniversary / 7);

  let htmlContent = `<p>Twoja maszyna jest z Tobą już: <span class="text-xl block font-black text-slate-900">${daysSincePurchase} dni</span></p>`;

  if (isAnniversaryToday) {
    alert("Szerokiej drogi! Dokładnie dzisiaj mija kolejna rocznica zakupu Twojej maszyny! Lewa w górę! 🏍️💨");
  } else {
    if (daysToNextAnniversary > 0 && daysToNextAnniversary <= 7) {
      htmlContent += `<p class="text-green-700 animate-pulse mt-2 text-sm">Rocznica zakupu motocykla w tym tygodniu! Szykuj kombinezon!</p>`;
    } else {
      htmlContent += `<p class="text-slate-700 text-xs mt-2">Do kolejnej rocznicy zakupu pozostało: ${weeksToNextAnniversary} tygodni.</p>`;
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